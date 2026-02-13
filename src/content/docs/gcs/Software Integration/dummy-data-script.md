---
title: Dummy Telemetry Test Script
---

> Note: This guide assumes that you have installed the GCS application, have it set up correctly, and know how to run it. If you haven't done so, please refer to the [Installation Guide](https://ngcp-project.github.io/gcs/installation/) and [Running GCS Guide](https://ngcp-project.github.io/gcs/running-gcs/).

## Purpose
The purpose of this script is to confirm that the communication between the GCS Integration Library and the GCS Application is working. The script will randomly generate dummy telemetry data and send it into the vehicle telemetry queues. 

## Pre-Script Checks
1. Under the User Interface Repository (GCS application), go to the `.env` file. 
2. Ensure `DUMMY_DATA_ENABLED = false` and `TEST_PUBLISHER = false`. This will disable the GCS-side testing so it can recieve the dummy test data from the GCS Integration Library Repository. 

## Running the script
1. Clone the [GCS Integration Library Repository](https://github.com/ngcp-project/gcs-integration-library)
2. Go to `xbee-tel-update-testing` branch
```bash
git checkout xbee-tel-update-testing
```
3. Install serial library. This is not needed for the testing script, but is required for the repository to work with the Xbees.
```bash
pip install serial
```
4. Change directory to Communication folder
```bash
cd Communication
```
5. Run the test script
```bash
python3 xbee_tag_gcs.py
```

### Check Results
1. Run the GCS application if you want to see results on the UI. Otherwise, ensure RabbitMQ container is running. 
2. Open docker desktop and click on RabbitMQ's port link.
<img width="822" height="75" alt="RabbitMQport" src="https://github.com/user-attachments/assets/9882e6ec-b4e8-4dfa-822f-05d4cfdb40e0" />

3. Log in with `username: admin` `password: admin`. 
4. You should see each that vehicles's telemetry queue is receiving the dummy telemetry data as shown below. If you ran the GCS application, the data should be displayed on the UI.
<img width="926" height="359" alt="RabbitMQReceiving" src="https://github.com/user-attachments/assets/02810b75-7e56-4dbe-a97b-49bdc75cf3e2" />

