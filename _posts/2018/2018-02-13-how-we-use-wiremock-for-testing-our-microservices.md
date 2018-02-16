---
layout: post
title: How WireMock, Docker and K8s can ease the microservices pipeline pain
date: 2018-02-13
header_image: public/microservices-wiremock.jpg
header_position: center
category: tech-stories
tags: ["microservices", "testing", "continuous delivery"]
authors: ["Benjamin", "Jan"]
---

In our microservices architecture we are keen on testing our system to make sure that it is working fine on every layer.
Therefore, we have local unit tests, local integration test but also a global test suite which validates the interplay of several services in the backend.

In the days of the internet, such a platform is not a self-contained system but rather comes to life through the communication with external services.
For example, we integrate third-parties like Intercom to provide a direct customer service, Google Shopping to advertise products externally, or Amazon Marketplace to sell elsewhere as well.

Testing those integrations involves to a number of challenges. One of them is that the sandbox systems of the external services may be unreliable which leads to false negatives in the tests. In other cases there is no sandbox available at all and the tests need to run against a test account on the production system which is complicated and not always possible.

This article outlines the steps we did to solve the problems with the connection to third-party systems in our API tests.

## General workflow

The diagram below shows a simplified draft our pipeline including our solution. The build stage happens decoupled for each service.
The acceptance stage then consolidates the different origins but has the capability to run parallelized.
In this stage the API test suite runs are we often had failures due to timeouts and limitations of instable external services.

{% image_custom image="/assets/img/pages/blog/images/blog-microservices-pipeline-wiremock.png" width="100" %}

## Part 1: Generate WireMock Stubs

In the build stage our microservice fires against the real API of the external service.
We are recording the interaction with the API and are replacing things like UUIDs in the requests with regular expressions.
This data will then be persisted as WireMock stubs.

First we need to launch the WireMock server which acts as a proxy in between our microservice and the external API and then add a request listener for the customized recording.

```java
public class TemplatedMappingsRecorder implements RequestListener {

    private final File mappingsSourceDir;
    private final FileSource mappingsFileSource;
    private final UrlPatternRegistry urlPatternRegistry;

  public TemplatedMappingsRecorder(File stubTargetDir, UrlPatternRegistry urlPatternRegistry) {
      this.mappingsSourceDir = new File(stubTargetDir, "mappings");
      this.mappingsFileSource = new SingleRootFileSource(mappingsSourceDir.getAbsolutePath());
      this.urlPatternRegistry = urlPatternRegistry;
  }

  @Override
  public void requestReceived(Request request, Response response) {
      RequestPattern requestPattern = createTemplatedRequestPattern(request);
      StubMapping stubMapping = createStubMapping(requestPattern, toResponseDefinition(response));
      writeToDisk(stubMapping, uniqueFileName(request, stubMapping));
  }

  // ...

}
```

The WireMock proxy can then be used by the Intercom API contract test.

```java
@WireMockTest
public abstract class IntercomProxyTest {

    // ...

    @BeforeClass
    public static void resetDirectoriesForGeneratedStubs() {
        FileUtils.deleteRecursive(WIREMOCK_MAPPINGS_DIR, true);
        FileUtils.deleteRecursive(WIREMOCK_FILES_DIR, true);

        FileUtils.createDirectories(WIREMOCK_MAPPINGS_DIR);
        FileUtils.createDirectories(WIREMOCK_FILES_DIR);
    }

    @Before
    public void configureWiremockProxy() {
        FileUtils.createDirectories(WIREMOCK_MAPPINGS_DIR);
        MappingsSource resource = new JsonFileMappingsSource(new SingleRootFileSource(WIREMOCK_MAPPINGS_DIR));
        FileSource fileSource = new SingleRootFileSource(WIREMOCK_FILES_DIR);

        wiremock = new WireMockServer(
                options()
                        .port(9999)
                        .fileSource(fileSource)
                        .mappingSource(resource)

        );

        wiremock.addMockServiceRequestListener(
                new TemplatedMappingsRecorder(WIREMOCK_ROOT_DIR, new IntercomUrlPatterns()));
        wiremock.start();
        wiremock.startRecording(new RecordSpecBuilder().forTarget(RECORDING_TARGET_URL));

        Intercom.setApiBaseURI(URI.create("http://localhost:" + wiremock.port()));
        Intercom.setAppID(INTERCOM_APP_ID);
        Intercom.setToken(INTERCOM_TOKEN);
    }

    @After
    @SneakyThrows
    public void cleanup() {
        wiremock.stopRecording();
        wiremock.stop();
    }

    protected Stream<LoggedRequest> findAllRequests() {
        return wiremock.findAll(RequestPatternBuilder.allRequests()).stream();
    }
}

```

