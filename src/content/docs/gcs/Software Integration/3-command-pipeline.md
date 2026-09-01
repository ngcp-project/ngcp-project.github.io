---
title: Command Pipeline
description: Details the flow of each command type.
---

<small>**Author:** Tavina Chen | **Last Major Update:** Tavina on 8/27/2026 | **Contact:** taffykat (Discord) </small>

## Patient Location
![SI Patient Location Command Flow](/diagrams/SI/SIPatientLocation.png)

1. Telemetry manager recieves Telemetry
2. Telemetry manager checks Telemetry for message flag 2, indicating the patient has been found
3. The Patient Location Manager uses the send_command() method to send the patient location to every vehicle
4. Telemetry Manager checks the Telemetry of each vehicle for an acknowledgement of the PatientLocation command

:::note[Acknowledgements (acks):]
A command has been acknowleged if it fufills the following requirments:
- Packet ID is valid and maps to an expected acknowledgement
- Vehicle is valid and matches what we expect
- Command ID is valid and matches we expect
- It is recieved within the expected time range
:::

5. Once a vehicle has acknowledged the command, it is removed from the set. 
6. The Patient Location Manager will retry up to 10 times to send the PatientLocation command
7. On the GCS Desktop, the telemetry is consumed and processed to display the statuses "Located" and "Secured"


## Heartbeat
:::caution[Tech Debt:]
The current implementation of the heartbeat is scattered and disjointed. Code for both methods described below exist, so it is unclear what the intended flow is. This should be discussed. 
:::

### Method 1: GCS App Impl (Currently Partically Working)

![SI Heartbeat Flow](/diagrams/SI/SIHeartbeat1.png)

1. On the GCS Desktop, the telemetry is consumed and processed to update the connection status
2. The VehicleHeartbeat keeps track of when a telemetry packet was last recieved from a vehicle. 
    - If the time exceeds the timeout, it is updated to display a "Disconnected" status
    - If a vehicle was disconnected and there is telemetry being recieved, it is updated to display a "Connected" status
:::caution[Tech Debt:]
- VehicleHeartbeat Consecutive failures are counted but the value is unused?
- This implementation is not ideal as it does not seem to use the Heartbeat command.
:::

### Method 2: SI Repo Impl (Currently broken/not used?)
![SI Heartbeat Command Flow](/diagrams/SI/SIHeartbeat2.png)

1. Each vehicle has their own Heartbeat Manger
2. It sends the Heartbeat command with the calculated status every second
:::note[Calculated Status::]
- Connected: 80% of heartbeats acknowledged 
- Unstable: 50% of heartbeats acknowledged
- Disconnected: <50% of heartbeats acknowledged

This is subjected to change.
:::
3. This status is updated in the telemetry before publishing it to the RabbitMQ telemetry queue
4. The GCS App State Manager consumes the telemetry which is then emited to the UI and logged in the database

#### In the case of Disconnection
1. The Heartbeat Manager will send out 10 consecutive **Disconnected** Heartbeat statuses to the vehicle before shutting down. These are considered the reconnection attempts
2. It will publish the last known telemetry packet data of that vehicle with the **Disconnected** status to the RabbitMQ telemetry queue
:::caution[Tech Debt:]
The current implementation does not include a way to restart the Heartbeat Manager once a vehicle reconnects. 
:::

#### Why send Heartbeat(status)?
Sending the Heartbeat is a way of "pinging" the vehicle to check if the connection is working. 

Sending the status (bi-directionally) aims to solve cases where the vehicle thinks it is connected but isn't and vice versa. It also allows the vehicles to differentiate between regular heartbeats and a reconnection attempt. 

Otherwise, it is sending telemetry into the void without feedback.

## Other Commands
:::note[Commands:]
**Emergency Stop**: Available to the operator throughout the mission.

**Keep In**, **Keep Out**, and **Search Area**: Sent to all vehicles when the mission starts. (These are the mission details)
:::

![SI General Command Flow](/diagrams/SI/SIGeneralCommands.png)

1. The user presses a UI button (Emergency Stop, Start Mission) which updates the GCS App State Manager
2. The State Manager publishes a command into a unique, temporary, RabbitMQ queue
    - This queue will manage the timeout of the command
3. The Command Manager consumes the command from the queue
4. The command gets encoded and sent to the vehicle through the GCS Xbee
5. Telemetry Manager checks the Telemetry for an acknowledgement of the command
6. Once the command is acknowledged, a RabbitMQ ack is sent back to the same unique queue
    - If the queue expires without an ack, a toast notification will appear on the UI alerting the operator that the command failed to send 

:::tip[Command Args:]
See [gcs-packet/Packet/Command](https://github.com/ngcp-project/gcs-packet/tree/main/Packet/Command) for what args each command is expecting. 
:::