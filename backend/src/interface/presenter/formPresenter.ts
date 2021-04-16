import IFormPresenter from 'app/presenter/formPresenter';
import { Form } from 'domain/model';

export default class FormPresenter implements IFormPresenter {
  detail(form: Form): Form {
    return form;
  }

  register(form: Form): Form {
    return form;
  }
}
