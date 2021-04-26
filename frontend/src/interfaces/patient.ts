import PatientForm from './patientForm';

export default interface Patient {
  id: number;
  name: string;
  middleName: string;
  lastName: string;
  startDate: Date;
  type: string;
  age: number;
  gender: string;
  telephone: string;
  address: string;
  birthPlace: string;
  birthDate: Date;
  postalCode: string;
  forms: PatientForm[];
}
