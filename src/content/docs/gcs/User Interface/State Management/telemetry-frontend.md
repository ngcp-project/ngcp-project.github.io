---
title: Telemetry
---

The Telemetry Store is responsible for managing the states of vehicle telemetry data, as well as their coordinates and map markers.

## Types and Interfaces

```ts
// src/lib/TelemetryStore.types.ts
export interface TelemetryStore {
  // Backend State
  state: VehicleTelemetryData;
  syncRustState: (state: VehicleTelemetryData) => void;

  // Methods
  updateVehicleMarkers: (state: VehicleTelemetryData) => void;
  updateVehicleCoords: (vehicle: VehicleEnum, coords: LatLngExpression) => void;
  // simulateMovement: () => void;

  // Telemetry Data
  getTelemetry: () => VehicleTelemetryData;
}
```
