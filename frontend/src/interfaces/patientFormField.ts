import PatientForms from './patientForms';

export default interface PatientFormField {
  id: number;
  name: string;
  type: string;
  createdDate: string;
  recordId: number;
  fields: Array<PatientForms>;
}
