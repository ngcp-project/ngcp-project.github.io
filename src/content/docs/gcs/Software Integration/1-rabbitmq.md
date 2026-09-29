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
## Code example (Software Integration Repository: Publisher Telemetry Data)

### Set up server
> ```python
>    def setup_rabbitmq(self):
>       # our rabbitmq server will require user/password 
>        credentials = pika.PlainCredentials('admin', 'admin')
>        parameters = pika.ConnectionParameters(host = self.hostName, credentials= credentials, virtual_host= "/")
>       #create a connection to the RabbitMQ server
>        self.connection =  pika.BlockingConnection(parameters)
>        #create a channel
>       self.channel = self.connection.channel()
>        #create telemetry queue for each vehicle
>       self.channel.queue_declare(queue=f"telemetry_{self.vehicleName}", durable = True)
>```

### Vehicle data publishing
>```python
>       def publish(self, data : Telemetry):
>            print(data)
>            if self.channel == None:
>               raise Exception("RabbitMQ channel not initialized")
>           try:
>               if hasattr(data, 'ToJSON'):
>                    # Serialize obj to a JSON formatted str.
>                    message = self.to_actual_JSON(data)
>                    message2 = message.encode("utf-8")
>               else:
>                    message = self.to_actual_JSON(data)
>                    message2 = message.encode("utf-8")
>               self.channel.basic_publish(
>                    exchange= '',
>                   routing_key=f"telemetry_{self.vehicleName}",
>                    body = message2
>                )
>                print(f"Published telemetry for {self.vehicleName}")
>            except Exception as e:
>                print(f"Failed to publish telemetry in the queue: {e}")

- The publisher connects to the server initialized
- Creates a channel where the data is going to be passed
- Creates queues for each vehicle
- Passes the information based on their respective name


## (GCS Desktop Repo: Consumer Telemetry Data)
### Vehicle data consumer
> ```rust
> pub async fn new() -> LapinResult<Self> {
>     let connection =
>         Connection::connect(RABBITMQ_ADDR, ConnectionProperties::default().with_tokio())
>             .await?;
>     let connection = Arc::new(Mutex::new(connection));
>     let channel = connection.lock().await.create_channel().await?;
>     let consumer = Self {
>         connection,
>         channel,
>         db,
>         state: Arc::new(Mutex::new(VehicleTelemetryData::default())),
>         app_handle: None,
>         vehicle_heartbeats: Arc::new(Mutex::new(vehicle_heartbeats)),
>         heartbeat_timeout: Duration::from_secs(DEFAULT_HEARTBEAT_TIMEOUT_SECS),
>         heartbeat_check_interval: Duration::from_secs(DEFAULT_HEARTBEAT_CHECK_INTERVAL_SECS),
>     };
>
>     Ok(consumer)
> }
>
> pub async fn init_consumers(&self) -> LapinResult<()> {
>     for vehicle_id in VALID_VEHICLE_IDS.iter() {
>         let queue_name = format!("telemetry_{}", vehicle_id);
>         println!("Initializing consumer for queue: {}", queue_name);
>
>         // Declare queue first
>         listen::queue_declare(&self.channel, &queue_name).await?;
>
>         tokio::spawn({
>             let consumer = self.clone();
>             let queue = queue_name.clone();
>             async move {
>                 if let Err(e) = consumer.start_consuming(&queue).await {
>                     eprintln!("Failed to consume from queue {}: {}", queue, e);
>                 }
>             }
>         });
>     }
>
>     Ok(())
> }
>
> pub async fn create_consumer(channel: &Channel, queue_name: &str) -> LapinResult<Consumer> {
>     // Generate unique consumer tag using queue name and timestamp
>     let timestamp = std::time::SystemTime::now()
>         .duration_since(std::time::UNIX_EPOCH)
>         .unwrap()
>         .as_millis();
>     let consumer_tag = format!("consumer_{}_{}", queue_name, timestamp);
>
>     println!("Creating consumer with tag: {}", consumer_tag);
>
>     channel
>         .basic_consume(
>             queue_name,
>             &consumer_tag,
>             BasicConsumeOptions::default(),
>             FieldTable::default(),
>         )
>         .await
> }
>
> pub async fn start_consuming(&self, queue_name: &str) -> LapinResult<()> {
>     let consumer = listen::create_consumer(&self.channel, queue_name).await?;
>     process::process_telemetry(
>         consumer,
>         self.state.clone(),
>         self.db.clone(),
>         self.app_handle.clone(),
>         self.vehicle_heartbeats.clone(),
>         self.heartbeat_timeout,
>     )
>     .await?;
>     Ok(())
> }
>
> pub async fn process_telemetry(
>     mut consumer: Consumer,
>     state: Arc<Mutex<VehicleTelemetryData>>,
>     db: PgPool,
>     app_handle: Option<AppHandle>,
>     vehicle_heartbeats: Arc<Mutex<HashMap<String, VehicleHeartbeat>>>,
>     heartbeat_timeout: Duration,
> ) -> LapinResult<()> {
>     let mut failure_count = 0;
>
>     while let Some(delivery) = consumer.next().await {
>         if let Ok(delivery) = delivery {
>             match serde_json::from_slice::<TelemetryData>(&delivery.data) {
>                 Ok(mut data) => {
>                     let vehicle_id = data.vehicle_id.clone();
>                     state
>                         .lock()
>                         .await
>                         .update_vehicle_telemetry_state(vehicle_id.clone(), data.clone());
>
>                     // Create payload for the event
>                     let payload = json!({
>                         "vehicle_id": vehicle_id,
>                         "telemetry": data.clone(),
>                         "timestamp": std::time::SystemTime::now()
>                             .duration_since(std::time::UNIX_EPOCH)
>                             .unwrap()
>                             .as_secs()
>                     });
>
>                     // Emit the telemetry update using TelemetryEventTrigger
>                     if let Some(app_handle) = &app_handle {
>                         let vehicle_telemetry: VehicleTelemetryData = state.lock().await.clone();
>                         match TelemetryEventTrigger::new(app_handle.clone())
>                             .on_updated(vehicle_telemetry)
>                         {
>                             Ok(_) => {
>                                 println!(
>                                     "Successfully emitted telemetry update via event trigger for vehicle: {}",
>                                     vehicle_id
>                                 );
>                             }
>                             Err(e) => {
>                                 println!(
>                                     "Failed to emit telemetry update via event trigger: {}",
>                                     e
>                                 );
>
>                                 // Fallback to regular app_handle emit
>                                 if let Err(e) = app_handle.emit("telemetry_update", &payload) {
>                                     println!("Failed to emit telemetry update: {}", e);
>                                 }
>                             }
>                         }
>                     } else {
>                         println!("Warning: No app_handle available to emit telemetry updates");
>                     }
>
>                     println!("Received telemetry data from {}: {:?}", vehicle_id, payload);
>                     println!("Vehicle {} status: {:?}", vehicle_id, data.vehicle_status);
>                 }
>                 Err(e) => {
>                     failure_count += 1;
>                     println!(
>                         "Failed to parse Telemetry data (attempt {}): {}",
>                         failure_count, e
>                     );
>                     return Err(lapin::Error::InvalidChannelState(
>                         lapin::ChannelState::Closed,
>                     ));
>                 }
>             }
>         }
>     }
>
>     Ok(())
> }
> ```


- Sets up consumers for all valid vehicle IDs (eru, mea, mra, fra)
- Creates separate background tasks for each vehicle queue
- Each consumer watches its vehicle's queue for new messages
- When data arrives, it gets processed into objects for the frontend
- Updates the display screen with current vehicle status and telemetry
- Stores data in database for historical tracking


### Data Flow Summary:
#### Vehicle → RabbitMQ Queue → Backend Consumer → Frontend Display + Database Storage