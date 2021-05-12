import { User } from 'domain/model';
import PatientArea from 'domain/model/user/patientArea';

export default interface IUserRepository {
  register(user: User) : Promise <User>;
  findAll(): Promise<User[]>;
  login(username: string, password: string) : Promise<User>;
  registerProfile(areas: PatientArea[]) : Promise<PatientArea[]>;
  setUserFirstTime(id: number, firstTime: boolean) : Promise<User>;
}
