import { MonitorScreenData, PatientScreenData, ProfessorScreenData } from "../types";

export interface ProfilesDataSource {
  getProfessorScreenData(): Promise<ProfessorScreenData>;
  getMonitorScreenData(): Promise<MonitorScreenData>;
  getPatientScreenData(studentId?: number): Promise<PatientScreenData>;
}
