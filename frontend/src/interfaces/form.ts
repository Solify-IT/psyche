import Field from './field';

export default interface Form {
  name: string;
  startDate?: string;
  fields: Field[];
  type: string;
}
