import { wrapError } from '@types';
import IFormPresenter from 'app/presenter/formPresenter';
import IFormRepository from 'app/repository/formRepository';
import { Form } from 'domain/model';

export default class FormInteractor {
  formRepository: IFormRepository;

  formPresenter: IFormPresenter;

  constructor(formRepository: IFormRepository, formPresenter : IFormPresenter) {
    this.formPresenter = formPresenter;
    this.formRepository = formRepository;
  }

  async register(form: Form): Promise<Form> {
    const [results, error] = await wrapError(this.formRepository.register(form));

    if (error) {
      throw error;
    }
    return this.formPresenter.register(results);
  }
}
