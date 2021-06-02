import FieldOptions from './fieldOptions';

export default interface PatientForms {
  id: number;
  label: string;
  value: string;
  type: string;
  options: Array<FieldOptions>;
}
