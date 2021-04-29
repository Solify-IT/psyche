import Patient from './patient';
import PatientForm from './patientForm';

export default interface Record {
  id: number;
  startDate: Date;
  active: boolean;
  forms: PatientForm[];
  patients: Patient[];
}
