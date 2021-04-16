import { Form } from 'domain/model';

export default interface IFormRepository {
  detail() : Promise<Form>;
  register(form: Form) : Promise<Form>;
}
