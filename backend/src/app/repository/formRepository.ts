import { Form } from 'domain/model';

export default interface IFormRepository {
  detail(id: number) : Promise<Form>;
  register(form: Form) : Promise<Form>;
}
