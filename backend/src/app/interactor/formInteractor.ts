import { wrapError } from '@types';
import IFormPresenter from 'app/presenter/formPresenter';
import IPatientPresenter from 'app/presenter/patientPresenter';
import IFormRepository from 'app/repository/formRepository';
import { Form, Record } from 'domain/model';
import PatientForm from 'domain/model/patientForm';
import PatientFormField from 'domain/model/patientFormField';
import NotFoundError from 'utils/errors/NotFoundError';

export default class FormInteractor {
  formRepository: IFormRepository;

  formPresenter: IFormPresenter;

  patientPresenter: IPatientPresenter;

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

  async updatePatientForm(form: PatientForm): Promise<Form> {
    const [result, error] = await wrapError(this.formRepository.updatePatientForm(form));
    if (error) {
      throw error;
    }
    return this.formPresenter.detail(result);
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

  async deleteFormById(id: number): Promise<boolean> {
    const [result, error] = await wrapError(this.formRepository.deleteFormWithId(id));
    if (error) {
      throw error;
    }
    if (!result) {
      throw new NotFoundError('No se encontró el form.');
    }
    return result;
  }

  async getForms(): Promise<Form[]> {
    const [result, error] = await wrapError(this.formRepository.getForms());
    if (error) {
      throw error;
    }
    return this.formPresenter.forms(result);
  }

  async updateDateAt(recordId: number): Promise<Record> {
    const [record, error] = await wrapError(this.formRepository.updateDateAt(recordId));

    if (error) {
      throw error;
    }

    return this.patientPresenter.record(record);
  }

  async getFormId(id: number): Promise<PatientForm[]> {
    const [result, error] = await wrapError(this.formRepository.getFormId(id));

    if (error) {
      throw error;
    }
    return this.formPresenter.getFormId(result);
  }
}
