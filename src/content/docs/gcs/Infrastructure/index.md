---
title: Infrastructure Overview
description: Home page for Infrastructure team documentation.
sidebar:
    order: 4
---

Documentation for the GCS Infrastructure team.

:::caution[Caution]
The infrastructure documentation may be outdated. The in-code documentation can be referenced to get more up-to-date information about the API.
:::

## Communication Libraries
<!-- Libraries? Maybe there will be another one made for future iterations of this project :O -->

### XBee Serial Library
This library builds off [pySerial](https://pyserial.readthedocs.io/en/latest/pyserial.html) and allows for the easy transmission and reception of data over the XBee module. This library was made specifically for the [Digi XBee® RR Pro Module][xbee_rr_datasheet].

Refer to the [XBee Serial Library][xbee_readme.md] page for further details and documentation.

## FPV
<!-- TO DO -->

## Additional Libraries

### Logger
Logger builds off of Python's [logging](https://docs.python.org/3/library/logging.html) module and is used to track events that occur when using the XBee serial library (or any other libraries that may be used in the future).

[xbee_readme.md]: ./xbee-serial-library/xbee
[xbee_rr_datasheet]: ../../../../../public/digi-xbee-rr-802-15-4-rf-module-datasheet.pdf