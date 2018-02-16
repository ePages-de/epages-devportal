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
For example, we integrate third-parties like intercom to provide a direct customer service, google shopping to advertise products externally, or amazon marketplaces to sell elsewhere as well.

These sometimes insufficiently reliable connections are tricky to stabilize or even create throughout the build and deployment phases until production.
Hence, we decided to use [WireMock](http://wiremock.org) so that we can take away some pain in our continuous delivery pipeline by mocking APIs.

This article outlines the steps how we integrated our WireMock solution including some design decisions along the way.

## General workflow

The diagram below shows a simplified draft our pipeline including our solution, which consists basically of four stages. The build stage happens decoupled for each service.
The acceptance stage then consolidates the different origins but has the capability to run parallelized.
In this stage the API test suite runs are the cause of the most often failures due to timeouts and limitations of instable external services.
This shortcomings have been work around with the integration of WireMock.
Our current implementation consists of 6 parts, which will be outlined in the next sections.

{% image_custom image="/assets/img/pages/blog/images/blog-microservices-pipeline-wiremock.png" width="100" %}

## Part 1: Generate WireMock Stubs

In the build stage (also locally and during pull request tests) our microservice fires against the real API of the external service.
Our mission is to record the send out requests and their corresponding response from the external API.
This data will then be persisted as WireMock stubs.

To achieve this goal we needed to create several classes in a new `wiremock` integration test package of our microservice.
First we need to launch the WireMock server which acts as a proxy inbetween of our microservice and the external API.

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

The recorder can then be used by the IntercomProxyTest.

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

The patterns to record need to be defined separatly:
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

## Part 2: Build and Push WireMock Docker Image

Here we had multiple possibilities. We could either create a new Docker Hub repository for each service for which we would like to add WireMock in the future or we could have a single repo and just differentiate by tags.
The later one has the advatage that our whole automation can be extended quite easily by just adding some more keys. So we decided to go this route.

For creating the WireMock we extended our gradle plugins repos and added a new task chain.
The `WiremockConventionPlugin` is based on the DockerPlugin and follows the gerneral process of pull base image, create a new service dockerfile that depends on the base image, building the service image and pushing it to docker hub.
Note that the base image and the service image which is enriched with the generated WireMock stubs live in the same docker hub repo.

```java

class WiremockConventionPlugin implements Plugin<Project> {

    private static final String STUB_DIRECTORY = 'build/wiremock-stubs'

    private static final String PULL_BASE_IMAGE_TASK = 'pullWiremockBaseDockerImage'
    private static final String CREATE_SERVICE_DOCKERFILE_TASK = 'createWiremockServiceDockerfile'
    private static final String BUILD_SERVICE_IMAGE_TASK = 'buildWiremockServiceDockerImage'
    private static final String PUSH_SERVICE_IMAGE_TASK = 'pushWiremockServiceDockerImage'
    private static final String REMOVE_SERVICE_IMAGE_TASK = 'removeWiremockServiceDockerImage'
    private static final String REMOVE_BASE_IMAGE_TASK = 'removeWiremockBaseDockerImage'
    private static final String PUBLISH_WIREMOCK_TASK = 'publishWiremock'

    private static final String DEFAULT_TASK_GROUP = 'Wiremock'

    @Override
    void apply(Project project) {

        project.apply(plugin: DockerRemoteApiPlugin)

        def dockerImageName = "epages/ng-wiremock"
        def dockerImageTagLatest = "latest"
        def dockerImageTagService = project.name
        def gitCommit = System.env.GIT_COMMIT

        project.extensions.docker.with {
            if (System.env.DOCKER_HOST) {
                url = "$System.env.DOCKER_HOST".replace("tcp", "https")
                if (System.env.DOCKER_CERT_PATH) {
                    certPath = new File(System.env.DOCKER_CERT_PATH)
                }
            } else {
                url = 'unix:///var/run/docker.sock'
            }
            registryCredentials {
                if (System.env.DOCKER_REGISTRY_URL) {
                    url = System.env.DOCKER_REGISTRY_URL
                }
                if (System.env.DOCKER_REGISTRY_USERNAME) {
                    username = System.env.DOCKER_REGISTRY_USERNAME
                }
                if (System.env.DOCKER_REGISTRY_PASSWORD) {
                    password = System.env.DOCKER_REGISTRY_PASSWORD
                }
                if (System.env.DOCKER_REGISTRY_EMAIL) {
                    email = System.env.DOCKER_REGISTRY_EMAIL
                }
            }
        }

        project.task(PULL_BASE_IMAGE_TASK, type: DockerPullImage) {
            description = 'Pulls our wiremock base docker image'
            group = DEFAULT_TASK_GROUP
            repository = "$dockerImageName"
            tag = "$dockerImageTagLatest"
        }

        project.task(CREATE_SERVICE_DOCKERFILE_TASK) << {
            description = 'Creates a new dockerfile for the generation of the layer with the wiremock stubs.'
            group = DEFAULT_TASK_GROUP

            new File(STUB_DIRECTORY).mkdirs()

            def dockerfile = new File("$STUB_DIRECTORY/Dockerfile")
            dockerfile.createNewFile()
            dockerfile.text = "FROM epages/ng-wiremock\nCOPY . /home/wiremock"
        }

        project.task(BUILD_SERVICE_IMAGE_TASK, type: DockerBuildImage) {
            description = 'Build a new wiremock service image.'
            group = DEFAULT_TASK_GROUP
            dependsOn project.tasks."$CREATE_SERVICE_DOCKERFILE_TASK"
            dependsOn project.tasks."$PULL_BASE_IMAGE_TASK"
            inputDir = project.file(STUB_DIRECTORY)
            if (gitCommit) {
                labels = ["git-commit": gitCommit]
            }
            tag = "$dockerImageName:$dockerImageTagService"
        }

        project.task(PUSH_SERVICE_IMAGE_TASK, type: DockerPushImage) {
            description = 'Push the docker image to your docker repository. All tags are included.'
            group = DEFAULT_TASK_GROUP
            dependsOn project.tasks."$BUILD_SERVICE_IMAGE_TASK"
            imageName = "$dockerImageName"
            tag = "$dockerImageTagService"
        }

        project.task(REMOVE_SERVICE_IMAGE_TASK, type:DockerRemoveImage) {
            description = 'Remove the wiremock service image from the local filesystem.'
            group = DEFAULT_TASK_GROUP
            imageId = "$dockerImageName:$dockerImageTagService"
        }

        project.task(REMOVE_BASE_IMAGE_TASK, type:DockerRemoveImage) {
            description = 'Remove the wiremock base image from the local filesystem.'
            group = DEFAULT_TASK_GROUP
            imageId = "$dockerImageName:$dockerImageTagLatest"
        }

        project.task(PUBLISH_WIREMOCK_TASK) {
            description = 'Push and remove wiremock images.'
            group = DEFAULT_TASK_GROUP
            dependsOn project.tasks."$PUSH_SERVICE_IMAGE_TASK"
            dependsOn project.tasks."$REMOVE_SERVICE_IMAGE_TASK"
            dependsOn project.tasks."$REMOVE_BASE_IMAGE_TASK"
        }

        project.tasks."$PULL_BASE_IMAGE_TASK".mustRunAfter(project.tasks.intTest)

        project.tasks."$REMOVE_SERVICE_IMAGE_TASK".mustRunAfter(project.tasks."$PUSH_SERVICE_IMAGE_TASK")
        project.tasks."$REMOVE_BASE_IMAGE_TASK".mustRunAfter(project.tasks."$PUSH_SERVICE_IMAGE_TASK")

    }
}
```

## Part 3: Deploy WireMock Docker Container

Our pipeline consists of several stages and in each stage a new Kubernetes cluster is deployed.
Hence we added a new `intercom-mock-deployment.yaml` so that the according WireMock imagae is pulled  from Docker hub and rolled out to the Acceptance Stage cluster.

```yaml
containers:
- name: intercom-mock
  image: epages/ng-wiremock:${externalapi}
  ports:
  - containerPort: 8080
```

To access the container from the outside. Like from our our api test suite, which runs against the freshly created cluster,
we need to create a [Kubernetes service](https://kubernetes.io/docs/concepts/services-networking/service) for the mocked external api docker image as well.

```yaml
ports:
  - port: 8000
    targetPort: 8080
    protocol: TCP
    name: ${externalapi}
```

To forward the requests to the correct service we need to also enhance our cluster gateway by adding a configuration: vhost.${externalapi}.conf

```
location ~ /([a-z-]*-mock)/(.*) {
  set $upstream "http://$1.default.svc.cluster.local:8000/$2$is_args$query_string";
  ...
}
```

## Part 4: Configure service to use the WireMock server

When the mock server is deployed we can the link our connector service against it by adapting the `${servicename}-connector-configMap.override.yaml`.

```yaml
data:
  intercom.apibaseuri: http://intercom-mock:8000
```

## Part 5: Run API tests

In the api test suite which is based on [Serenity BDD](https://github.com/serenity-bdd/serenity-junit-starter) we have a dedicated test class for each service.
In each test, we can check that the according WireMock verification is invoked for a number of times.

```java
@Before
public void setup() {
    wiremockVerifications = new WiremockVerifications("intercom-mock");
}

@Test
public void should_create_intercom_user() {

    provisioningSteps.provisionMinimalShop();

    String userCreationRequest = userCreationRequest(shopSteps.getShopId());
    assertThat(String.format("Failed to match '%s'", userCreationRequest),
            wiremockVerifications.numberOfInvocations(userCreationRequest).equals(1));
}
```

Here are the important parts of the `WiremockVerifications.java` verifications class.

```java
public Integer numberOfInvocations(String requestMatcher) {
    return requestWiremock(requestMatcher, wiremockBaseUri + WIREMOCK_COUNT_URI_PATTERN).path("count");
}

private Response requestWiremock(String body, String wiremockUri) {
    return given()
            .content(body)
            .when()
            .post(wiremockUri)
            .thenReturn();
}
```

## Part 6: QA and Prod Environment

In the stages after the acceptance stage we opted for using the real API again. This makes the Pre-Prod/QA environment more realistic.

## Conclusion

Overall, there is quite an amount of effort that needs to be put into using WireMock but it is totally worth it.
