---
title: Telemetry Pipeline
description: Details the flow of telemetry from vehicle to GCS.
---

<small>**Author:** Tavina Chen | **Last Major Update:** Tavina on 8/27/2026 | **Contact:** taffykat (Discord) </small>

![SI Telemetry Flow](/diagrams/SI/SITelemetry.png)

1. Telemetry Manager recieves decoded Telemetry
2. The Telemetry contains a Vehicle enum. The Telemetry manager uses this enum to identify and publish telemetry into the vehicle's corresponding RabbitMQ queue
3.  The GCS App State Manager consumes the telemetry which is then emited to the UI and logged in the database
