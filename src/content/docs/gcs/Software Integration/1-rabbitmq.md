---
title: What is RabbitMQ?
description: Documentation of Rabbitmq on GCS
---

<small>**Author:** Paul Puma | **Last Major Update:** Paul on 8/12/2025 | **Contact:** ppumas05(Discord)</small>

:::caution[Caution]
Use this guide to get a quick idea on what is RabbitMQ, the general vocabulary, and how to use it. Documentation about any data flows may be outdated. Please refer to [Telemetry Pipeline](/gcs/software-integration/2-telemetry-pipeline) and [Command Pipeline](/gcs/software-integration/3-command-pipeline) for the most up to date architecture.
:::

## Definition
RabbitMQ is a message broker: it accepts and forwards messages. You can think about it as a post office: when you put the mail that you want posting in a post box, you can be sure that the letter carrier will eventually deliver the mail to your recipient. In this analogy, RabbitMQ is a post box, a post office, and a letter carrier.
For more information:
- https://www.rabbitmq.com/tutorials

## Usage for GCS
- RabbitMQ serves, as the central message broker in GCS(Ground Control Station) architectures, enabling efficient communication between multiple vehicles using different queues within one channel and one connection to the same server.
### Architecture Components:
#### Telemetry Example
- Publishers: Vehicle systems that published the data from the vehicle 
- Subscribers: Backend systems that receive and process messages
- Queues: Separate message channels for different vehicle types or functions
- Exchange: Routes messages to appropriate vehicle queues
     
![alt text](/diagrams/SI/RabbitMQ-Simple-Diagram.png)

### Benefits:
- Each vehicle has its own data queue,no mixing data
- If backend is temporarily down, messages wait in the queue
- Easy to add new vehicles without changing existing code
- Data flows continuously from vehicles to display  

### Data Flow Summary:
#### Vehicle Publisher → RabbitMQ Queue → Exchange Routing → RabbitMQ Queue → Frontend Consumer