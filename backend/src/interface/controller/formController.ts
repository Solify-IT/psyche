import { wrapError } from '@types';
import FormInteractor from 'app/interactor/formInteractor';
import PatientInteractor from 'app/interactor/patientInteractor';
import { IContext } from 'utils/context';

export default class FormController {
  formInteractor: FormInteractor;

  patientInteractor: PatientInteractor;

  constructor(formInteractor: FormInteractor) {
    this.formInteractor = formInteractor;
  }

  async registerForm(context: IContext): Promise<void> {
    const [form, error] = await wrapError(this.formInteractor.register(context.request.body));

    if (error) {
      context.next(error);
      return;
    }
    context.response.status(200).json(form);
  }

  async registerPatientForm(context: IContext): Promise<void> {
    // eslint-disable-next-line radix
    const recordId = parseInt(context.request.params.id);
    const [form, error] = await
    wrapError(this.formInteractor.registerPatientForm({ ...context.request.body, recordId }));

    if (error) {
      context.next(error);
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [record] = await wrapError(
      this.formInteractor.updateDateAt(recordId),
    );
    context.response.status(200).json(form);
  }

  async updatePatientForm(context: IContext): Promise<void> {
    // eslint-disable-next-line radix
    const id = parseInt(context.request.params.id);
    const [form, error] = await
    wrapError(this.formInteractor.updatePatientForm({ id, ...context.request.body }));

    if (error) {
      context.next(error);
      return;
    }

    const { recordId } = context.request.body;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [record] = await wrapError(
      this.formInteractor.updateDateAt(recordId),
    );
    context.response.status(200).json(form);
  }

  async detailForm(context: IContext): Promise<void> {
    // eslint-disable-next-line radix
    const id = parseInt(context.request.params.id);
    const [form, error] = await wrapError(this.formInteractor.detail(id));

    if (error) {
      context.next(error);
      return;
    }
    context.response.status(200).json(form);
  }

  async detailField(context: IContext): Promise<void> {
    // eslint-disable-next-line radix
    const id = parseInt(context.request.params.id);
    const [form, error] = await wrapError(this.formInteractor.detailField(id));

    if (error) {
      context.next(error);
      return;
    }
    context.response.status(200).json(form);
  }

  async getFormsWithRecordId(context: IContext): Promise<void> {
    // eslint-disable-next-line radix
    const id = parseInt(context.request.params.id);
    const [form, error] = await wrapError(this.formInteractor.getFormsByRecordId(id));

    if (error) {
      context.next(error);
      return;
    }
    context.response.status(200).json(form);
  }

  async deleteFormById(context: IContext): Promise<void> {
    // eslint-disable-next-line radix
    const id = parseInt(context.request.params.id);
    const [deleted, error] = await wrapError(this.formInteractor.deleteFormById(id));
    if (error) {
      context.next(error);
      return;
    }

    context.response.status(200).json(deleted);
  }

  async getForms(context: IContext): Promise<void> {
    const [form, error] = await wrapError(this.formInteractor.getForms());

    if (error) {
      context.next(error);
      return;
    }
    context.response.status(200).json(form);
  }

  async getFormId(context: IContext): Promise<void> {
    // eslint-disable-next-line radix
    const id = parseInt(context.request.params.id);
    const [form, error] = await wrapError(this.formInteractor.getFormId(id));

    if (error) {
      context.next(error);
      return;
    }
    context.response.status(200).json(form);
  }
}
