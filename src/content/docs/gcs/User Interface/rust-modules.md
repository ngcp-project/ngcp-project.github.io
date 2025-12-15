---
title: Rust Modules Overview
---

Since we are developing this app using **Tauri**, the frontend has the ability to interact with Rust modules on the backend. This page briefly describes the function of these modules and how the UI interacts with them.

## Commands

This module publishes commands to [RabbitMQ](/gcs/vehicle-integration/rabbitmq/).

Using this module, the frontend is able to issue zone and mission updates, as well as send an emergency stop signal to all vehicles. Currently, the mission update command is unused, and the zone update command is only used by the backend when starting a mission.

All commands require a vehicle ID to be specified (in the case of the emergency stop command, "ALL" may be used to stop all vehicles). When sending a mission update, a mission ID must be provided, and when sending a zone update, a zone ID and pair of geographical coordinates must be provided.

## Mission

This module handles the backend state of misssions. It exposes an API that allows you to add, rename, and delete missions, stages, and zones. You can also transition stages, update the stage area, set the auto mode of vehicles, get mission data, and start the mission. Additionally, whenever the mission data is changed, it'll fire an `on_updated` event containing the new data for the mission being updated. There also exists a function to get the default state for missions, though it currently appears unused.

Currently, the [Mission Store](../state-management/mission-frontend) is responsibile for managing the state of missions on the frontend. The functions listed here call their rust module counterparts under-the-hood, so it is preferred that you use the [Mission Store functions](../state-management/mission-frontend#functions) when interacting with the Mission module. 

## Telemetry

This module handles publishing and consuming telemetry sent through [RabbitMQ](/gcs/vehicle-integration/rabbitmq/).

Whenever telemetry receives an update, it'll fire an `on_updated` event containing any new vehicle telemetry data. It currently only exposes methods for getting current telemetry and getting the default telemetry data. As with the Mission Module, the [Telemetry Store](../state-management/telemetry-frontend) is responsibile for managing the state of telemetry on the frontend. As such, it is recommended that you utilize the [Telemetry Store functions](../state-management/telemetry-frontend#functions) to get new telemetry data.
