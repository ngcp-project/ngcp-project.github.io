---
title: RabbitMQ
description: Documentation of Rabbitmq
---

## Definition
RabbitMQ is a message broker: it accepts and forwards messages. You can think about it as a post office: when you put the mail that you want posting in a post box, you can be sure that the letter carrier will eventually deliver the mail to your recipient. In this analogy, RabbitMQ is a post box, a post office, and a letter carrier.
For more information:
- https://www.rabbitmq.com/tutorials

## Usage for GCS
- RabbitMQ serves, as the central message broker in GCS(Ground Control Station) architectures, enabling efficient communication between multiple vehicles using different queues within one channel and one connection to the same server.
### Architecture Components:
- Publishers: Vehicle systems that published the data from the vehicle 
- Subscribers: Backend systems that receive and process messages
- Queues: Separate message channels for different vehicle types or functions
- Exchange: Routes messages to appropriate vehicle queues
     
![alt text](image2.png)

### Benefits:
- Each vehicle has its own data queue,no mixing data
- If backend is temporarily down, messages wait in the queue
- Easy to add new vehicles without changing existing code
- Data flows continuously from vehicles to display  
## Code example
### Set up server
> ```rust
>  use rabbitmq_client::RabbitMQPublisher;
>  let publisher = RabbitMQPublisher::new("amqp://admin:admin@localhost:5672/%2f").await?;
>```

### Vehicle data publishing
>```rust
>impl RabbitMQPublisher {
>    pub async fn new(addr: &str) -> LapinResult<Self> {
>        let connection = Connection::connect(addr, ConnectionProperties::default()).await?;
>        let channel = connection.create_channel().await?;
>        Ok(Self { channel })
>    }>
>
>    pub async fn publish_telemetry(
>        &self,
>        name_of_vehicle: &str,
>        telemetry: TelemetryData,
>    ) -> LapinResult<()> {
>        let queue_name = format!("telemetry_{}", name_of_vehicle);
>        self.channel
>            .queue_declare(
>                &queue_name,
>                QueueDeclareOptions {
>                    durable: true,
>                    auto_delete: false,
>                    exclusive: false,
>                    ..Default::default()
>                },
>                FieldTable::default(),
>            )
>            .await?;
>
>        let payload = serde_json::to_vec(&telemetry)
>            .map_err(|e| lapin::Error::from(std::io::Error::new(std::io::ErrorKind::Other, e)))?;
>
>        self.channel
>            .basic_publish(
>                "",
>                &queue_name,
>                BasicPublishOptions::default(),
>                &payload,
>              BasicProperties::default()
>                    .with_content_type("application/json".into())
>                    .with_delivery_mode(2),
>            )
>            .await?;
>
>        println!("Published telemetry data for vehicle {}", name_of_vehicle);
>       Ok(())
>    }
>}

- The publisher connects to the server initialized
- Creates a channel where the data is going to be passed
- Creates queues for each vehicle
- Passes the information based on their respective name



### Vehicle data consumer
>```rust
> pub async fn init_consumers(&self) -> LapinResult<()> {
>       // Start heartbeat monitor
>      self.start_heartbeat_monitor().await;
>      for vehicle_id in VALID_VEHICLE_IDS.iter() {
>         let queue_name = format!("telemetry_{}", vehicle_id);
>        println!("Initializing consumer for queue: {}", queue_name);
>
>           // Declare queue first
>          self.queue_declare(&queue_name).await?;
>
>           tokio::spawn({
>              let consumer = self.clone();
>             let queue = queue_name.clone();
>            async move {
>               if let Err(e) = consumer.start_consuming(&queue).await {
>                  eprintln!("Failed to consume from queue {}: {}", queue, e);
>            }
>         }
>   });
>}
>
> Ok(())

- Sets up consumers for all valid vehicle IDs (eru, mea, mra, fra)
- Starts heartbeat monitoring to track vehicle connections
- Creates separate background tasks for each vehicle queue
- Each consumer watches its vehicle's queue for new messages
- When data arrives, it gets processed into objects for the frontend
- Updates the display screen with current vehicle status and telemetry
- Stores data in database for historical tracking


### Data Flow Summary:
#### Vehicle → RabbitMQ Queue → Backend Consumer → Frontend Display + Database Storage