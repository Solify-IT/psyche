import { wrapError } from '@types';
import IFormPresenter from 'app/presenter/formPresenter';
import IFormRepository from 'app/repository/formRepository';
import { Form } from 'domain/model';
import PatientForm from 'domain/model/patientForm';
import PatientFormField from 'domain/model/patientFormField';

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

  async detail(id: number): Promise<Form> {
    const [result, error] = await wrapError(this.formRepository.detail(id));

    if (error) {
      throw error;
    }
    return this.formPresenter.detail(result);
  }

  async detailField(id: number): Promise<PatientFormField> {
    const [result, error] = await wrapError(this.formRepository.detailField(id));

    if (error) {
      throw error;
    }
    return this.formPresenter.detailField(result);
  }

  async registerPatientForm(form: PatientForm): Promise<PatientForm> {
    const [result, error] = await wrapError(this.formRepository.registerPatientForm(form));

    if (error) {
      throw error;
    }
    return this.formPresenter.detailPatientForm(result);
  }

  async getFormsByRecordId(id: number): Promise<Form[]> {
    const [result, error] = await wrapError(this.formRepository.getFormsWithReportId(id));

    if (error) {
      throw error;
    }
    return this.formPresenter.forms(result);
  }
}
