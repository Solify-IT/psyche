import { apiGet } from 'src/api';
import { Patient } from '../interfaces/patient';

async function getPatients() : Promise<Patient[]> {
  const patients = await apiGet<Patient[]>('/patients');
  console.log(patients);
  return patients;
}

export default getPatients;
