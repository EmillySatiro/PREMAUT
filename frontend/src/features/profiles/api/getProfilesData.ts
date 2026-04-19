import { MonitorScreenData, PatientScreenData, ProfessorScreenData } from "../types";
import { mockProfilesDataSource } from "./mockProfilesDataSource.ts";
import { ProfilesDataSource } from "./profilesDataSource.ts";

// Ready for migration: replace this binding with an HTTP datasource when backend endpoints are enabled again.
const activeDataSource: ProfilesDataSource = mockProfilesDataSource;

export function getProfessorScreenData(): Promise<ProfessorScreenData> {
  return activeDataSource.getProfessorScreenData();
}

export function getMonitorScreenData(): Promise<MonitorScreenData> {
  return activeDataSource.getMonitorScreenData();
}

export function getPatientScreenData(studentId?: number): Promise<PatientScreenData> {
  return activeDataSource.getPatientScreenData(studentId);
}
