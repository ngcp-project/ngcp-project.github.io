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

This preferred solution proposes a solution to acquire weather data directly from the weather station. This is to be done by directly reading weather data from a serial connection over USB, parsing the data, and returning a struct containing weather data. 

The struct and functions required to do this will exist in a new file called `weather_telemetry.rs`. This file should live in `placeholder1/placeholder2`.

**Pros:**
- The architecture is simple because an intermediate service such as RabbitMQ is not required
- Data can be quickly processed after it is transmitted by the microcontroller
- This implementation is easy to use as the GCS can just call the provided function and receive a `WeatherData` struct
- Weather conditions are not expected to change so rapidly that the serial approach would require extremely high update rates
- The UI and database teams can choose whether to display, store, or process each returned weather reading

**Cons:**
-  If the serial connection is unavailable while the weather station transmits data, those messages may not be recoverable unless the microcontroller logs or stores them
-  The GCS must read data quickly enough to keep up with the microcontroller’s transmission rate. Otherwise, messages may accumulate in the serial buffer
- The proposed implementation does not provide a method for storing weather data The UI or database team must decide how the messages should be stored
-  The proposed implementation currently does not provide a solution to cases where connection is lost or a port is unavailable

**Assumptions:** 
- The microcontroller has initialized and configured all sensors
- The microcontroller is periodically polling the sensors
- The microcontroller already combines weather data into a single message
- The microcontroller is periodically transmitting weather data over USB
- The GCS app has opened a serial port to establish connection to the weather station
- The GCS app reads data from the serial port fast enough to keep up with the speed that the MCU writes data to prevent accumulating a large number of old messages

**Initialization**

The serial port should be opened during Software Integration's initialization in `placeholder`. This is to establish connection to the Weather Station while the GCS establishes telemetry with the other systems. It also avoids the issue of forcing the UI or Database teams to manage the connection with the weather station. 

This implementation uses the Rust crate https://crates.io/crates/serialport so that the GCS can easily interact with serial ports as Rust does not natively support this.

**Adding serialport as dependency** 
In `placeholder.toml`, serialport can be added as a dependency like:
```toml
[dependencies]
serialport = "4.3.0"
```

**Opening and Configuring the Port**

In `placeholder_initialization.rs`, a virtual COM port will be opened to establish connection to the weather station. This will be implemented as:

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

The `get_weather_data()` function will read one complete message from the serial connection. It will pass the message to `parse_weather_data()` and return a `Result` containing either a `WeatherData` struct or an error to the GCS application.

The function assumes that the GCS has already established the serial connection. Its responsibility is to read and process one message rather than manage the connection.

```rust
// This is placeholder code but the intended process is:
// 1. A buffered reader reads one line containing a message
// 2. The message is stored as a String
// 3. The string is passed to parse_weather_data()
// 4. A Result containing either a WeatherData struct or an error is returned
pub fn get_weather_data<R: BufRead>(
    reader: &mut R,
) -> Result<WeatherData, WeatherDataError> {
    let mut message = String::new();

    reader.read_line(&mut message)?;

    parse_weather_data(&message)
}
```

`WeatherDataError` is included conceptually here and should represent serial
read failures, invalid message formats, missing fields, and invalid values.

**Parse Weather Data Function**

The `parse_weather_data()` function will convert the read message transmitted by the weather station into a `WeatherData` struct. It will identify the fields in the message, convert their values to the appropriate data types, and return an error if the message is missing the required fields or contains invalid data.

```rust
// This is also placeholder code and should be updated before this branch is merged
// The function parses the message according to the format provided by the infrastructure team
// The function returns WeatherData if all required fields are valid
fn parse_weather_data(
    message: &str,
) -> Result<WeatherData, WeatherDataError> {
    todo!("Implement after the message format is finalized")
}
```

**Testing**

The `parse_weather_data()` function should be unit tested using sample messages
without requiring a physical weather station. Tests should include valid
messages, missing required fields, invalid values, and incorrectly formatted
messages.

The `get_weather_data()` function can be tested using simulated serial input to
verify that it reads a message and passes it to the parser. Testing with the
actual weather station should verify that the serial connection, baud rate,
message delimiter, and message format work as expected.


#### [ALTERNATIVE 1] Alternative Implementation 1 Title
Then you will describe an alternative implementation with it's pros and cons. List as many alternative sections as needed. You may have multiple subsections of preferred and alternaitve implementations for different parts of your solution. 

**Pros:**
- List out pros if applicable

**Cons:**
- List out cons if applicable

## Unit/End to End Testing

**Guides to Unit Testing** 
- Rust Unit Testing Guide: https://doc.rust-lang.org/rust-by-example/testing/unit_testing.html
- In depth Rust Unit Testing + Shortcuts/Addons: https://www.shuttle.dev/blog/2024/03/21/testing-in-rust

**Unit testing in Rust**
- $ cargo test runs all tests within the code
- When testing, duplicate the function you want to test right after the original function, and add #[test] to the new function to indicate unit testing.
- "panic!" should be used when there is a status that is impossible is reached
- assert! checks if a statement is true

**Example code Snippet for proptesting** 

use proptest::prelude::*;

proptest! {

    #[test]
   
    fn i64_abs_is_never_negative_above_min(a in 1..1000i32) {

        assert!(a.abs() >= 0);
    }
}


