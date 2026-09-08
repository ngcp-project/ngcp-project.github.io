---
title: Commands
description: Command specification
---

## Heartbeat

Command ID: ```1```
Parameters: ```ConnectionStatus```

The ```Heartbeat``` command is the default command sent by the GCS every x seconds. Its purpose is to diagnose the bidrectional status of connection. The ```Heartbeat``` command takes one parameter, ```ConnectionStatus```, that specifies the quality of the GCS' connection to the vehicle fromthe point of view of the of GCS. There are two possible forms of connection disruption between the GCS and the vehicle: the GCS cannot connect to the vehicle or the vehicle cannot connect to the GCS. The ```Heartbeat``` command is one half od the solution to diagnosing when a disconnect occurs. If a vehicle does not receive a ```Heartbeat``` command in x seconds, there is a disconnect between the GCS and the vehicle. However, at this at this state, only the vehicle is aware of the disconnect. The ```ConnectionStatus``` informs the vehicle whether or not the GCS has been receiving telemetry. ```ConnectionStatus``` is an enumerator that can take the following values:

### Parameter values

#### ConnectionStatus
| Value | Ennumeration | Description |
| --- | --- | --- |
| ```ConnectionStatus.Connected``` | 0 |The GCS is receiving most or all of the telemetry sent by the vehicle |
| ```ConnectionStatus.Unstable``` | 1 |The GCS is receiving approximately half of the telemtry sent by the vehicle |
| ```ConnectionStatus.Disconnected``` | 2 | The GCS is receiving insufficient or no telemetry from the vehicle |

If the ```ConnectionStatus``` is ```Unstable``` or ```Disconnected```, the vehicle is aware that there is a disconnect between the vehicle and the GCS.

The Heartbeat command diagnoses the following cases:

| | **Hearbeat Command** | Telemetry |
| --- | --- | --- |
| GCS->vehicle Disconnect | X | |
| vehicle->GCS Disconnect | X | |

See the ```Telemetry``` page for more detials


## Emergency Stop

Command ID: ```2```
Parameters: ```ConnectionStatus```

The ```Emergency Stop``` command is the command sent by the GCS when a vehicle is to stop operation as soon as possible or resume operation after an emergency stop. The ```Emergency Stop``` command takes one parameter, ```StopStatus```, that specifies whether the vehicle is to engage or disengage emergency stop. Upon receiving the command, how to execute the emergency stop function is up the receiving vehicle.

### Parameter values

#### StopStatus
| Value | Description |
| --- | --- |
| StopStatus | --- |
| 0 | Enable emergency stop |
| 1 | Disable emergency stop |

## Add Zone

Command ID: ```3```
Parameters: ```Zone``` ```Coordinates```

The ```AddZone``` command is the command sent by the GCS in order to communicate the presence of a zone that the vehicle needs to ackowledge and respect. . The ```AddZone``` command takes two parameters, ```Zone``` and ```Coordinates```. ```Zone``` is an enummerator with the values ```KeepIn```, ```KeepOut```, and ```SearchArea```. ```Coordinates ``` is a list of (x,y) tuples which represent the edges of a shape detailing the zone.

### Parameter values

#### Zone
| Value | Ennumeration | Description |
| --- | --- | ---|
| ```ZoneType.KeepIn``` | 0 | Zone to be remained inside of by the recieiving vehicle |
| ```ZoneType.KeepOut``` | 1 | Zone to be avoided by the receiving vehicle |
| ```ZoneType.SearchArea | 2 | Zone to be that indicates potential patient locations | 

#### Coordinates
|Value | Description |
| --- | --- |
|  list(tuple(x,y), ...) |  List of tuples with xy coordinates outlining the shape of a zone. Must be between 3 and 6 points inclusive.|


## Patient Location

Command ID: ```4```
Parameters: ```Coordinate```
The ```PatientLocation``` command is the command sent by GCS in order to inform vehicles of the location of the patient. This command is only sent if telemetry recieved from a vehicle indicates awareness of the patient location.  The ```PatientLocation``` command takes one parameter ```Coordinate```.

### Parameter values

#### Coordinate
| Value |  Description |
| --- | ---|
| tuple(x,y) | 0 | Position of the patient in xy coordinates |
