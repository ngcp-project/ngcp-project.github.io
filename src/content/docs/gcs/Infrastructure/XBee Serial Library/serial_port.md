---
title: Finding the serial port (device name)
description: Instructions to find the serial port on different operating systems
---
Instructions to find the serial port of an XBee module connected to the device.
## Mac
1. Plug in XBee RF module
2. Run `ls -l /dev/cu.usb*`

The device name should look similar to this:
```sh
/dev/cu.usbserial-D30DWZKT
```

## Linux

1. Plug in XBee RF module
2. Run `ls -l /dev/ttyUSB*` 

The device name should look similar to this:

```
/dev/ttyUSB0
```

## Windows

1. Plug in XBee RF module
2. Open Windows Device Manager.
3. Find "Ports (COM & LPT)" in the list.
4. Expand "Ports (COM & LPT)" to see the names of all serial ports.
5. The device name should be listed as a "USB Serial Port" and be in parentesis.

The device name should look similar to this:

```
COM3
```