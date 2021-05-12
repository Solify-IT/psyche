import Record from 'src/interfaces/record';
import Patient from '../interfaces/patient';
import server from '../utils/server';
import handleResponse from '../utils/handleResponse';

export async function createPatient(patient:Patient) {
  console.log(localStorage.getItem('currentUser'));
  const result = await server.post('/patients', { ...patient }).then(handleResponse).catch(handleResponse);
  return result.data;
}

export async function createCouple(patient:Array<Patient>) {
  const result = await server.post('/patients', patient).then(handleResponse).catch(handleResponse);
  return result.data;
}

export async function getPatients() {
  const result = await server.get('/patients').then(handleResponse).catch(handleResponse);
  console.log(result);
  return result;
}

export async function getPatientRecord(id: number) {
  const result = await server.get<Record>(`records/${id}`);
  return result;
}
