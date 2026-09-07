---
title: Commands
description: Command specification
---

## Emergency Stop

Command ID: ```2```
Parameters: ```ConnectionStatus```

The ```Emergency Stop``` command is the command sent by the GCS when a vehicle is to stop operation as soon as possible or resume operation after an emergency stop. The ```Emergency Stop``` command takes one parameter, ```StopStatus```, that specifies whether the vehicle is to engage or disengage emergency stop. Upon receiving the command, how to execute the emergency stop function is up the receiving vehicle.

### Parameter values
| Value | Description |
| StopStatus | --- |
| 0 | Enable emergency stop |
| 1 | Disable emergency stop |

