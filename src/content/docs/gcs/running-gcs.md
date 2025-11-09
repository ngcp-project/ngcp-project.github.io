---
title: Running the GCS Application
sidebar:
  order: 1
---

> Note: This guide assumes that you have installed the GCS application and have it set up correctly. If you haven't done so, please refer to the [Installation Guide](./installation.md).


## Preparing to Run GCS
1. Open the Docker Desktop application to turn on the Docker engine.
2. Using either the Containers VS Code extension (recommended) or Docker Desktop, ensure that the PostgreSQL and RabbitMQ containers are running. If they are not running, start them now.
<img width="716" height="663" alt="image" src="https://github.com/user-attachments/assets/95c945ab-3971-462d-a4b7-bcbdd7f355ab" />

```
RabbitMQ: docker-compose up rabbitmq
PostgreSQL: docker-compose up db
```


## Starting up the GCS 
1. Open a terminal window in VS Code where the code repository is located.
2. Start up the map server by running the following command:
```
bun run osm:run
```
3. In a new terminal window, start the GCS application by running the following command:
```
bun tauri

```
