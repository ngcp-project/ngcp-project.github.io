---
title: Software Integration Overview
description: Home page for Software Integration team documentation.
sidebar:
  order: 3
---

<small>**Author:** Tavina Chen | **Last Major Update:** Tavina on 8/27/2026 | **Contact:** taffykat (Discord) </small>

Documentation for the GCS Software Integration (SI) team.

## What is SI? Infra's vs SI's Role

### Both: 
Manage data flow between Vehicles and the GCS Desktop Application. 

### How they differ:
| Infra | SI |
| :--- | :--- |
| Interact directly with the hardware (Xbees). | Interact indirectly with the XBees through Infra. |
| GCS internal & external (vehicles). | SI is GCS internal. |
| Encode and decode bytes in the packets sent between Xbees.  | Manage GCS internal data pipelines and logic pertaining them. |

## High-Level Architcture

SI uses the **Python** and **Rust** programming languages with **RabbitMQ** for IPC. See [What is RabbitMQ?](/gcs/software-integration/1-rabbitmq).

:::caution[Caution]
This is a highly simplified explanation. Therefore, it is not 100% accurate to the actual architecture. See [Telemetry Pipeline](/gcs/software-integration/2-telemetry-pipeline) and [Command Pipeline](/gcs/software-integration/3-command-pipeline) for more details.
:::

![High Level SI Architecture](/diagrams/SI/SIOverview.png)

This diagram showcases SI's role in how the data generally flows from vehicle to the GCS and GCS to the vehicle to achieve communication.

Each vehicle has an Xbee. The GCS has one Xbee. The Xbees communicate through radio waves, using unique MAC addresses to target which Xbee to transmit to.

### Vehicle to GCS
**1. GCS Xbee recieves packets**
- These packets are made of bytes that need to be decoded using Infrastructure's libraries
- See this test script [Testing/GCSTest.py](https://github.com/ngcp-project/GCS-Integration-Library-2025-26/blob/main/Testing/GCSTest.py) for how it is used on the GCS side 
- Read [gcs-infrastructure](https://github.com/ngcp-project/gcs-infrastructure) for more in depth explanations on the functions

**2. SI publishes packet data to RabbitMQ queue**

**3. GCS App State Manager consumes packet data from RabbitMQ queue**

**3. UI & Database**
- The GCS App State Manager will update the UI and database accordingly

### GCS to Vehicle
**1. UI**
- The user presses an UI element which updates the GCS App State Manager

**2. GCS App State Manager publishes data to RabbitMQ queue**

**3. SI consumes the data from RabbitMQ queue**

**4. GCS Xbee sends data**
- The data needs to be encoded using Infra's Library as seen above in **Vehicle to GCS - GCS Xbee recieves packets**

## Codebase
:::caution[Caution]
This is not an exhaustive list. You might need to dig around related files on the GCS Desktop App repo to see how it fits within the overall architecture. 
:::
- [GCS-Integration-Library-2025-26](https://github.com/ngcp-project/GCS-Integration-Library-2025-26)
- [gcs-desktop-app/src-tauri/src/commands](https://github.com/ngcp-project/gcs-desktop-app/tree/main/src-tauri/src/commands)
- [gcs-desktop-app/src-tauri/src/telemetry](https://github.com/ngcp-project/gcs-desktop-app/tree/main/src-tauri/src/telemetry)

### General Tech Debt:
- Write unit tests for every function/file in their own test files
- Clean up and encapsulate more parts of the code for readability & clarity
    - Discuss how/where to process telemetry (using Python or Rust?)
    - Discuss if SI should be a submodule, standalone repo, and/or directly in the GCS App repo

