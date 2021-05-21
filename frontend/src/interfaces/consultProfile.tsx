import PatientArea from './patientArea';

export default interface ConsultProfile {
  id: number;
  username: string;
  name: string;
  address: string;
  zipCode: string;
  password: string;
  email: string;
  role: string;
  firstTime: boolean;
  active: boolean;
  professionalLicense: string;
  patientAreas: Array<PatientArea>;
  workSchedule: string;
}
