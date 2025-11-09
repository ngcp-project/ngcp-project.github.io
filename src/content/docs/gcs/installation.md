---
title: Installing the GCS Repo 
description: Updated as of 11/09/25
sidebar:
  order: 1
---

## Quick Start Guide
This instructions are meant for users who are familiar with the repo and just need a quick refresher on how to install it. For more detailed instructions, please refer to the Detailed Instructions section below.
> Note: If the map server fails to render properly (white screen), please refer to the Map Server Debugging Notes section below.

## Prerequisites Software
- [Bun](https://bun.sh/)
- [Rust](https://rust-lang.org/tools/install/)
  - Note for Windows users: install the "Desktop development with C++" workload using the [Visual Studio Build Tools installer](https://visualstudio.microsoft.com/visual-cpp-build-tools/). 
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Optional but highly recommended: Docker VSCode Extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker)



## List of Commands needed to run in order (starting from `bun install` and ending at `bun tauri`)
```bash
bun install
bun run osm:setup
docker-compose up db
docker-compose up rabbitmq
bun run osm:run
bun tauri
```

---


## Detailed Instructions
1. Clone the [User Interface Repository](https://github.com/ngcp-project/gcs-user-interface)
2. Install the Frontend dependencies using bun (ideal package manager but npm also works)
```bash
bun install
```
3. Run the osm-setup command first before initializing all Docker Images(use the package.json script with `bun osm:setup` and not `docker-compose up` to avoid running all containers)
```bash
bun run osm:setup
```

4. The osm-setup command IS SUPPOSED TO TAKE A WHILE TO INSTALL. If it isn't, please end the process and try again.

<img width="1902" height="1436" alt="image" src="https://github.com/user-attachments/assets/ade11f07-2366-4af7-aa74-a0ee21c75bec" />



6. After the setup is complete, run the PostGreSQL and RabbitMQ containers using docker-compose
```bash
docker-compose up db
docker-compose up rabbitmq
```
> Note: You can use the VSCode Containers extension (equivalent to Docker Desktop) to manage the containers if you don't have Docker Desktop installed. But you still need to have Docker installed on your machine.
> To use the VSCode Containers extension, open the `docker-compose.yml` file in VSCode and click on the "Run Service" button above all services EXCEPT THE OSM-SETUP SERVICE.

6. IMPORTANT NOTE: Please do not run `docker-compose up` as it will run all containers and cause the map server to fail. Follow the steps above to ensure proper installation.

7. To run the entire GCS application, ensure that the osm-server, PostGreSQL, and RabbitMQ containers are running. Run the application using these commands in separate terminal windows:
```bash
bun run osm:run
bun tauri
```
> Note: `bun run osm:run` starts the map server while `bun tauri` starts the desktop application.


## Map Server Debugging Notes
- If you get an error "Error: role renderer already exists" when running the map server, go into Docker Desktop and delete the volume installed. Re-run the setup command to install the volume again.
- Possible solution to making sure that the map server renders properly: 
  - Stop all containers
  - Delete ALL volumes, containers, and images related to GCS in Docker Desktop
  - Re-run the setup command
  - Start the PostGreSQL and RabbitMQ containers only
  - Run the map server using `bun tauri`
- There is a difference between running the osm:setup script vs the docker-compose up osm-setup. In the underlying code for osm:setup, it is docker-compose run while docker-compose up runs all containers. This is why it is important to run the setup script and not the docker-compose command.


## Rust Debugging Notes
- For Windows users, if you encounter issues with Rust during the Tauri build process, ensure that you have the "Desktop development with C++" workload installed via the [Visual Studio Build Tools installer](https://visualstudio.microsoft.com/visual-cpp-build-tools/). This is necessary for compiling native dependencies.


## Docker Debugging Notes
- If `docker-compose` is not working, remove the hyphen and try `docker compose` instead.
