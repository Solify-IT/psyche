import { wrapError } from '@types';
import { Patient } from 'domain/model';
import IPatientPresenter from 'app/presenter/patientPresenter';
import IPatientRepository from 'app/repository/patientRepository';
import Record from 'domain/model/record';
import InvalidDataError from 'utils/errors/InvalidDataError';

export default class PatientInteractor {
  patientRepository: IPatientRepository;

  patientPresenter: IPatientPresenter;

  constructor(patientRepository: IPatientRepository, patientPresenter : IPatientPresenter) {
    this.patientPresenter = patientPresenter;
    this.patientRepository = patientRepository;
  }

  async register(data: Patient[] | Patient) : Promise<Record> {
    const patients : Patient[] = (!Array.isArray(data)) ? [data] : data;
    const [result, error] = await wrapError(this.patientRepository.register(patients));

    if (error) {
      throw error;
    }
    return this.patientPresenter.record(result);
  }

  async getAll(): Promise<Patient[]> {
    const [patients, error] = await wrapError(this.patientRepository.findAll());
    const patientsActive: Patient[] = [];

    /* patients.forEach(async element => {
      const record : Record = await this.getRecord(element.recordId);
      if (record.active === true) {
        console.log("activo");
        patientsActive.push(element);
      }
    }); */

    if (error) {
      throw error;
    }

    console.log(patientsActive);

    return this.patientPresenter.findAll(patients);
  }

  async getRecord(id: number) : Promise<Record> {
    const [record, error] = await wrapError(this.patientRepository.findRecord(id));

    if (error) {
      throw error;
    }
    return this.patientPresenter.record(record);
  }

  async canalize(data: Patient) : Promise<any> {
    const patients : Patient[] = (!Array.isArray(data)) ? [data] : data;
    const [result, error] = await wrapError(this.patientRepository.canalize(patients));

    if (error) {
      throw error;
    }
    return this.patientPresenter.canalize(result);
  }

  async updateDateAt(recordId: number): Promise<Record> {
    const [record, error] = await wrapError(this.patientRepository.updateDateAt(recordId));

    if (error) {
      throw error;
    }

    return this.patientPresenter.record(record);
  }

  async archiveRecord(id: number) : Promise<Record> {
    const [record, error] = await wrapError(this.patientRepository.archiveRecord(id));
    if (error) {
      throw error;
    }
    return this.patientPresenter.archiveRecord(record);
  }

  async getPatientStatistics(startDate: Date, endDate: Date) : Promise<any> {
    if (startDate && endDate) {
      const [result, error] = await wrapError(this.patientRepository.getGenderGraph('Psicología Pareja', startDate, endDate));

      if (error) {
        throw error;
      }
      return result;
    }
    throw new InvalidDataError('Se debe proporcionar una fecha inicio y fin');
  }

}
