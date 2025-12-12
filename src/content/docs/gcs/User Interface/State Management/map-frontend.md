---
title: Map
---

The Map Store is responsible for managing the states of the Leaflet map and keep-in keep-out zones.

The origin of the map `DEFAULT_MAP_ORIGIN` is set to `(33.932573934575075, -117.63059569114814)`, which is where Demo Day and the [Pomona Valley Model Airplane Club (Prado Airpark)](https://maps.app.goo.gl/EM29k7wvYRPZL1Ee9) are located.

## Types and Interfaces

```ts
// src/lib/MapStore.types.ts
export interface MapState {
  map: LeafletMapGeoman | null;
  mapOrigin: LatLng;
  markerCoord: LatLngExpression;
  layers: L.FeatureGroup<L.Polygon>;
  localTileURL: string;
  layerTracking: LayerTracking;
  vehicleMarkers: Record<VehicleEnum, LatLngExpression>;
}

export interface LayerProperties {
  color: string;
  visibility: boolean;
}

export interface ZoneLayer {
  layer: L.Polygon;
  properties: LayerProperties;
}

export interface StageLayer {
  stageId: number;
  polygon: ZoneLayer;
  properties: LayerProperties;
}

export interface VehicleLayers {
  stages: Record<number, StageLayer>;
}

export interface MissionLayers {
  vehicles: Record<VehicleEnum, VehicleLayers>;
  zones: {
    KeepIn: (ZoneLayer | {})[];
    KeepOut: (ZoneLayer | {})[];
  };
}

export interface LayerTracking {
  missions: Record<number, MissionLayers>;
}

export type LeafletMap = InstanceType<typeof LMap>;
export interface LeafletMapGeoman extends LeafletMap {
  leafletObject: LeafletMap["leafletObject"] & L.Map;
}
```

## Functions

Where with the following schema: `const functionName: (parameter: parameterType, ...) => returnType`:

```ts


  // Map Management
  const updateMapRef: (ref: LeafletMapGeoman | null) => void;
  const toggleDrawMode: () => void;
  const rerenderLayers: () => void;
  const logMapStore: () => void;
  const updateVehicleMarker: (vehicle: VehicleEnum, lat: number, lng: number) => void;
  const updateMarkerCoords: (vehicle: VehicleEnum, coords: LatLngExpression) => void;
  const getVehicleMarkers: () => Record<VehicleEnum, LatLngExpression>;

  // Layer Management
  const updateStagePolygon: (missionId: number, vehicle: VehicleEnum, stageId: number) => void;
  const updateZonePolygon: (missionId: number, type: ZoneType, zoneIndex: number) => void;
  const removeStageLayer: (missionId: number, vehicle: VehicleEnum, stageId: number) => void;
  const getStageLayer: (missionId: number, vehicle: VehicleEnum, stageId: number) => StageLayer | undefined;
  const getZoneLayers: (missionId: number, type: ZoneType) => ZoneLayer[];
  const setZoneLayerVisibility: (missionId: number, type: ZoneType, zoneIndex: number) => void;
  const setStageLayerVisibility: (missionId: number, vehicle: VehicleEnum, stageId: number) => void;
  const updateLayerTracking: (state: MissionsStruct) => void;

```
