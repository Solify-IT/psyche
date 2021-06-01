import PatientArea from 'src/interfaces/patientArea';
import User from '../interfaces/user';
import server from '../utils/server';

export async function CreateUser(user:User) {
  const result = await server.post('/users', { ...user });
  return result.data || result;
}

export async function createProfile(areas: Array<PatientArea>, workSchedule: string) {
  const result = await server.post('/profile', { areas, workSchedule });
  return result.data || result;
}

export async function consultProfile(id: number) {
  const result = await server.get(`/profilePatient/${id}`);
  return result.data || result;
}

export async function getPatients() {
  const result = await server.get('/patients');
  return result.data || result;
}

export async function getUsers() {
  const result = await server.get('/allUsers');
  return result.data || result;
}

export async function modifyProfile(areas: Array<PatientArea>, workSchedule: string)
  : Promise<PatientArea[]> {
  const result = await server.put('/profile', { areas, workSchedule });
  return result.data || result;
}

export async function getUserAreas() {
  const result = await server.get('/profile/areas');
  return result.data || result;
}

export async function updateUser(id: number, user : User) {
  const result = await server.put(`/user/${id}`, user);
  return result.data || result;
}

export async function getUser(username:string) {
  const result = await server.get(`/user/${username}`);
  return result.data || result;
}

export async function deactivateAccount(id:number) {
  const result = await server.put(`/deactivate-account/${id}`);
  return result.data || result;
}

export async function changePassword(oldPassword: string, password: string) {
  const result = await server.put('/changePassword', { oldPassword, password });
  return result.data || result;
}
