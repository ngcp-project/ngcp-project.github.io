---
title: Map
---
 
The Map Store is responsible for managing the states of the Leaflet map and keep-in keep-out zones.

The origin of the map `DEFAULT_MAP_ORIGIN` is set to `(33.932573934575075, -117.63059569114814)`, which is where Demo Day and the [Pomona Valley Model Airplane Club (Prado Airpark)](https://maps.app.goo.gl/EM29k7wvYRPZL1Ee9) are located.

## Types and Interfaces

```ts
// src/lib/MapStore.types.ts
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
  leafletObject: LeafletMap['leafletObject'] & L.Map;
}

export interface MapStore {
  map: LeafletMapGeoman | null;
  mapOrigin: LatLng;
  markerCoord: LatLngExpression;
  layers: L.FeatureGroup<L.Polygon>;
  localTileURL: string;
  layerTracking: LayerTracking;
  vehicleMarkers: Record<VehicleEnum, LatLngExpression>;

  // Map Management
  updateMapRef: (ref: LeafletMapGeoman | null) => void;
  toggleDrawMode: () => void;
  rerenderLayers: () => void;
  logMapStore: () => void;
  updateVehicleMarker: (vehicle: VehicleEnum, lat: number, lng: number) => void;
  updateMarkerCoords: (vehicle: VehicleEnum, coords: LatLngExpression) => void;
  getVehicleMarkers: () => Record<VehicleEnum, LatLngExpression>;

  // Layer Management
  updateStagePolygon: (missionId: number, vehicle: VehicleEnum, stageId: number) => void;
  updateZonePolygon: (missionId: number, type: ZoneType, zoneIndex: number) => void;
  removeStageLayer: (missionId: number, vehicle: VehicleEnum, stageId: number) => void;
  getStageLayer: (missionId: number, vehicle: VehicleEnum, stageId: number) => StageLayer | undefined;
  getZoneLayers: (missionId: number, type: ZoneType) => ZoneLayer[];
  setZoneLayerVisibility: (missionId: number, type: ZoneType, zoneIndex: number) => void;
  setStageLayerVisibility: (missionId: number, vehicle: VehicleEnum, stageId: number) => void;
  updateLayerTracking: (state: MissionsStruct) => void;
}
```
