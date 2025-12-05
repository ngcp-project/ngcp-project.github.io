---
title: Mission
---

The Mission Store is responsible for managing the states of data related to vehicles, missions, stages, and zones.

## Types and Interfaces

```ts
// src/lib/MissionStore.types.ts
export type ViewType = "mission" | "vehicle" | "stage" | "zone";
export interface ViewState {
  currentView: ViewType;
  currentMissionId: number | null;
  currentVehicleName: VehicleEnum | null;
  currentStageId: number | null;
}
```

## Functions
Where with the following schema: `const functionName: (parameter: parameterType, ...) => returnType`:
```ts

  // Backend state
  const syncRustState: (state: MissionsStruct) => void;

  // Frontend State
  const setCurrentView: (view: ViewType) => void;
  const setCurrentMissionID: (missionId: number | null) => void;
  const setCurrentVehicleName: (vehicleName: VehicleEnum | null) => void;
  const setCurrentStageID: (stageId: number | null) => void;

  // Mission Data
  const getAllMissions: () => MissionStruct[];
  const getMissionData: (missionId: number) => MissionStruct | undefined;
  const renameMission: (missionId: number, missionName: string) => Promise<null>;
  const createNewMission: (missionName: string) => Promise<null>;
  const deleteMission: (missionId: number) => Promise<null>;
  const startMission: (missionId: number) => Promise<null>;

  // Vehicle Data
  const getVehicleData: (missionId: number, vehicleName: VehicleEnum) => VehicleStruct | undefined;
  const setAutoMode: (missionId: number, vehicleName: VehicleEnum, isAuto: boolean) => Promise<null>;

  // Stage Data
  const getStageData: (missionId: number, vehicleName: VehicleEnum, stageId: number) => StageStruct | undefined;
  const addStage: (missionId: number, vehicleName: VehicleEnum) => Promise<null>;
  const deleteStage: (missionId: number, vehicleName: VehicleEnum, stageId: number) => Promise<null>;
  const renameStage: (missionId: number, vehicleName: VehicleEnum, stageId: number, stageName: string) => Promise<null>;
  const transitionStage: (missionId: number, vehicleName: VehicleEnum) => Promise<null>;
  const updateStageArea: (missionId: number, vehicleName: VehicleEnum, stageId: number, area: GeoCoordinateStruct[]) => Promise<null>;

  // Zone Data
  const getZoneData: (missionId: number, zoneType: ZoneType) => GeoCoordinateStruct[][] | undefined;
  const addZone: (missionId: number, zoneType: ZoneType) => Promise<null>;
  const updateZone: (missionId: number, zoneType: ZoneType, zoneIndex: number, polygon: GeoCoordinateStruct[]) => Promise<null>;
  const deleteZone: (missionId: number, zoneType: ZoneType, zoneIndex: number) => Promise<null>;

```
