import PatientArea from 'src/interfaces/patientArea';
import User from '../interfaces/user';
import server from '../utils/server';
import handleResponse from '../utils/handleResponse';

export async function CreateUser(user:User) {
  const result = await server.post('/users', { ...user }).then(handleResponse).catch(handleResponse);
  return result.data;
}

export async function createProfile(areas: Array<PatientArea>, workSchedule: string) {
  const result = await server.post('/profile', { areas, workSchedule }).then(handleResponse).catch(handleResponse);
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

export async function getUsers() {
  const result = await server.get('/allUsers').then(handleResponse).catch(handleResponse);
  return result;
}

export async function modifyProfile(areas: Array<PatientArea>, workSchedule: string)
  : Promise<PatientArea[]> {
  const result = await server.put('/profile', { areas, workSchedule }).then(handleResponse).catch(handleResponse);
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

export async function getUser(username:string) {
  const exist = await server.get(`/user/${username}`);
  return exist;
}

export async function deactivateAccount(id:number) {
  console.log('call');
  const exist = await server.put(`/deactivate-account/${id}`);
  return exist;
}

export async function changePassword(oldPassword: string, password: string) {
  const user = await server.put('/changePassword', { oldPassword, password });
  return user.data;
}
