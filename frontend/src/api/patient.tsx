import Record from 'src/interfaces/record';
import Patient from '../interfaces/patient';
import server from '../utils/server';
import handleResponse from '../utils/handleResponse';

export async function createPatient(patient:Patient) {
  const result = await server.post('/patients', { ...patient }).then(handleResponse).catch(handleResponse);
  return result.data;
}

export async function createCouple(patient:Array<Patient>) {
  const result = await server.post('/patients', patient).then(handleResponse).catch(handleResponse);
  return result.data;
}

export async function getPatients() {
  const result = await server.get('/patients').then(handleResponse).catch(handleResponse);
  return result;
}

export async function getPatientRecord(id: number) {
  const result = await server.get<Record>(`records/${id}`);
  return result;
}

export async function canalizePatient(patient:Array<Patient>) {
  const result = await server.post('/canalize-patient', patient).then(handleResponse).catch(handleResponse);
  return result.data;
}
