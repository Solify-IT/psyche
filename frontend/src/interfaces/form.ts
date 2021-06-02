import Field from './field';

export default interface Form {
  id?: number;
  name: string;
  startDate?: string;
  fields: Array<Field>;
  type: string;
}
