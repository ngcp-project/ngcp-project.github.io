---
title: Rust Modules Overview
---

Since we are developing this app using **Tauri**, the frontend has the ability to interact with Rust modules on the backend. This page briefly describes the function of these modules and how the UI interacts with them.


## Commands

This module publishes commands to [RabbitMQ](/gcs/vehicle-integration/rabbitmq/).

Using this module, the frontend is able to issue zone and mission updates, as well as send an emergency stop signal to all vehicles. Currently, the mission update command is unused, and the zone update command is only used by the backend when starting a mission.

All commands require a vehicle ID to be specified (in the case of the emergency stop command, "ALL" may be used to stop all vehicles). When sending a mission update, a mission ID must be provided, and when sending a zone update, a zone ID and pair of geographical coordinates must be provided.

## Missions



## Telemetry
