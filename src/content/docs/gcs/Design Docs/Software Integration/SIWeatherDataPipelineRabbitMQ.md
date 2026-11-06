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

#### [PREFERRED] Implementation 1 Title
IF there is more than one method of achieving the same goal, here you will describe your preferred implementation in detail using diagrams, code blocks, etc.  

**Pros:**
- List out pros if applicable

**Cons:**
- List out cons if applicable

#### [ALTERNATIVE 1] RabbitMQ Common Queue Weather Data Pipeline

How to implement RabbitMQ weather pipeline:

First start by creating a new file for specifically weather like telemetryPublisher.py, something like weatherPublisher.py

Flow should be similar to: 
Weather station reader 
Parser creates the weather object same way Telemery object is created
Weatherpublisher converts to JSON format like telemetry
Goes to rabbitMQ afterwards like telemetry on the way to UI
GCS Desktop App then does the consumer thing
UI receives

Then you will describe an alternative implementation with it's pros and cons. List as many alternative sections as needed. You may have multiple subsections of preferred and alternaitve implementations for different parts of your solution. 

**Pros:**
- Already implemented code somewhat from TelemetryPublisher/Pipeline itself
- Robustness versus direct sending
- Data continues being sent in case GCS goes down (?) 
- Familiarity with RabbitMQ


**Cons:**
- Harder to implement compared to directly sending it
- Not as fast run-time wise compared to direct

**Code/Implementations that can be reused:**
- TelemetryPublisher.py's publishing and connecting code for RabbitMQ
- RabbitMQ server and configurations which are already in TelemetryPublisher.py
- listen.rs reusable from src-tauri/src/telemetry/rabbitmq/listen.rs

**Code/Implementations have to be created:**
- Something to read the data off the weather station itself and then send to WeatherPub
- Weather specific publishing, building off the original template of TPub.py. (WPub.py)
- Need a new JSON format converter updated for specifically weather (in TPub)
- Updated UI for showing weather formatting according to RFP
- Publish inside tPub needs to be updated to weather specific
- Consumer inside of src-tauri/src/telemetry/rabbitmq/listen.rs needs to be updated to weather specific, base template useable
- Delimiter for the numbers that specifically need to be relayed to UI

## Unit/End to End Testing
List out what cases and edge cases you will be testing. If you are refactoring, no need to list the cases, just make sure it passes existing test cases. 

Unit tests would be like testing normal and edge cases for newly introduced methods or a small part of the flow. The test file should be named after the file you are testing (yourFileTest.x) and located in a testing folder (create one if it does not exist). If applicable, you may use a testing framework. 

End to end testing would be test files that test the entire process from point A to point B. This may be cross-team, endpoints/interfaces that your subteam has with other teams, etc. Include this if applicable.