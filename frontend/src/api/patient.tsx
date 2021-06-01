import Patient from '../interfaces/patient';
import server from '../utils/server';

export async function createPatient(patient:Patient) {
  const result = await server.post('/patients', { ...patient });
  return result.data || result;
}

export async function createCouple(patient:Array<Patient>) {
  const result = await server.post('/patients', patient);
  return result.data || result;
}

export async function getPatients() {
  const result = await server.get('/patients');
  return result.data || result;
}

export async function getPatientRecord(id: number) {
  const result = await server.get(`records/${id}`);
  return result.data || result;
}

export async function canalizePatient(patient:Array<Patient>) {
  const result = await server.post('/canalize-patient', patient);
  return result.data || result;
}

export async function archiveRecord(id: number) {
  const result = await server.put(`/archive-record/${id}`);
  return result.data || result;
}
