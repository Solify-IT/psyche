import FieldOption from './fieldOptions';

export default interface Field {
  id?: number;
  key?: string;
  label: string;
  type: string;
  options: Array<FieldOption>;
  value?: string;
}
