import { wrapError } from '@types';
import PatientInteractor from 'app/interactor/patientInteractor';
import { Patient } from 'domain/model';
import { IContext } from 'utils/context';

export default class PatientController {
  patientInteractor: PatientInteractor;

  constructor(patientInteractor: PatientInteractor) {
    this.patientInteractor = patientInteractor;
  }

  async registerPatient(context: IContext): Promise<void> {
    const [patients, error] = await wrapError(
      this.patientInteractor.register(context.request.body),
    );

    if (error) {
      context.next(error);
      return;
    }
    context.response.status(200).json(patients);
  }

  async getPatients(context: IContext): Promise<void> {
    const [patients, error] = await wrapError(this.patientInteractor.getAll());
    const patientsActive: Patient[] = [];

    patients.forEach(async (element) => {
      const record = await this.patientInteractor.getRecord(element.recordId);
      if (record.active === false) {
        patientsActive.push(element);
      }
    });

    console.log(patientsActive);
    if (error) {
      context.next(error);
      return;
    }

    console.log(patientsActive);
    context.response.status(200).json(patients);
  }

  async getRecordDetail(context: IContext): Promise<void> {
    // eslint-disable-next-line radix
    const id = parseInt(context.request.params.id);
    const [record, error] = await wrapError(this.patientInteractor.getRecord(id));

    if (error) {
      context.next(error);
      return;
    }
    context.response.status(200).json(record);
  }

  async canalizePatient(context: IContext): Promise<void> {
    const [patients, error] = await wrapError(
      this.patientInteractor.canalize(context.request.body),
    );

    if (error) {
      context.next(error);
      return;
    }
    context.response.status(200).json(patients);
  }

  async archiveRecord(context: IContext): Promise<void> {
    // eslint-disable-next-line radix
    const id = parseInt(context.request.params.id);
    console.log(id);
    const [record, error] = await wrapError(this.patientInteractor.archiveRecord(id));

    if (error) {
      context.next(error);
    }
    context.response.status(200).json(record);
  }
}
