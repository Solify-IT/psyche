import { BehaviorSubject } from 'rxjs';
import PatientArea from 'src/interfaces/patientArea';
import server from '../utils/server';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser') as string));

export const authenticationService = {
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() { return currentUserSubject.value; },
};

export async function login(username: string, password: string) {
  const result = await server.post('/login', { username, password });
  console.log(result.data);
  localStorage.setItem('currentUser', JSON.stringify(result.data));
  currentUserSubject.next(result.data);

  return result.data;
}

export function profileSet() {
  const user = { ...authenticationService.currentUserValue.user, firstTime: false };
  const newUser = { ...authenticationService.currentUserValue, user };
  localStorage.setItem('currentUser', JSON.stringify(newUser));
  currentUserSubject.next(newUser);
}

export function profileUnset() {
  const user = { ...authenticationService.currentUserValue.user, firstTime: true };
  const newUser = { ...authenticationService.currentUserValue, user };
  localStorage.setItem('currentUser', JSON.stringify(newUser));
  currentUserSubject.next(newUser);
}

export function setPatientAreas(areas: PatientArea[]) {
  const user = { ...authenticationService.currentUserValue.user, areas };
  const newUser = { ...authenticationService.currentUserValue, user };
  localStorage.setItem('currentUser', JSON.stringify(newUser));
  currentUserSubject.next(newUser);
}

export function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('currentUser');
  currentUserSubject.next(null);
}
