---
title: Weather Data Pipeline Design Doc
description: This is a DD outlining how the weather data will be piped from weather station to GCS
---

:::note
See [How to use the Design Doc Template](/gcs/design-docs/) for instructions.
:::

**Author(s):** Your Name(s)

**Related Teams:** Any other subteam that is involved with the changes

**PR Link:** The link to the PR for this design doc

## Background
Give a brief introduction and some background on what the problem/purpose is.

What is the current state of the project and why is there an issue?
What is the purpose of the changes? (You can write it is to fulfill RFP requirements and elaborate later) 

### RFP Requirement(s)
List the RFP requirement(s) that these changes fulfill if applicable.

:::note[Example]
- [GCS_01.01] The GCS shall log connection status of all vehicles throughout the mission.
- [GCS_01.02] … 
- [GCS_01.03] …
- Etc. 
:::
## Solution
Briefly describe the feature/changes and how it will solve the problem and/or how it fulfills the corresponding RFP Requirement(s). What is the end goal? 

## Design/Implementation
This is where you flesh out the design. 

:::note
This section should not be a line for line implementation of the entire solution, but it should give whoever is reading it a good idea how it will be done. 
:::

This can include but not limited to:
- in depth background/explanations
- diagrams (preferrably using draw.io, see [Contributing Diagrams](/gcs/documentation#contributing-diagrams))
- code blocks (see [Example: Code blocks](/gcs/design-docs/designdoctemplate/#example-code-blocks))
- alternative implementations (see [Example: Alternatives](/gcs/design-docs/designdoctemplate/#example-alternatives))
- expected behavior of the change 

### Example: Code blocks
[path/to/your/file/with/hyperlink/to/yourFile.x](https://www.youtube.com/watch?v=dQw4w9WgXcQ)
```diff
// path/to/your/file/without/hyperlink/to/yourFile.x

MyProgram {

// omit irrelevant code with a ...

+   myNewFunction() {
+    // ... 
+   }

-   myOldFunction(){
-     // ...
-   }

}
```
### Example: Alternatives

#### [PREFERRED] Read Weather Data Directly

This alternatives proposes a solution to acquiring weather data directly from the weather station. This is to be done by directly reading weather data from a serial connection over USB, parsing the data, and returning a struct containing weather data. 

The struct and functions required to do this will exist in a new file called `weather_telemetry.rs`. This file should live in `placeholder/placeholder2`.

**Pros:**
- The architecture is simplier becausean intermediate service such as RabbitMQ is not required
- Data can be quickly shortly after it is written by the microcontroller
- This implementation is simpler as the GCS can just call the provided function and receive a `WeatherData` struct
- Weather conditions are not expected to change so rapidly that the serial approach would require extremely high update rates
- The UI and database teams can choose whether to display, store, or process each returned weather reading.

**Cons:**
-  If the serial connection is unavailable while the weather station transmits data, those messages may not be recoverable unless the microcontroller logs or stores them
-  The GCS must read data quickly enough to keep up with the microcontroller’s transmission rate. Otherwise, messages may accumulate in the serial buffer
-  The provided file does not provide a method to store weather data. UI or Database must decide how to store messages
-  The provided file does not provide a solution if the port is unavailable or if  connection is lost 

**Assumptions:** 
- The microcontroller has brought up all sensors
- The microcontroller is continuously polling the sensors
- The microcontroller alerady combines weather data into a single message
- The microcontroller is continuously writing weather data over USB
- The GCS app has opened a serial port to establish connection to the weather station
- The GCS app reads data from the serial port fast enough to keep up with the speed that the MCU writes data to prevent accumulating a large number of old messages

**Initialization**

The serial port should be opened during Software Integration's initialization in `placeholder`. This is to establish connection to the Weather Station while the GCS establishes telemetry with the other systems. It also avoids the issue of forcing the UI or Database teams to manage the connection with the weather station. 

This implementation uses the Rust crate https://crates.io/crates/serialport so that the GCS can easily interact with virtual serial ports as Rust does not natively support this.

**Adding serialport as dependency** 
In `placeholder.toml`, serialport can be added as a dependency like:
```toml
[dependencies]
serialport = "4.3.0"
```

**Opening and Configuring the Port**

In `placeholder_initialization.rs`, a virtual COM port will be opened to establish connection to the weather station. This will be implemened as:

```rust
fn main() {
    ...
    // Define the port name and the target baud rate
    let port_name = "COM3";
    let baud_rate = 115_200;

    // Open and configure the port using the builder pattern
    let mut port = serialport::new(port_name, baud_rate)
        .timeout(Duration::from_millis(10)) // Set a read timeout
        .open()
        .expect("Failed to open serial port");

    println!("Successfully opened port: {}", port_name);
}
```

**Weather Data Struct**

After the weather station's messages get read and parsed, its values are represented in a `WeatherData` struct.

The fields within the struct are according to the 2026-2027 requirements.

```rust
pub struct WeatherData {
    pub wind_direction: f32,
    pub wind_speed: f32,
    pub cloud_coverage: f32,
    pub rain_level: f32,
    pub temperature: Option<f32>,
}
```

**Get Weather Data Function**

The `get_weather_data()` function will read one complete message from the serial connection. It will then pass the message to `parse_weather_data()` and return the resulting `WeatherData` struct to the GCS application.

The function assumes that the GCS has already established the serial connection. Its responsibility is to read and process one message rather than manage the connection.

```rust
// This is placeholder code but the intended process is:
// 1. A buffered reader reads one line containing a message
// 2. The message is stored as a String
// 3. The string is passed to parse_weather_data()
// 4. A WeatherDataStruct is returned
pub fn get_weather_data<R: BufRead>(
    reader: &mut R,
) -> Result<WeatherData, WeatherDataError> {
    let mut message = String::new();

    reader.read_line(&mut message)?;

    parse_weather_data(&message)
}
```
**Parse Weather Data Function**

The `parse_weather_data()` function will convert the read message transmitted by the weather station into a `WeatherData` struct. It will identify the fields in the message, convert their values to the appropriate data types, and return an error if the message is missing the required fields or contains invalid data.

```rust
// This is also placeholder code and should be updated before this branch is merged
// The function parses the message according to the format provided by the infrastructure team
// The function returns WeatherData if all required fields are valid
fn parse_weather_data(
    message: &str,
) -> Result<WeatherData, WeatherDataError> {

}
```

#### [ALTERNATIVE 1] Alternative Implementation 1 Title
Then you will describe an alternative implementation with it's pros and cons. List as many alternative sections as needed. You may have multiple subsections of preferred and alternaitve implementations for different parts of your solution. 

**Pros:**
- List out pros if applicable

**Cons:**
- List out cons if applicable

## Unit/End to End Testing
List out what cases and edge cases you will be testing. If you are refactoring, no need to list the cases, just make sure it passes existing test cases. 

Unit tests would be like testing normal and edge cases for newly introduced methods or a small part of the flow. The test file should be named after the file you are testing (yourFileTest.x) and located in a testing folder (create one if it does not exist). If applicable, you may use a testing framework. 

End to end testing would be test files that test the entire process from point A to point B. This may be cross-team, endpoints/interfaces that your subteam has with other teams, etc. Include this if applicable.