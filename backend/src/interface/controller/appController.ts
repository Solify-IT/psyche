import DoctorController from './doctorController';
import PatientController from './patientController';

export interface IAppController {
  patients: PatientController;
  doctors: DoctorController;
}

export default IAppController;
