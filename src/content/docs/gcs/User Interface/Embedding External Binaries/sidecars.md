---
title: Sidecars
sidebar:
  order: 4
---

If we need to embed external binaries into our program, we can create a sidecar configuration to bundle the binaries with the application. This embedded binary is referred to as a sidecar. It is important to note that compiled binaries are only compatible with the architecture it is compiled for.

Creating a sidecar eliminates the need for users to download additional dependencies (e.g. Python). However, developers still need to download said dependencies to compile the binary. 

In addition, sidecars allows us to easily run the binaries with `bun tauri dev` without needing to run it separately.

Currently, we are using this for [FPV Camera](../implementation/fpv-camera).

If you would like to learn more about sidecars, refer to the [official Tauri documentation](https://v2.tauri.app/develop/sidecar/).