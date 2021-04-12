import DoctorController from './doctorController';
import PatientController from './patientController';
import UserController from './userController';

export interface IAppController {
  patients: PatientController;
  doctors: DoctorController;
  users: UserController;
}

export default IAppController;
