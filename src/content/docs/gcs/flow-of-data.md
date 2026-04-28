---
title: Flow of Data Across the GCS
sidebar:
  order: 1
---

## Goals

1. Understand and be able to explain how data flows through each layer of the GCS.
2. Understand and be able to explain how states are managed via Pinia on the frontend.

## Flow of Data

This is primarily in the perspective of the flow of telemetry. For commands, it is similar but in the opposite direction and no involvement of state management. 

### Infrastructure

Uses XBee modules to transmit and receive data. Each XBee opens a connection before sending/receiving data. Data is sent to a specified address, and can also be sent to other XBees. XBees are fitted onto both the vehicles and the GCS. 

### Software Integration

Works with RabbitMQ, a message broker, to manage packets being sent to and from the vehicles and the GCS. Each vehicle acts as a “publisher” and queues data within the RabbitMQ server. The GCS backend acts as a “consumer” and updates its state management with the new data.

### Database

This category refers to the backend of the GCS rather than strictly “database.” 

Receives data from the RabbitMQ server to update the database and backend Rust states. Features various methods to update data/Rust states. These methods are exposed as an API using Rust modules. Databases queries occur as a side effect of the state management and is used to provide persistent state storage.

The backend serves as the single source of truth for the frontend, which is important because the user interface works with two screens and has to constantly rerender with new, incoming data. 

### User Interface

Through TauRPC (RPC = remote procedure call), we are able to call backend functions from the frontend, primarily allowing us to modify/fetch data (e.g. mission data, telemetry). Using frontend state management and listeners, the user interface and its states are automatically updated with new data. 

## Frontend State Management

### About

The user interface uses Pinia, a state management solution for Vue. It is our solution to synchronizing states between the backend and the frontend. It is used for map, mission, and telemetry data.

### Why State Management

Managing data from three vehicles, in addition to displaying their data on two screens, can be quite complex, time-consuming, and create knowledge overhead, if we built an in-house non-state management solution (e.g. a bunch of APIs that are reactive and work for each component). State management serves to make the lives of the developers easier by centralizing and organizing all of the data into simple sources (stores). It will also handle the constant rerender of data due to the continuous stream of incoming data, and ensures that both GCS screens are displaying the most updated backend states (the backend as the single source of truth). In addition, the state manager allows for type definitions to remain consistent between UI and the backend,

### Why Pinia

It works with Vue’s reactive model, meaning any changes made to the frontend states automatically update the user interface.

Reading states directly from the backend would make it difficult and complex to achieve both the Vue’s reactivity model and everything under Why State Management. 

### How It Works

There is a store for map, mission, and telemetry. It contains related states and methods. These methods can be ones from the backend, which are called via TauRPC. A separate module sets listeners on the backend Rust states, so that whenever those states are updated, the store will update the frontend states. The stores expose reactive states that Vue components can consume.

![Pinia State Management Diagram](./User%20Interface/assets/Pinia-State-Management-Diagram.webp)