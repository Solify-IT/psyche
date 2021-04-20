import { wrapError } from '@types';
import PatientInteractor from 'app/interactor/patientInteractor';
import { IContext } from 'utils/context';

export default class PatientController {
  patientInteractor: PatientInteractor;

  constructor(patientInteractor: PatientInteractor) {
    this.patientInteractor = patientInteractor;
  }

  async getPatients(context: IContext): Promise<void> {
    const [patients, error] = await wrapError(this.patientInteractor.getAll());
    if (error) {
      context.next(error);
      return;
    }
    context.response.status(200).json(patients);
  }

  async getPatientDetail(context: IContext): Promise<void> {
    // eslint-disable-next-line radix
    const id = parseInt(context.request.params.id);
    const [patient, error] = await wrapError(this.patientInteractor.getPatientDetail(id));

    if (error) {
      context.next(error);
      return;
    }
    context.response.status(200).json(patient);
  }
}
