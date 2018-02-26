---
layout: post
title: How to mock out external services for API tests
date: 2018-03-06
header_image: public/microservices-wiremock.jpg
header_position: center
header_overlay: true
category: api-experience
tags: ["microservice", "testing", "continuous delivery", "api"]
authors: ["Benjamin", "Jan"]
---

In our microservices architecture we are keen on testing our system to make sure that it is working fine on every layer.
Therefore, we have local unit tests, local integration tests, but also a global test suite which validates the interplay of several services in the backend.

In the days of the internet, such a platform is not a self-contained system, but rather comes to life through the communication with external services.
For example, we integrate third-parties such as Intercom to provide a direct customer service, Google Shopping to advertise products externally, or Amazon Marketplace to sell elsewhere as well.

Testing these integrations involves a number of challenges.
One of them is that the sandbox systems of the external services may be unreliable which leads to false negatives in the tests.
In other cases, there is no sandbox available at all, and the tests need to run against a test account on the production system.
This is complicated and not always possible.

This post outlines the steps we did to solve the challenges with the connection to third-party systems in our API tests.

## General workflow

The diagram below shows a simplified draft of our pipeline including our solution.
The build stage runs decoupled for each service.
The acceptance stage then consolidates the different origins, but has the capability to run in parallel.
In this stage were are running API tests that access our official REST endpoints.
Here we had occasional failures caused by timeouts doing requests on external APIs.

{% image_custom image="/assets/img/pages/blog/images/blog-microservices-pipeline-wiremock.png" width="100" %}

## Part 1: Generate WireMock stubs

In the build stage our microservice fires against the real API of the external service which is proxied by a WireMock server.
We are recording the interaction with the API and replace things like UUIDs in the requests with regular expressions.
For the request body we just check that all fields are present in the request.
Our WireMock stubs will then look like this:

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

The WireMock proxy is included in the respective JUnit tests via a `@ClassRule`:

```java
public class WireMockStubGeneration extends ExternalResource {
    ...
    @Override
    public void before() {
        initializeWireMockServer();
        wireMock.start();
        wireMock.startRecording(new RecordSpecBuilder().forTarget(proxiedBaseUrl));
    }

    @Override
    public void after() {
        wireMock.stopRecording();
        wireMock.stop();
    }

    private void initializeWireMockServer() {
        ...
        wireMock = new WireMockServer(
                options()
                        .port(wireMockPort)
                        .fileSource(fileSource)
                        .mappingSource(mappingSource)
                        .extensions(new TemplatedRequestMappingsTransformer(urlPatternRegistry))
        );
    }
}
```

The templating is achieved with a custom WireMock server extension:

```
public class TemplatedRequestMappingsTransformer extends StubMappingTransformer {
    ...
    @Override
    public StubMapping transform(StubMapping stubMapping, FileSource files, Parameters parameters) {
        RequestPattern templatedRequest = createTemplatedRequestPattern(stubMapping.getRequest());
        ResponseDefinition originalResponse = stubMapping.getResponse();

        return createStubMapping(templatedRequest, originalResponse);
    }
    ...
    private RequestPattern createTemplatedRequestPattern(RequestPattern request) {
        RequestPatternBuilder requestPatternBuilder = RequestPatternBuilder
                .newRequestPattern(request.getMethod(), urlPatternRegistry.getUrlPattern(request.getUrl()));
        addHeaders(requestPatternBuilder, request);
        getJsonPathList(request).forEach(jsonPath ->
            requestPatternBuilder.withRequestBody(matchingJsonPath(jsonPath))
        );
        return requestPatternBuilder.build();
    }
}
```

In order to exchange the exact request URL with a regular expression, we store the supported URIs in a registry, and then find the matching one via trial and error:

```
public class IntercomUrlPatterns extends UrlPatternRegistry {
    ...
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

## Part 2: Build and push WireMock docker image

Here we had multiple possibilities.
We could either create a new Docker Hub repository for each service that requires WireMock in the future, or we could have a single repo and just differentiate by tags.
The latter has the advantage that our whole automation can be extended quite easily by just adding some more keys.
So we decided to go this way.

For creating the WireMock image we forked the [wiremock-docker](https://github.com/rodolpheche/wiremock-docker){:target="_blank"} project, and extended our Gradle plugins repos with a new task chain.
The `WiremockConventionPlugin` is based on the [Gradle Docker Plugin](https://github.com/bmuschko/gradle-docker-plugin){:target="_blank"} and follows the general process of pull base image.
It creates a new service dockerfile that depends on the base image, building the service image and pushing it to Docker Hub.

```java

project.task(CREATE_SERVICE_DOCKERFILE_TASK) << {
    description = 'Creates a new dockerfile for the generation of the layer with the wiremock stubs.'
    group = DEFAULT_TASK_GROUP

    new File(STUB_DIRECTORY).mkdirs()

    def dockerfile = new File("$STUB_DIRECTORY/Dockerfile")
    dockerfile.createNewFile()
    dockerfile.text = "FROM epages/ng-wiremock\nCOPY . /home/wiremock"
}

```

## Part 3: Deploy WireMock Docker container

Our pipeline consists of several stages.
In the acceptance stage a new Kubernetes cluster is deployed.
Hence we added a new `intercom-mock-deployment.yaml` so that the according WireMock image is pulled from Docker Hub and rolled out to the acceptance stage cluster.

```yaml
containers:
- name: intercom-mock
  image: epages/ng-wiremock:intercom
  ports:
  - containerPort: 8080
```

To access the container from the outside for the test verifications we also need to create a [Kubernetes service](https://kubernetes.io/docs/concepts/services-networking/service){:target="_blank"} as well as [nginx configuration](https://linode.com/docs/web-servers/nginx/how-to-configure-nginx/#server-virtual-domains-configuration){:target="_blank"}.

## Part 4: Configure service to use the WireMock server

When the mock server is deployed we can then link our connector service against it by adapting the `intercom-connector-configMap.yaml`.

```yaml
data:
  intercom.apibaseuri: http://intercom-mock:8000
```

## Part 5: Run API tests

In the API test suite, which is based on [Serenity BDD](https://github.com/serenity-bdd/serenity-junit-starter){:target="_blank"}, we have a dedicated test class for each service.
In each test we can check that the expected requests were requested on the WireMock server.

```java

@Test
public void should_create_intercom_user() {

    provisioningSteps.provisionMinimalShop();

    String userCreationRequest = userCreationRequest(shopSteps.getShopId());

    assertThat(String.format("Failed to match '%s'", userCreationRequest),
            wiremockVerifications.numberOfInvocations(userCreationRequest).equals(1));
}
```

## Part 6: QA and production environment

In the stages after the acceptance stage we opted for using the real API again.

## Conclusion

Building this solution required a significant amount of effort.
In our Community of Practice we discussed the costs and benefits, and unanimously agreed that it was worth it, and we should continue to go that route.
Other teams have started to use this concept for their integrations and improved it by decoupling the stub-recording from the build stage and running a scheduled Jenkins job for this purpose.
