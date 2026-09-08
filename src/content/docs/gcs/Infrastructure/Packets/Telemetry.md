---
title: Telemetry
description: Telemetry specification
---

## Telemetry Packet Structure

| Field | Data Type | Data Size(bytes) | Description |
| --- | --- | --- | --- |
| ```CommandID``` | unsigned char | 1 | ID indicating which command was last responded to |
| ```PacketID``` | unsisgned int | 4  | Individual packet ID of the command being responded to |
| ```Pitch``` | float | 4 | Current vehicle pitch. 0 for invalid vehicles. |
| ```Yaw``` | float | 4 | Current vehicle yaw. 0 for invalid vehicles. |
| ```Roll``` | float | 4 | Current vehicle roll. 0 for invalid vehicles. |
| ```Altitude``` | float | 4 | Current vehicle altitude. 0 for invalid vehicles |
| ```Battery Life```| float | 4 | Current vehicle battery status in percent |
| ```Last Updated``` | unsigned long long | 8 | Time of last update sent by the vehicle |
| ```CurrentPossitionX``` | double | 8 | Current x coordinate position | 
| ```CurrentPositionY``` | double | 8 | Current y coordinate position |
| ```VehicleStatus``` | unsigned char | 1 | !!!todo!!! \
| ```MessageFlag``` |  unsigned char | 1 | Indicate what item location is specified. 0 = No Message, 1 = Package, 2 = Patient |
| ```MessageLat``` | double |  8 | Latitude of the message flag target |
| ```MessageLon``` | double | 8 | Longitude of the message flag target |
| ```PatientStatus``` | unsigned char | 1 | Current status of the patient.

Telemetry packet objects also specify:
```MACAddress```: The hardware MAC address of the vehicle's xbee antena
```Vehicle```: The ennumerator value of the vheicle sending the packet
- UNKNOWN = 0
- MRA = 1
- MEA = 2
- ERU = 3
- ALL = 4
