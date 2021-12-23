---
layout: post
title: "GitHub Actions: a basic how-to"
date: 2022-01-06
header_image: public/pipeline-irl.jpg
header_position: bottom
header_overlay: true
category: coding
tags: ["github", "actions", "tutorial"]
authors: ["Roberto"]
about_authors: ["rwelzel"]
---

So, I am quite sure you have already heard about [GitHub Actions](https://github.com/features/actions){:target="_blank"}.
It is GitHub’s solution for automating workflows.
You can basically automate everything that can be triggered via a GitHub repository’s events: add/remove tags, create/close PR, and so on (find the complete list [here](https://docs.github.com/en/actions/learn-github-actions/events-that-trigger-workflows){:target="_blank"}).

Let's have a look at some reasons why GitHub Actions could be a good choice:
- The price is competitive ($0.008 per Linux minutes as of Dec/2021)
- It fully integrates into GitHub (if you use it for hosting your repos)
- YAML config → this means changes can be reviewed
- It has a marketplace with many ready-to-use actions (e.g. triggering a webhook)

## Build pipeline

Great, so GitHub Actions has many advantages.
But let's focus on one of its main use cases: creating your own build pipeline.
You can build, test, and even deploy your service via GitHub Actions.
You just need to know which commands to run.

### How we do it

In the case of our services, most of them are running with Gradle, so building them is really a no-brainer.
Here are the steps needed for the build process of main branch builds (the ones which get deployed):
- Compile and run unit/integration tests (`./gradlew build`)
- Build and push a Docker image
- Build and publish a Helm chart

Quite straightforward, nothing fancy.
We have set up GitHub Actions to run the build process in two different ocasions:
- On pull requests (run tests)
- When a pull request is merged into the main branch

### Down to the code

Here is an adapted version of our build’s YAML file (located within the `.github/workflows` directory):
```yaml
name: Build and test

on:
  push:                                 #######
    branches: [ main, '*-test' ]        ## 1 ##
  pull_request:                         #######
    branches: [ '*' ]

concurrency:                            #######
  group: ${{ github.ref }}              ## 2 ##
  cancel-in-progress: true              #######

env:
  # Gradle variables                                                              #######
  ORG_GRADLE_PROJECT_dockerHubUsername: ${{ secrets.DOCKERHUB_USER }}             ## 3 ##
  ORG_GRADLE_PROJECT_dockerHubPassword: ${{ secrets.DOCKERHUB_PASSWORD }}         #######

jobs:
  build:
    name: Build / test / docker image 🐳
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2                               ### 4
      - name: Set up JDK 11                                     ### 5
        uses: actions/setup-java@v2
        with:
          java-version: 11
          distribution: 'temurin' # adopt openjdk
          cache: gradle
      - name: Gradle test                                       ### 6
        run: ./gradlew --no-daemon check asciidoctor

      ### THE FOLLOWING STEPS ARE FOR MASTER BUILDS ONLY

      - name: Login to Docker Hub
        if: github.ref == 'refs/heads/master'
        uses: docker/login-action@v1                                                #######
        with:                                                                       ## 7 ##
          username: ${{ secrets.BYD_DOCKERHUB_USER }}                               #######
          password: ${{ secrets.BYD_DOCKERHUB_PASSWORD }}

      - name: Publish artifacts                                                     #######
        if: github.ref == 'refs/heads/master'                                       ## 8 ##   
        run: ./gradlew --no-daemon -x intTest -x test publish                       #######

      # https://docs.github.com/en/actions/guides/building-and-testing-java-with-gradle#caching-dependencies
      - name: Cleanup Gradle Cache
        # Remove some files from the Gradle cache
        # so they aren't cached by GitHub Actions.                                  #######
        # Restoring these files from a GitHub Actions                               ## 9 ##
        # cache might cause problems for future builds.                             #######
        run: |
          rm -f ~/.gradle/caches/modules-2/modules-2.lock
          rm -f ~/.gradle/caches/modules-2/gc.properties

  package-charts:
    name: Helm chart 🗺
    needs: build
    if: github.ref == 'refs/heads/master'                                           ########
    runs-on: ubuntu-latest                                                          ## 10 ##
    container:                                                                      ########
      credentials:
        username: ${{ secrets.BYD_DOCKERHUB_USER }}
        password: ${{ secrets.BYD_DOCKERHUB_PASSWORD }}
      image: epages/ng-ci:latest # Image with Helm installed
      options: --user root
    steps:
      - uses: actions/checkout@v2                                                   ########
      - id: package-helm-chart                                                      ## 11 ##
        run: bash -c './src/deploy/ci/package-helm-chart.sh'                        ########
```
Let’s break it down:
1. As already mentioned, a so-called “workflow” is triggered by a specific event.
    In the case of this workflow, it is triggered on two events:<br>
    a. When a pull request is created for any branch.<br>
    b. When commits are pushed to the “main” branch or to any branches ending with “-test“.
2. This section controls when builds should be canceled.
    In our case, it makes sure that we only have one running build per pull request.
    When multiple commits are pushed in a short period of time, only the last one gets built.
3. The section where we load the environment variables.
    In this example, we load the Dockerhub username/password with the repository secret required for Gradle.
4. Here, the setup is already done and we start running commands.
    First, we must checkout the repository.
5. After that, we need to set up the JDK.
    The "setup-java" action allows us to specify a few parameters, among which is the JDK version.
6. In this section, we use Gradle to test our project, and also to generate the API documentation (`asciidoctor`).
7. Here starts the part that does not run on PR builds.
    It is achieved with the `if` conditional: `github.ref == 'refs/heads/master'`.
    With this conditional, we make sure that this step only runs on the `master` branch.
8. The build generates some artifacts that we need to publish (`jar` files, etc.).
9. This step is actually suggested by GitHub so that dependencies are not cached.
10. We start another job here that will package a Helm chart, which runs inside a container of a custom image.
    Credentials for pulling this image must be provided because it is a private image.
11. Then we run our shell script which edits some files, builds, and then publishes the helm chart.

## Advanced topics

The goal of this article is to provide a quick start guide including a basic skeleton so that you can start using it for your own projects.
GitHub Actions has much more functionality which we don't cover in this blog post, for example, custom actions providing generated data to downstream jobs.
I would like to encourage you to check out the [GitHub Actions docs](https://docs.github.com/en/actions){:target="_blank"} and read a bit more about it.

## Final note

I would also like to make clear that GitHub Actions is only one of many build tools (really, a whole lot) out there.
GitLab also has their own [CI solution](https://about.gitlab.com/stages-devops-lifecycle/continuous-integration/){:target="_blank"}, and there is also [Semaphore](https://semaphoreci.com/){:target="_blank"}, [Drone](https://www.drone.io/){:target="_blank"}, [Travis CI](https://travis-ci.org/){:target="_blank"}, [Circle CI](https://circleci.com/){:target="_blank"}... just to name a few.