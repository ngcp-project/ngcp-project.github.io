---
title: Commands
description: Command specification
---

## Heartbeat

Command ID: ```1```
Parameters: ```ConnectionStatus```

The ```Heartbeat``` command is the default command sent by the GCS every x seconds. Its purpose is to diagnose the bidrectional status of connection. The ```Heartbeat``` command takes one parameter, ```ConnectionStatus```, that specifies the quality of the GCS' connection to the vehicle fromthe point of view of the of GCS. There are two possible forms of connection disruption between the GCE and the vehicle: the GCS cannot connect to the vehicle or the vehicle cannot connect to the GCS. The ```Heartbeat``` command is one half od the solution to diagnosing when a disconnect occurs. If a vehicle does not receive a ```Heartbeat``` command in x seconds, there is a disconnect between the GCS and the vehicle. However, at this at this state, only the vehicle is aware of the disconnect. The ```ConnectionStatus``` informs the vehicle whether or not the GCS has been receiving telemetry. ```ConnectionStatus``` is an enumerator that can take the following values:

| Value | Description |
| --- | --- |
| ```ConnectionStatus.Connected``` | The GCS is receiving most or all of the telemetry sent by the vehicle |
| ```ConnectionStatus.Unstable``` | The GCS is receiving approximately half of the telemtry sent by the vehicle |
| ```ConnectionStatus.Disconnected``` | The GCS is receiving insufficient or no telemetry from the vehicle |

If the ```ConnectionStatus``` is ```Unstable``` or ```Disconnected```, the vehicle is aware that there is a disconnect between the vehicle and the GCS.

The Heartbeat command diagnoses the following cases:

| | **Hearbeat Command** | Telemetry |
| --- | --- | --- |
| GCS->vehicle Disconnect | X | |
| vehicle->GCS Disconnect | X | |

See the ```Telemetry``` page for more detials

## Emergency Stop
