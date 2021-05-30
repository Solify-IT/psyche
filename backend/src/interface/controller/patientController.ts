import { wrapError } from '@types';
import PatientInteractor from 'app/interactor/patientInteractor';
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
    const [patientsToCheck, errorToCheck] = await wrapError(this.patientInteractor.getAll());
    if (errorToCheck) {
      context.next(errorToCheck);
      return;
    }

    const todayDate = new Date();
    patientsToCheck.forEach(async (patient) => {
      const { recordId } = patient;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [record, error] = await wrapError(this.patientInteractor.getRecord(recordId));
      const miliSecondsOccurred = Math.abs(
        new Date(todayDate).getTime() - new Date(record.updatedAt).getTime()
      );
      const daysOccurred : number = Math.floor(miliSecondsOccurred / (1000 * 3600 * 24));
      console.log(daysOccurred);
      if (daysOccurred >= 3) {
        console.log('Archive the expediente');
      }
    });

    const [patients, error] = await wrapError(this.patientInteractor.getAll());
    if (error) {
      context.next(error);
      return;
    }

    if (error) {
      throw error;
    }

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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [record, errorRecord] = await wrapError(
      this.patientInteractor.updateDateAt(patients[0].recordId),
    );

    if (error) {
      context.next(error);
      return;
    }
    context.response.status(200).json(patients);
  }
}
