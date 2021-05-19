import { User } from 'domain/model';
import LoginResult from 'domain/model/user/loginResult';
import PatientArea from 'domain/model/user/patientArea';

export default interface IUserPresenter {
  getUser(user: User): User;
  register(user: User) : User;
  findAll(users: User[]) : User[];
  login(user: User) : LoginResult;
  patientAreas(areas: PatientArea[]) : PatientArea[];
  updateProfile(user: User) : User;
  findOne(id: number):User;
}
