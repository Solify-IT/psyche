import IFormPresenter from 'app/presenter/formPresenter';
import { Form } from 'domain/model';

export default class FormPresenter implements IFormPresenter {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  detail(form: Form): Form {
    throw new Error('Method not implemented.');
  }

  register(form: Form): Form {
    return form;
  }
}
