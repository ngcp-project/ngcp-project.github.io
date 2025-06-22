---
title: XBee Serial Library
description: Main page for XBee Serial Library documentation
---

This library allows for the communication between a computer and a XBee RF module over the serial port. 

## Requirements
* Linux, Windows, or macOS
* Python 2.7 or Python 3.4 and newer

## Getting Started
Clone the GCS Infrastructure GitHub repository
```sh
git clone https://github.com/ngcp-project/gcs-infrastructure
```

Install pyserial 3.5

```sh
pip install pyserial==3.5
```

> [!Note]
> You may want to create a virtual environment before installing this package. This can be done with the following command.
> ```py
> python -m venv <environment_name>
> ```
> See python's [venv](https://docs.python.org/3/library/venv.html) docs for more details.

See the [XBee Serial API][api] page for method details.

See the [Examples][examples] page for example implementations of the XBee Serial Library.


## Getting Help
Any questions? Feel free to @ GCS Infrastructure on Discord.

## Resources
* [Finding the serial port (device name)][serial_port]
* [XBee Serial API][api]
* [Examples][examples]
* [Frame Details][frame_details]


<!-- Links -->
[api]: ./api
[examples]: ./examples
[frame_details]: ./frame_details
[serial_port]: ./serial_port