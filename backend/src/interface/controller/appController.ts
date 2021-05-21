import FormController from './formController';
import PatientController from './patientController';
import UserController from './userController';

export interface IAppController {
  patients: PatientController;
  users: UserController;
  forms: FormController;
}

export default IAppController;
