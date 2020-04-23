---
layout: post
title: How to prepare a simple Go app for a CI environment
date: 2020-04-07
header_image: public/abstract-art-blur-bright.jpg
header_position: center
header_overlay: true
category: tech-stories
tags: ["golang", "programming", "kubernetes", "git", "gitlab", "gitlab-ci", "gitlab-runner", "jenkins", "helm"]
authors: ["Karsten"]
about_authors: ["kpeskova"]
---

In our [previous blog post](/blog/tech-stories/how-to-get-a-simple-go-app-on-kubernetes/) we described how to implement logging and config parsing.
After writing our own UTC-formatter, we continued with the overwrite order of the configuration.
In total we used four different sources of configuration options:

1. hard-coded constants (defaults if nothing else is set)
2. config file entries (could also be commented out)
3. environment variables
4. program parameters

To implement the overwrite in this order, meaning the hard-coded constants have the lowest priority and the program parameter the highest, we used two popular frameworks.
[Viper](https://github.com/spf13/viper){:target="_blank"} is used for the configuration file parsing in combination with [Pflag](https://github.com/spf13/pflag){:target="_blank"} for the program parameters.
To glue everything together, we used the self-written recursive method _MergeFileWithPFlags_, which results in the final program intern config object we want.

## Goals

In this blog post we want to continue with the remaining CI/CD related requirements:

+ meet current quality requirements in the development process  
(smoke and acceptance test)
+ (fully) automate the release and deployment cycle  
(use [GitLab's](https://gitlab.com/){:target="_blank"} [CI-Pipeline](https://docs.gitlab.com/ce/ci/README.html){:target="_blank"})
+ produce reliable results when build locally or in CI pipeline  
(helps to reproduce behavior on bug hunting)

As you can see, they are kept in a very generic fashion.
Only the interaction of all related tools in the development and build process leads to the desired goal.
Therefore, it is a bit difficult to find a suitable separation.
Let us explain how we want to develop, build, test, and deploy this internal piece of software.

## Software life cycle

Let me start with an example that will help us to get a better understanding for the following subsections.
It shows how a developer's work on our application (_myapp_) should look like:
The developer starts with a Git repository on their local machine.
It can be empty or, as in the current case, prepared for our internal automated pipelines (GitLab, [GitLab-runner](https://docs.gitlab.com/runner/){:target="_blank"}, [Jenkins](https://jenkins.io/){:target="_blank"}, and [Helm](https://helm.sh/){:target="_blank"}-v3).
They want to add a new feature.
After entering a few lines of new code, they decide to test their changes locally.
To do this, they execute a single shell command that performs all the necessary steps to compile the application.
In just a few minutes, an executable file is created on their PC.
After they have performed some smoke tests and fixed some code, they decide to finish their work by compiling it as it would be in the pipeline, to be sure the program also works as a container.
With another single shell command, a local Docker installation creates a container.
This step is optional, as our software is very simple and does not use any special system features.  
To finish their work, they commit and push only their source code changes to the remote GitLab server.
This triggers the [GitLab's CI pipeline](https://docs.gitlab.com/ee/ci/pipelines.html){:target="_blank"} that starts a GitLab runner on Kubernetes as well.
This runner represents the acceptance stage, where the software is finally built as a Docker container.
In this stage, the smoke and acceptance tests are performed.
If everything worked correctly, a new tag is created in the repository's own [container registry](https://docs.gitlab.com/ee/user/packages/container_registry/){:target="_blank"}.  

In this case, the following automatically triggered deployment process is structurally not possible.
The required description as a Helm chart is located in a different repository.
For this reason, the deployment is interrupted here.
Surely it could be triggered with some tools, but let's use this break to add the required changes to Helm.
Sometimes the templates have to be changed or a new entry in a [configmap](https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/){:target="_blank"} has to be added.
Let's assume the new feature adds an additional parameter that also has a representation in the config file.

Right after the developer pushes their changes to the second remote repository, the automated deployment process starts.
A webhook triggers a Jenkins job that uses a special user on a dedicated machine.
They only have enough permissions (see [RBAC](https://kubernetes.io/docs/reference/access-authn-authz/rbac/){:target="_blank"}) on our internal production-like Kubernetes cluster to deploy the Helm chart.
With a "rolling update strategy" setting in the [Kubernetes deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/){:target="_blank"} object, the rollout takes place without a downtime.  

## Development

The previous example should serve as a guideline for the following implementation details.
Starting with the development, we'll take a closer look inside of the first Git repository.

### Magefile

To support the developer with the described simple shell commands, the build instructions, which are also used by GitLab's CI pipeline, are managed in the repository's [magefile](https://magefile.org/){:target="_blank"}.

The file contains different [targets](https://magefile.org/targets/){:target="_blank"} grouped in namespaces that represent the different phases during a release cycle.

```go
package main

import (
  "github.com/magefile/mage/mg"
  "github.com/magefile/mage/sh"
)

type Complete mg.Namespace
type Prepare mg.Namespace
type Test mg.Namespace
type Build mg.Namespace
type Integration mg.Namespace
type Release mg.Namespace

var Default = Complete.Run

func (Complete) Run() {
  mg.Deps(
    Test.Run,
    Build.Run,
    Integration.Run,
    Release.Run,
  )
}

func (Prepare) Run() error {
  if err := sh.Run("go", "get", "golang.org/x/lint/golint"); err != nil {
    return err
  }
}

func (Test) Run() error {
  mg.Deps(
    Test.Lint,
  )
  return nil
}

func (Test) Lint() error {
  mg.Deps(Prepare.Run)
  return sh.Run("golint", "./src/...")
}
```

To perform a simple smoke test, you can use the `mage -v test:run` command.
Of course, we have more than one test in our real file.
Here's a list of more examples:

+ go vet
+ go test
+ gocyclo
+ misspell

But let's focus on the first test.
In the `mage -v test:run` example you can see how dependencies are defined.
If you want to run a complete cycle you can use the `complete:run` target. 
In case of our [software lifecycle example](#software-life-cycle), the developer builds a local binary with the following target for fast testing:

```go
func (Build) Local() error {
  // Resolves file glob to full names with relative path.
  files, err := filepath.Glob("./src/*.go")
  if err != nil {
    return err
  }
  // Creates a build binary argument list without whitespaces.
  buildArguments := []string{
    "build",
    "-ldflags=-s",
    "-ldflags=-w",
    "-o=bin/myapp"}
  buildArguments = append(buildArguments, files...)
  return sh.RunWith(env, "go", buildArguments...)
}
```

An equivalent build command with Docker will be used and explained further down.
The optional Docker container was built with the target `build:run`, which is shown below.

```go
func (Build) Run() error {
  if err := sh.Run(
    "docker",
    "build",
    "--pull",
    "-t=myapp:latest",
    "./",
  ); err != nil {
    return err
  }
  return nil
}
```
It uses the repository's _Dockerfile_, which is described in the next section.

### Dockerfile

Since Docker version 17.05, the awesome feature of [multi-stage builds](https://docs.docker.com/develop/develop-images/multistage-build/){:target="_blank"} is available.
It allows you to define different containers for different stages.
This has another very nice side effect: Docker can skip stages if no action is required.
This speeds up the construction process enormously. 

#### Dependency stage

Let's take a look into our _Dockerfile_ and start with the dependency stage.

```yaml
FROM golang:alpine as build_dependencies
ENV GO111MODULE=on
RUN apk add ca-certificates git
WORKDIR /app
COPY go.mod .
COPY go.sum .
RUN go mod download
```

The purpose of this stage is to resolve the package dependencies of Go.
Therefore, the previously created Go-mod-files are copied into it and the [go-download-command](https://blog.golang.org/using-go-modules){:target="_blank"} brings all the required packages into this stage.
If you run the `build:run` target multiple times, you would see that this stage is only executed once.

#### Build stage

Next, we add the layer of package dependencies to the building stage. 

```yaml
FROM build_dependencies AS builder
COPY ./src ./src
RUN go build \
    -ldflags "-s -w" \
    -o myapp \
    ./src/*.go
```

As mentioned above, the local binary and container builds use in fact the same Go-build-command.
This is required to produce nearly the same binary in both environments. 

#### Application stage

The last part of the _Dockerfile_ is the application stage.

```yaml
FROM alpine
ENV APPNAME=myapp
ENV PATH="/${APPNAME}/bin:${PATH}"
RUN apk --no-cache add tzdata && \
    addgroup -S ${APPNAME} && \
    adduser -D -G ${APPNAME} ${APPNAME} && \
    rm -rf /var/cache/apk/*
COPY --from=builder /app/${APPNAME} /${APPNAME}/bin/
WORKDIR /${APPNAME}
COPY ./app.sh /usr/local/bin/app.sh
RUN chown -R ${APPNAME}:${APPNAME} /${APPNAME} && \
    chmod 755 ./bin/${APPNAME} && \
    chmod 755 /usr/local/bin/app.sh && \
USER ${APPNAME}
ENTRYPOINT [ "app.sh" ]
```

It combines the Go binary with a run-script and a user other than root for execution, to form a complete and small container.
With the `COPY --from=builder` instruction, Docker gets only the binary without the building or dependency layers, which reduces the image size drastically.
Another small but very important fact is the entrypoint script.

```bash
#!/usr/bin/env sh
myapp $@
```

It is very basic, but mandatory.
We want to be able to run the Docker container like this:

```bash
docker run myapp --loglevel=debug
```

Without an entrypoint script which launches the program in a shell, the parameters are not parsed correctly and we get very nasty runtime exceptions.

## Build pipeline

After explaining the local development process with Mage and Docker, we move on to the build pipeline that is realized with GitLab CI.
The complete description of the pipeline is available in the repository's [_.gitlab-ci.yml_ file](https://docs.gitlab.com/ee/ci/yaml/){:target="_blank"}.
The file syntax offers many possibilities to customize the pipeline to your own needs.
For our simple application, we only need a few of them.
To execute the commands of the CI file, GitLab requires a runner.
As mentioned above, it is a GitLab runner that is executed on our internal cluster as well, but in a different namespace.
The first section of the CI file is the stage definition.

```yaml
stages:
  - smoke
  - build
  - test
  - release
```

There's nothing special here.
Later, the so-called _jobs_ are assigned to one of these stages.
The next part defines two so-called [anchors](https://docs.gitlab.com/ee/ci/yaml/#anchors){:target="_blank"}.
As usual in YAML, you must pay attention to the indentation.

```yaml
.docker_job_template: &docker_job_definition
  image: docker:latest
  services:
    - name: docker:18.09-dind
  variables:
    DOCKER_HOST: tcp://localhost:2375
    CONTAINER_TEST_IMAGE: ${CI_REGISTRY}/${CI_PROJECT_PATH}:${CI_COMMIT_REF_SLUG}
    CONTAINER_IMAGE: ${CI_REGISTRY}/${CI_PROJECT_PATH}

# Workaround to get one default array entry as YAML multiline
# Source: https://gitlab.com/gitlab-org/gitlab-ce/issues/19677
.docker_script_template: &docker_default_script |
  docker login -u ${CI_REGISTRY_USER} -p ${CI_JOB_TOKEN} ${CI_REGISTRY}
  ...
```

The first anchor defines a reference with the name _docker\_job\_definition_.
This, in turn, defines a block of YAML code that describes the [docker-in-docker](https://docs.gitlab.com/ee/ci/docker/using_docker_build.html){:target="_blank"} settings.
The second anchor is, as the comment shows, a workaround for a multiline value.
The anchors are defined so that they can be used later on in different jobs without duplicating the content.
Another possible solution would be a global definition of the first anchor.
However, this would result in a much longer pipeline run, because even at the stages where Docker is not required, a container would only be started and then stopped again to define three variables.
This is the reason why the anchors are not used in the first job definition.

```yaml
test-app-job:
  stage: smoke
  image: golang:alpine
  only:
    - master
  script:
    - apk add bash ca-certificates git gcc g++ libc-dev
    - git clone https://github.com/magefile/mage
    - cd mage
    - go run bootstrap.go
    - cd ..
    - mage -v test:run
```

In this definiton, we install Mage inside of a small Golang container to run the targets for a smoke test.

The second job builds the container in the same way as on the local developer machine.

```yaml
build-job:
  stage: build
  <<: *docker_job_definition
  only:
    - master
  script:
    - *docker_default_script
    - docker build --pull
        -t=${CONTAINER_TEST_IMAGE}
        ./
    - docker push ${CONTAINER_TEST_IMAGE}
```

As you can see, we use both anchors at this point.
The first one, _docker\_job\_definition_, uses the special key `<<`.
This indicates that key values from another mapping should be merged into this mapping.  
The second anchor is _docker\_default\_script_.
In this form, we only merge the multiline as an array element into the `script` key.  
As you can see, the Docker build command is syntactically the same as in our Mage file.
This code duplication is for simplification.
To execute a Mage file target, you need a running Mage installation.
Unfortunately, the binary from the first job is already gone because it is created in another container, which was deleted immediately after the first job.
To recreate it, we would need a Golang developer and Docker environment in the same container.
All of this only to execute one simple command.
Since the effort to set up such an environment would be far too high, the command to build the container is simply duplicated.
The last instruction makes use of the build-in environment variables from GitLab to tag and push our newly created image.

After the build, we can run the acceptance tests by using the anchors again in the same way as before.
If all tests passed, the Docker image is finally tagged and pushed into the registry.

```yaml
release-image-job:
  stage: release
  <<: *docker_job_definition
  only:
    - master
  script:
    - *docker_default_script
    - docker pull ${CONTAINER_TEST_IMAGE}
    - docker tag ${CONTAINER_TEST_IMAGE} ${CONTAINER_IMAGE}:latest
    - docker push ${CONTAINER_IMAGE}:latest
```

## Deployment

### Templates

The Kubernetes object definitions as a Helm chart are part of a second repository.
Compared to the previous explanations, the code for the chart is straightforward and includes nothing special.
We're using Kubernetes' deployment, ingress, secret, configmap, and service YAML template files, with which it is possible to set values depending on the target platform.
In our [software lifecycle example](#software-life-cycle), the developer added a new feature that requires an additional entry in the configuration file.
Since the two files, values.yaml and myapp.yaml, use the same syntax, it is simply a copy of the Helm values inside of the configmap with the build-in function `toYaml`.

```yaml
# values.yaml
configmap:
  logging:
    loglevel: info
  new:
    feature: 42
```
```yaml
{% raw %}
# templates/configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: myapp-configmap
data:
  myapp.yaml: |
{{ toYaml .Values.configmap | indent 4 }}
{% endraw %}
```

### Jenkins

Now, let's go on to the Jenkins job.
It is triggered when the developer pushes their changes into the second GitLab repository using a webhook.
The job is written in [Jenkins job DSL](https://jenkinsci.github.io/job-dsl-plugin/){:target="_blank"} and executed on a separate machine (virtual machine) that was already registered on the Jenkins server.
It checks the second repository, where the Helm chart is located, and executes a single command to install or upgrade the chart inside Kubernetes.

```bash
helm upgrade \
  myapp \
  ./ \
  --install \
  --namespace intern-services \
  --values values.yaml
```

Of course, the extra machine has to meet certain requirements.
First, Helm must already be installed and secondly, a system user with a valid Kubectl configuration must be available.
How this is set up is not part of this blog post.
You'll find many good tutorials out there that describe it.

Another point worth mentioning is the handling of access rights for the Helm user to the Kubernetes cluster.
Since Helm version 3 no longer has a Tiller server, the tool uses the Kubernetes API directly to create the objects.
This requires a client with sufficient permissions to execute these requests.
That's why we are using a separate namespace where the Helm user has administrative permissions.
To give a user called _helm_ these permissions, a cluster administrator creates a role

```yaml
# role.yaml
kind: Role
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  namespace: intern-services
  name: helm
rules:
  - apiGroups: ["*"]
    resources: ["*"]
    verbs: ["*"]
```

and a rolebindig object.

```yaml
# rolebinding.yaml
kind: RoleBinding
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  namespace: intern-services
  name: helm
subjects:
- kind: User
  name: helm
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: Role
  name: helm
  apiGroup: rbac.authorization.k8s.io
```

As we use client authentication with certificates, the common name field (`CN=helm`) is used by the Kubernetes API to map the requests to the permissions of this role. 

Finally, when the helm-upgrade-command from above is executed, our two application pods are replaced by using a custom rolling update strategy in the Kubernetes deployment.

```yaml
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: myapp
spec:
  replicas: 2
  strategy:
    rollingUpdate:
      maxUnavailable: 0
      maxSurge: 1
...
``` 

This ensures the pod replacement without any downtime.

## Conclusion

With this second part of our blog post series, we have completed the life cycle of our Go application. 
Based on an [example](#software-life-cycle) of how a developer's work on our application (_myapp_) should look like, we showed the required tools to implement the CI/CD related topics.
We started with the [Magefile](#magefile) which defines several targets for local commands and then moved on to the [Dockerfile](#dockerfile).
It uses a YAML feature called anchors to simplify the content without repeating the code.
The same file is later on used by GitLab's [build pipeline](#build-pipeline) to generate the final Docker container in multiple stages.
The new Docker feature of multiple stages within a Dockerfile helps to minimize and speed up this process.
In a second phase, the [deployment](#deployment) with Helm and Jenkins is used to finally update the application on our internal Kubernetes cluster.

## Related post

* [How to get a simple Go app on Kubernetes](/blog/tech-stories/how-to-get-a-simple-go-app-on-kubernetes/)