---
title: Shadcn Components
sidebar:
  order: 3
---

To help build our UI components, we utilize a [community-led **Vue** port](https://www.shadcn-vue.com/docs/introduction.html) of shadcn/ui.

## Installation

Unlike component libraries, you only install individual components that you need, rather than the whole selection.

Each component are simply installed through the CLI, the command of which you can find on the component's respective page. After that, you have a highly customizable component that you can tweak to your needs.

## Usage

For the shadcn components you do use, make sure to refer to the associated **API Reference** for more customization options than the ones listed on the page.

Components are installed into `src/components/ui/`, so you can import it into your own component with:

```js
// src/components/YourComponent.vue
import { Component } from "@/components/ui/component";
```