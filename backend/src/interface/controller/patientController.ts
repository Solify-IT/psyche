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
    const [patientsToCheck, errorToCheck] = await wrapError(this.patientInteractor.getAll());
    if (errorToCheck) {
      context.next(errorToCheck);
      return;
    }

    const todayDate = new Date();
    patientsToCheck.forEach(async (patient) => {
      const { recordId } = patient;
      const [record,] = await wrapError(this.patientInteractor.getRecord(recordId));
      const miliSecondsOccurred = Math.abs(
        new Date(todayDate).getTime() - new Date(record.updatedAt).getTime(),
      );
      const daysOccurred : number = Math.floor(miliSecondsOccurred / (1000 * 3600 * 24));
      if (daysOccurred >= 90) {
        this.patientInteractor.archiveRecord(recordId);
      }
    });

    const [patients, error] = await wrapError(this.patientInteractor.getAll());
    const patientsActive: Patient[] = [];

    patients.forEach(async (element) => {
      const record = await this.patientInteractor.getRecord(element.recordId);
      if (record.active === false) {
        patientsActive.push(element);
      }
    });

    if (error) {
      context.next(error);
      return;
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

  async getPatientStatistics(context: IContext) : Promise<void> {
    const { startDate, endDate } = context.request.body;
    const [results, error] = await wrapError(
      this.patientInteractor.getPatientStatistics(
        startDate, endDate,
      ),
    );
    if (error) {
      context.next(error);
      return;
    }
    context.response.status(200).json(results);
  }
}