**Example code snippet for basic unit testing** 

#[cfg(test)]

mod tests {
    
    use super::*;

    #[test]
    fn larger_can_hold_smaller() {
        let larger = Rectangle {
            width: 8,
            height: 7,
        };
        let smaller = Rectangle {
            width: 5,
            height: 1,
        };

        assert!(larger.can_hold(&smaller));
    }
}

- To ignore a test during runtime, add #[ignore]
- The bodies of test functions typically perform some setup, run the code we want to test, then assert whether the results are what we expect.
- Quicker average solve development time if we can catch bugs early with Unit testing vs 
executing entire program and debugging that way
- To test, define the function, then add continue by adding code as follows: 
    - mod tests 
        // Note this useful idiom: importing names from outer (for mod tests) scope.
        use super::*;
    - Then call the function with test_ ahead of it to classify as for unit testing purposes to get the resule back
    - Run cargo test after to get the specified results of the unit testing.
- ? is a rust operator, which allows for more specific testing, when used, the regular result which is returned is Result<T,E>, and the tests should end with Ok(()).
- assert_eq! is the main thing we'd be using real time
- assert_ne! is the other function we can use which is the opposite of assert_eq and evaluates to true if the equation is false.
- You can add a second argument inside the assert statement to stand for a specific error message that you want to show to the user.
- Can add should_panic to function (#[should_panic] after #[test]), which should be used when verifying that a program panics for a certain case(s).
- When doing should_panic, you should add an expected parameter to ensure the most precise results. EX:     #[should_panic(expected = "less than or equal to 100")]
- Finally, Result<T,E> can be used if you do not want the program to panic and auto quit.
- Can be implemented with Ok(T) (T is expected data) / Err(E) (E = error details)

Example usage of basic unit testing layout in Rust - 
 - testing function (add Result<T,E> if using this instead of assert)
    - mod tests 
        - use super::*
            - #[test] (add other ones if needed)
                - functionName

**Best Practices with Unit Testing in Rust**
- Make a seperate subfolder for INTEGRATION tests (not unit testing which should go next to where the normal functions are created), and within that make a file ending in .rs for unit testing.
- Make a seperate subfolder within tests for modules and for any other utility functions
- Then you can import both modules into the proper test function

**Additonal features which make unit testing in Rust much easier** 
- Instead, we should use "use *pretty_assertions::assert_eq;*", this does the same thing as assert_eq! but is "prettier formatted" with colors and easier to read.
- *Proptesting* is very useful for the fact that it can be used to test a function  many times with different, alternating values, which allow for easier testing.
- *cargo-nextest*(cargo add cargo-nextest) increases base cargo test efficency by 3x through parallel execution. *cargo nextest run* allows for all tests to be run at the same time. *cargo nextest list* lists all tests which are needed to be run.
- We can also use *testcontainers* in Rust (cargo add testcontainers
cargo add testcontainers-modules) which makes a setup and also destroys the container after automatically; meant for integration testing.git status --short --branch
- *cargo-fuzz* is another crate meant to help with fuzz testing in Rust (finds the minimial inputs to the function which make it fail) (cargo fuzz init)
- *cargo-mutants* changes variables which would make code fail or succeed, based on what has changed.


# What we should be using
- *cargo test*, for basic testing of #[tests]
- *proptest!* for mass, automated testing and finding edge cases. Use prop_assert! (proptest alternative to regular assert!) and prop_assert_eq! (proptest alternative to regular equal checking)
- *cargo-nextest* for upgraded base cargo test.
- *mockall* allows us to simulate the other pieces of the program which we cant connect to in live time, like the vehicle
- *cargo-tarpaulin* generates percentages and reports if needed, makes data based on the functions that were touched by the test portion.

# Rust Unit Testing Standard  for SI
- Checking if outputs are as expected, if not then throwing errors immidealty to catch quickly and debug fast
- Finding edge cases and doing mass testing on our functions/implementations using rust unit testing
- Creating subfolders for specifically testing
- Making more subfolders for modules and other utility functions
- Importing those modules and other utility functions into the main file(s)
- Proper error handling using pretty assertions, and as well overall descriptive language
- Clear cut documentation for each part of every unit test which allows for less complexity and easier usage

# Comments and Documentation for Rust End
- Use // for implementation details; lines of code or logic inside a block of code
- Use /* comment */ for multiline comments.
- Use /// for header comments, comments which are describing entire functions that proceed it.
- Use //! for commenting on a parent item (top of crate/module file often)
- Use #[test], #[ignore], #[should_panic], etc, above the function to indicate what you are testing, make sure it's well formatted.
- Explain each functions parameters, purpose, what you are testing for, and what each line does CLEARLY.

List out what cases and edge cases you will be testing. If you are refactoring, no need to list the cases, just make sure it passes existing test cases. 

Unit tests would be like testing normal and edge cases for newly introduced methods or a small part of the flow. The test file should be named after the file you are testing (yourFileTest.x) and located in a testing folder (create one if it does not exist). If applicable, you may use a testing framework. 

End to end testing would be test files that test the entire process from point A to point B. This may be cross-team, endpoints/interfaces that your subteam has with other teams, etc. Include this if applicable.