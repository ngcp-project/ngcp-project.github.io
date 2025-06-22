---
title: XBee Serial API
description: API for XBee serial library
---
API for the XBee serial library
## Constructor


> ```py
> __init__(port=None, baudrate=115200, status=False, logger=None)
>```

Configure the serial port

> [!NOTE]
> Serial ports are not opened on object creation.

<br>

| <!-- --> | <!-- --> |
| - | - |
| **Parameters** | <ul><li>**port** (`str` or `None`) - Port of serial device.</li><li>**baudrate** (`int`) - Baudrate of serial device.</li><li>**status** (`bool`) - Automatically receive status packets after a transmission.</li><li>**logger** (`Logger`) - Logger object from Logger.Logger used to record data such as sent and received data.</li></ul> |

<br>

See [Serial Port][serial_port] for details on finding the correct serial port name.

*baudrate* should be the same for both device (XBee RF module) and serial port. XBees will be configured to 115200 by default.

See [Frame Details][transmit_status] for details regarding the XBee status packet (Frame type `0x89`).

A `Logger` instance will be created if it is not provided. You should only create your own instance of `Logger` if you want to log data that is not already logged by the XBee library.

**Example:**

```py
from Communication.XBee.XBee import XBee

PORT = "/dev/cu.usbserial-D30DWZKT"
BAUD_RATE = 115200
xbee = XBee(PORT, BAUD_RATE) # status and logger will be set to False and None respectively
```

## Methods

> ```py
> open()
>```
Open a connection over the serial port. This method does not return anything if a port is successfully opened.

<br>

| <!-- --> | <!-- --> |
| - | - |
| **Returns** | `True` if success, `False` if failure (There is already an open port) |
| **Raises:** | `SerialException` if there is an error opening the serial port. |

<br>

A `SerialException` typically occurs if:
* The XBee module is not plugged in
* The port/device name is incorrect
* The port is in use (e.g. There is another program accessing the same port )

> ```py
> close()
> ```

Close a connection over the serial port.

<br>

| <!-- --> | <!-- --> |
| - | - |
| **Returns** | `True` if success, `False` if failure. |
| **Return type** | `bool` | 

<br>

> ```py
> transmit_data(data, address="0000000000000000")
> ```

Send data to another XBee module(s)

<br>

| <!-- --> | <!-- --> |
| - | - |
| **Parameters** | <ul><li>**data** (`str`) -  String data to transmit.</li><li>**address** (`str`) - Address of destination XBee module. `"0000000000000000"` if no value is provided.</li></ul> |
| **Returns** | Status of transmit request. See [0x89 Tx (Transmit) Status][transmit_status] for more details. |
| **Return type** | `x89` or `None` |
| **Raises** | `SerialException` if serial port is not open | 

*data* can be at most 100 bytes (100 characters)

*address* can be set to `000000000000FFFF` in order to broadcast a message

0x89: (frame_type, frame_id, status)

Returns `None` if no status frame is received

<br>

> ```py
> retrieve_data()
> ```


Check for incomming data

<br>

| <!-- --> | <!-- --> |
| - | - |
| **Returns** | `str` if there is incomming data. `None` otherwise.
| **Return type** | `0x81` or `None`
<!-- | **Raises** | `SerialException` if serial port is not open |  -->

0x81: (frame_type, source_address, rssi, options, data)

<br>

> [!NOTE]
> The below methods are used by GCS for testing.


> ```py
> request_at_command_data(self, id)
> ```

Request and retrieve configuration detail of XBee device.

| <!-- --> | <!-- --> |
| - | - |
| **Parameters** | **id** (`str`) - Identifier of AT command |
| **Returns** | AT command response. See [0x88 AT Command Response][at_command_response] for more details. |
| **Return type** | `0x88`|
| **Raises** | `SerialException` if serial port is not open | 


<!-- Links -->
[serial_port]: ./serial_port.md
[frame_details]: ./frame_details.md
[transmit_status]: ./frame_details.md#xbee-transmit-statusapi-mode---frame-type-89
[at_command_response]: ./frame_details.md#0x88---at-command-response

> ```py
> read_config(self, filename)
> ```

> [!Warning]
> This method will be completely rewritten.

This method reads a config file and executes AT commands to retrieve configuration data of an XBee module. All returned data is written to a log file.

| <!-- --> | <!-- --> |
| - | - |
| **Parameters** | **filename** (`str`) - Filename of AT Commands to execute.
| **Raises** | `SerialException` if serial port is not open | 
<!-- | **Returns** | AT command response. See [0x88 AT Command Response][at_command_response] for more details. |
| **Return type** | `0x88`| -->