The patterns to record need to be defined separately:
```
public class IntercomUrlPatterns extends UrlPatternRegistry {

    private static final String UUID_REGEX = "[0-9a-f-]+";

    public IntercomUrlPatterns() {
        super(Arrays.asList(
                "/users",
                "/users/" + UUID_REGEX,
                "/users\\?user_id=" + UUID_REGEX,
                "/conversations\\?type=user&user_id=" + UUID_REGEX,
                "/events"
        ));
    }
}
```

For the request body matcher we are just keeping the JSON path elements without their values. The recorded WireMock mappings then look like this:

```
{
  "id" : "26633bee-4b12-4f95-883e-23c559374797",
  "request" : {
    "urlPattern" : "/users",
    "method" : "POST",
    "bodyPatterns" : [ {
      "matchesJsonPath" : "$.signed_up_at"
    }, {
      "matchesJsonPath" : "$.user_id"
    }, {
      "matchesJsonPath" : "$.phone"
    } ]
  },
  "response" : {
    "status" : 200,
    "body" : <json-response-body>,
    "headers" : {
      "Cache-Control" : "max-age=0, private, must-revalidate",
      ...
    }
  }
}
```

## Part 2: Build and Push WireMock Docker Image

Here we had multiple possibilities. We could either create a new Docker Hub repository for each service for which we would like to add WireMock in the future or we could have a single repo and just differentiate by tags.
The later one has the advantage that our whole automation can be extended quite easily by just adding some more keys. So we decided to go this route.

For creating the WireMock image we forked the [wiremock-docker](https://github.com/rodolpheche/wiremock-docker) project and extended our Gradle plugins repos with a new task chain.
The `WiremockConventionPlugin` is based on the [Gradle Docker Plugin](https://github.com/bmuschko/gradle-docker-plugin) and follows the general process of pull base image, create a new service dockerfile that depends on the base image, building the service image and pushing it to Docker Hub.

```java

class WiremockConventionPlugin implements Plugin<Project> {

    private static final String STUB_DIRECTORY = 'build/wiremock-stubs'

    ...

    @Override
    void apply(Project project) {

        project.apply(plugin: DockerRemoteApiPlugin)

        ...

        project.task(CREATE_SERVICE_DOCKERFILE_TASK) << {
            description = 'Creates a new dockerfile for the generation of the layer with the wiremock stubs.'
            group = DEFAULT_TASK_GROUP

            new File(STUB_DIRECTORY).mkdirs()

            def dockerfile = new File("$STUB_DIRECTORY/Dockerfile")
            dockerfile.createNewFile()
            dockerfile.text = "FROM epages/ng-wiremock\nCOPY . /home/wiremock"
        }

        ...
    }
}
```

## Part 3: Deploy WireMock Docker Container

Our pipeline consists of several stages and in the Accpetance stage a new Kubernetes cluster is deployed.
Hence we added a new `intercom-mock-deployment.yaml` so that the according WireMock image is pulled from Docker Hub and rolled out to the Acceptance Stage cluster.

```yaml
containers:
- name: intercom-mock
  image: epages/ng-wiremock:intercom
  ports:
  - containerPort: 8080
```

To access the container from the outside for the test verifications we also need to create a [Kubernetes service](https://kubernetes.io/docs/concepts/services-networking/service) and [nginx configuration](https://linode.com/docs/web-servers/nginx/how-to-configure-nginx/#server-virtual-domains-configuration).

## Part 4: Configure service to use the WireMock server

When the mock server is deployed we can the link our connector service against it by adapting the `intercom-connector-configMap.yaml`.

```yaml
data:
  intercom.apibaseuri: http://intercom-mock:8000
```

## Part 5: Run API tests

In the API test suite, which is based on [Serenity BDD](https://github.com/serenity-bdd/serenity-junit-starter), we have a dedicated test class for each service.
In each test, we can check that expected requests where requested on the WireMock server.

```java

@Test
public void should_create_intercom_user() {

    provisioningSteps.provisionMinimalShop();

    String userCreationRequest = userCreationRequest(shopSteps.getShopId());

    assertThat(String.format("Failed to match '%s'", userCreationRequest),
            wiremockVerifications.numberOfInvocations(userCreationRequest).equals(1));
}
```

## Part 6: QA and Prod Environment

In the stages after the acceptance stage we opted for using the real API again.

## Conclusion

Building this solution required a significant amount of effort.
In our Community of Practice we discussed the costs and benefits and unanimously agreed that it was worth it and we should continue to go that route.
Other teams have started to use this concept for their integrations and improved it by decoupling the stub-recording from the Build stage and running a scheduled Jenkins job for this purpose.
