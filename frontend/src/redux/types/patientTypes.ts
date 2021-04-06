import { Patient } from '../interfaces/patient';

export const GET_PATIENTS = 'GET_PATIENTS';

export interface GetPatientsStateType {
  patients: Patient[];
}

interface GetPatientsActionType {
  type: string;
  payload: Patient[];
}

export type PatientActionTypes = GetPatientsActionType;
