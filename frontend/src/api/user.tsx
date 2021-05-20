import PatientArea from 'src/interfaces/patientArea';
import User from '../interfaces/user';
import server from '../utils/server';
import handleResponse from '../utils/handleResponse';

export default async function CreateUser(user:User) {
  const result = await server.post('/users', { ...user }).then(handleResponse).catch(handleResponse);
  return result.data;
}

export async function createProfile(areas: Array<PatientArea>) {
  const result = await server.post('/profile', areas).then(handleResponse).catch(handleResponse);
  return result.data;
}

export async function consultProfile(id: number) {
  const result = await server.get(`/profilePatient/${id}`);
  return result;
}

export async function getPatients() {
  const result = await server.get('/patients').then(handleResponse).catch(handleResponse);
  console.log(result);
}

export async function modifyProfile(areas: Array<PatientArea>) : Promise<PatientArea[]> {
  const result = await server.put('/profile', areas).then(handleResponse).catch(handleResponse);
  return result.data;
}

export async function getUserAreas() {
  const result = await server.get('/profile/areas');
  return result;
}

export async function updateUser(id: number, user:User) {
  const result = await server.put(`/user/${id}`, user);
  return result;
}
