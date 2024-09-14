---
title: Mission Info Endpoints
---
## MissionInfo (GET)

- Example call: http://localhost:5135/MissionInfo?missionName=Search%20Area%20Time

<aside>
✍️ Input

</aside>

```txt
missionName=Search Area Time
```

<aside>
🤖 Output

</aside>

```json
{
    "message": "",
    "error": "",
    "data": "{\"missionName\":\"Search Area Time\",\"currentStageId\":\"Initialize\",\"stages\":[{\"stageName\":\"Initialize\",\"stageStatus\":0,\"vehicleKeys\":[{\"vehicleName\":\"ERU\",\"target\":{\"latitude\":1,\"longitude\":2},\"searchArea\":[{\"latitude\":5,\"longitude\":10},{\"latitude\":5,\"longitude\":10}]},{\"vehicleName\":\"FRA\",\"target\":{\"latitude\":1.5,\"longitude\":3},\"searchArea\":[{\"latitude\":1,\"longitude\":2},{\"latitude\":1,\"longitude\":2}]}]}]}"
}
```

---

## Mission Info Initialization (POST)

- Example call: http://localhost:5135/MissionInfo
### Purpose
Creates a Mission Info object initialized with an array of Mission Stages. The POST endpoint requires that one Mission Stage's information be initialized along side with the Mission Info object. When calling the Mission Stages POST endpoint, the endpoint will override the Mission Info object provided that the Mission Info object is already created. 

### Notes
- The stages are indexed based on increasing order of the missions (ex. 1st stage is index 0, 2nd stage is index 1, 3rd stage is index 2, etc.)

<aside>
✍️ Input with null Target and Search Area

</aside>

```json
{
    "missionName": "Search Area Time",
    "stageName": "Initialize",
    "vehicleKeys": [
        {
            "vehicleName": "ERU",
            "target": null,
            "searchArea": null
        },
        {
            "vehicleName": "FRA",
            "target": null,
            "searchArea": null
        }
    ]
}
```

<aside>
✍️ Input with Target and Search Area coordinates defined

</aside>

```json
{
    "missionName": "Search Area Time",
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
}
```

<aside>
🤖 Output

</aside>

```json
{
    "message": "Posted MissionInfo",
    "error": "",
    "data": ""
}
```

## Increment Current Stage (POST)

- Example call: http://localhost:5135/CurrentStage

<aside>
✍️ Input

</aside>

```json
{
    "missionName": "Search Area Time",
}
```

<aside>
🤖 Output

</aside>

```json
{
    "message": "Updated CurrentStage to ...",
    "error": "",
    "data": ""
}
```