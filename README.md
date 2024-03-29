# Valkyrie

The user service for the Yggdrasil platform.

#### Table of contents

* [Introduction](#introduction)
    * [Project structure](#project-structure)
* [Development](#development)
    * [1. Prerequisites](#1-prerequisites)
    * [2. Setup](#2-setup)
    * [3. Running locally](#3-running-locally)
* [Testing](#testing)
    * [1. Running tests](#1-running-tests)
* [Deployment](#deployment)
    * [1. Building the image](#1-building-the-image)
    * [2. Running the image](#2-running-the-image)

## Introduction

### Project structure

Below is a quick outline of the structure of the app:

```text
.
├── api                        # API endpoints
|   ├── some-endpoint
|   |   |   ├── controller.ts  # Calls the service methods and handles responses
|   |   |   ├── router.ts      # Sets up the router and all the available routes
|   |   |   └── service.ts     # Handles the more granular parts; DB actions, remote requests etc.
|   │   └── ...
├── constants                  # Constants to use throughout the service
│   └── ...
├── errors                     # Error classes and helpers
│   └── ...
├── middlewares                # Custom Express middlewares
│   └── ...
├── models                     # ORM-odels
│   └── ...
├── modules                    # Modules are used to separate code to make it more testable
|   ├── some-module
|   |   ├── doesSomethingCool.ts
|   |   ├── index.ts
|   │   └── ...
│   └── ...
├── types                      # TypeScript types & interfaces
│   └── ...
├── utils                      # Utility functions
│   └── ...
├── index.ts                   # Entrypoint - starts the server
└── server.ts                  # This is where the Express app is setup and configured
```

## Development

### 1. Prerequisites

* Install [NodeJS 14.15.1+](https://nodejs.org/en/download/).
* Install [Yarn](https://yarnpkg.com/).
* Install [Docker](https://docs.docker.com/get-docker/).
* Install [Docker Compose](https://docs.docker.com/compose/install/).

### 2. Setup

1. Install the dependencies:
```bash
yarn install
```

### 3. Running locally

1. Simply run:
```bash
yarn start
```

2. You can check the API is running using the following cURL command:
```shell script
curl -X GET http://localhost:${PORT}/healthcheck
```

## Testing

### 1. Running tests

1. Simply run the command:
```bash
yarn test
```
This will build and run a Postgres docker image and run the tests against it.

## Deployment

### 1. Building the image

When building the Docker image, we want to inject env vars at build time, as the [`Dockerfile`](./Dockerfile) injects the build args as env vars into the container.
```bash
docker build \
-t kieranroneill/valkyrie \
--build-arg db_host=db.valkyrie.yggdrasil.io \
--build-arg db_name=production \
--build-arg db_password="password" \
--build-arg db_port=5432 \
--build-arg db_user=admin \
--build-arg encryption_key="super_secret" \
--build-arg log_level=error \
--build-arg node_env=production \
--build-arg port=3000 \
--build-arg service_name=valkyrie \
.
```

#### 2. Running the image

```bash
docker run \
--name valkyrie \
-it \
-p 1337:${PORT} \
kieranroneill/valkyrie:latest
```
