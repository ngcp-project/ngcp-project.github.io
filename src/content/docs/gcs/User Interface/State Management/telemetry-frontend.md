---
title: Telemetry
---

The Telemetry Store is responsible for managing the states of vehicle telemetry data, as well as their coordinates and map markers.



## Functions
Where with the following schema: `const functionName: (parameter: parameterType, ...) => returnType`:
```ts

  // Backend State
  const syncRustState: (state: VehicleTelemetryData) => void;

  // Methods
  const updateVehicleMarkers: (state: VehicleTelemetryData) => void;
  const updateVehicleCoords: (vehicle: VehicleEnum, coords: LatLngExpression) => void;
  // simulateMovement: () => void;

  // Telemetry Data
  const getTelemetry: () => VehicleTelemetryData; 

```
