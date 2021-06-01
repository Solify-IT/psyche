import { User } from 'domain/model';
import PatientArea from 'domain/model/user/patientArea';

export default interface IUserRepository {
  register(user: User) : Promise <User>;
  findOne(id: number): Promise<User>;
  login(username: string, password: string) : Promise<User>;
  registerDoctorProfile(
    id: number, areas: PatientArea[], workSchedule: string) : Promise<PatientArea[]>;
  setUserFirstTime(id: number, firstTime: boolean) : Promise<User>;
  getUserPatientAreas(id: number) : Promise<PatientArea[]>;
  updateProfile(user: User) : Promise<User>;
  findAll(): Promise<User[]>;
  getUser(username: string): Promise<User>;
  updateProfile(user: User) : Promise<User>;
  getAll(): Promise<User[]>;
  deactiveAccount(id: number) : Promise <User>;
  changePassword(id: number, password: string) : Promise<User>;
  getUserByEmail(email: string): Promise<User>;

}
