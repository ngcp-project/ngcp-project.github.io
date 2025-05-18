---
title: Mission Stage Endpoints
---
## MissionStage (GET)

- Example call: http://localhost:5135/MissionStage?missionName=Search%20Area%20Time&stageName=Initialize

<aside>
✍️ Input

</aside>

```txt
missionName=Search Area Time
stageName=Initialize
```

<aside>
🤖 Output

</aside>

```json
{
    "message": "Found MissionStage",
    "error": "",
    "data": "{\"stageName\":\"Initialize\",\"stageStatus\":0,\"vehicleKeys\":[{\"vehicleName\":\"ERU\",\"target\":{\"latitude\":1,\"longitude\":2},\"searchArea\":[{\"latitude\":5,\"longitude\":10},{\"latitude\":5,\"longitude\":10}],\"localIP\":\"1.1.1.1\"},{\"vehicleName\":\"FRA\",\"target\":{\"latitude\":1.5,\"longitude\":3},\"searchArea\":[{\"latitude\":1,\"longitude\":2},{\"latitude\":1,\"longitude\":2}],\"localIP\":\"197.10.10.1\"}]}"
}
```

---

## MissionStage (POST)

- Example call: http://localhost:5135/MissionStage

### Notes
- Used for adding a new Mission Stage and modifying an existing Mission Stage
- Made under the assumption that Frontend will send ALL stages associated with a mission, regardless if modified or not.


<aside>
✍️ Input

</aside>

```json
{
    "missionName": "Search Area Time",
    "stages": [
        {
            "stageName": "Initialize",
            "vehicleKeys": [
                {
                    "vehicleName": "ERU",
                    "target": {
                        "latitude": 1.0,
                        "longitude": 2.0
                    },
                    "searchArea": [
                        {
                            "latitude": 5.0,
                            "longitude": 10.0
                        },
                        {
                            "latitude": 5.0,
                            "longitude": 10.0
                        }
                    ]
                },
                {
                    "vehicleName": "FRA",
                    "target": {
                        "latitude": 1.5,
                        "longitude": 3.0
                    },
                    "searchArea": [
                        {
                            "latitude": 1.0,
                            "longitude": 2.0
                        },
                        {
                            "latitude": 1.0,
                            "longitude": 2.0
                        }
                    ]
                }
            ]
        },
        {
            "stageName": "Operate",
            "vehicleKeys": [
                {
                    "vehicleName": "MRA",
                    "target": {
                        "latitude": 5.0,
                        "longitude": 20.0
                    },
                    "searchArea": [
                        {
                            "latitude": 12.0,
                            "longitude": 17.0
                        },
                        {
                            "latitude": 19.0,
                            "longitude": 125.0
                        }
                    ]
                },
                {
                    "vehicleName": "FRA",
                    "target": {
                        "latitude": 1.5,
                        "longitude": 3.0
                    },
                    "searchArea": [
                        {
                            "latitude": 1.0,
                            "longitude": 2.0
                        },
                        {
                            "latitude": 1.0,
                            "longitude": 2.0
                        }
                    ]
                }
            ]
        }

    ]
}
```

<aside>
🤖 Output

</aside>

```json
{
    "message": "Posted MissionStage",
    "error": "",
    "data": ""
}
```

---

## MissionStage (DELETE)

- Example call: http://localhost:5135/MissionStage

<aside>
✍️ Input

</aside>

```json
{
    "missionName": "Search Area Time",
    "stageName": "Initialize"
}
```

<aside>
🤖 Output

</aside>

```json
{
    "message": "Deleted MissionStage",
    "error": "",
    "data": ""
}
```

---