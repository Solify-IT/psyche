import { Form } from 'domain/model';

export default interface IFormPresenter {
  detail(form: Form) : Form;
  register(form: Form) : Form;
}
