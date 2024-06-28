---
title: Geofence Zones Endpoint
---
## zones/in (GET)

- Example call: http://localhost:5135/zones/in

<aside>
🤖 Output — Stringified JSON

</aside>

```json
{"message":"","error":"","data":"{\u0022keepIn\u0022:true,\u0022coordinates\u0022:[{\u0022latitude\u0022:1,\u0022longitude\u0022:2},{\u0022latitude\u0022:2.5,\u0022longitude\u0022:1.69}]}"}
```

---

## zones/out (GET)

- Example call: http://localhost:5135/zones/out

<aside>
🤖 Output — Stringified JSON

</aside>

```json
{"message":"","error":"","data":"{\u0022keepIn\u0022:true,\u0022coordinates\u0022:[{\u0022latitude\u0022:2,\u0022longitude\u0022:2},{\u0022latitude\u0022:2.5,\u0022longitude\u0022:1.69}]}"}
```

---

## zones/in (POST)

- Example call: http://localhost:5135/zones/in

<aside>
✍️ Input

</aside>

```json
{
    "keepIn": true,
	"coordinates": [
		{
			"latitude": 1.0,
			"longitude": 2.0
		},
		{
			"latitude": 2.5,
			"longitude": 1.69
		}
	]
}
```

<aside>
🤖 Output

</aside>

```json
{"message":"Posted keepIn zone successfully.","error":"","data":""}
```

---

## zones/out (POST)

- Example call: http://localhost:5135/zones/out

<aside>
✍️ Input

</aside>

```json
{
    "keepIn": false,
	"coordinates": [
		{
			"latitude": 2.0,
			"longitude": 2.0
		},
		{
			"latitude": 2.5,
			"longitude": 1.69
		}
	]
}
```

<aside>
🤖 Output

</aside>

```json
{"message":"Posted keepOut zone successfully.","error":"","data":""}
```

---