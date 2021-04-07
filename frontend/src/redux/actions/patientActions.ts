import { GET_PATIENTS, PatientActionTypes } from '../types/patientTypes';
import { Patient } from '../interfaces/patient';

const getPatientsAction = (patients: Patient[]): PatientActionTypes => ({
  type: GET_PATIENTS,
  payload: patients,
});
export default getPatientsAction;
