import Patient from '../interfaces/patient';
import server from '../utils/server';
import handleResponse from '../utils/handleResponse';

export default async function createPatient(patient:Patient) {
  const result = await server.post('/patients', { ...patient }).then(handleResponse).catch(handleResponse);
  return result.data;
}
