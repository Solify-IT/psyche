import { wrapError } from '@types';
import IFormPresenter from 'app/presenter/formPresenter';
import IFormRepository from 'app/repository/formRepository';
import { Field, Form } from 'domain/model';
import InvalidDataError from 'utils/errors/InvalidDataError';

export default class FormInteractor {
  formRepository: IFormRepository;

  formPresenter: IFormPresenter;

  constructor(formRepository: IFormRepository, formPresenter : IFormPresenter) {
    this.formPresenter = formPresenter;
    this.formRepository = formRepository;
  }

  async register(form: Form): Promise<Form> {
    if (!this.isValidForm(form)) {
      throw new InvalidDataError('El form no es valido.');
    }
    const [results, error] = await wrapError(this.formRepository.register(form));

    if (error) {
      throw error;
    }
    return this.formPresenter.register(results);
  }

  async detail(id: number): Promise<Form> {
    const [result, error] = await wrapError(this.formRepository.detail(id));

    if (error) {
      throw error;
    }
    return this.formPresenter.detail(result);
  }

  isValidForm(form: Form) : boolean {
    if (form.fields.length === 0) {
      return false;
    }
    if (form.name === '') {
      return false;
    }

    let fieldsValid = true;
    form.fields.forEach((field) => {
      const result = this.isValidField(field);
      if (!result) {
        fieldsValid = false;
      }
    });

    if (!fieldsValid) {
      return false;
    }
    return true;
  }

  isValidField(field: Field) : boolean {
    // if empty data received
    if (field.label === '' || field.name === '' || field.type === '') {
      return false;
    }
    // TODO: List every possible field type

    return true;
  }
}
