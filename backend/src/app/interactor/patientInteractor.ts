import { wrapError } from 'src/@types';
import { Patient } from 'src/domain/model';
import { IPatientPresenter, IPatientRepository } from '..';

export default class PatientInteractor {
    patientRepository: IPatientRepository;
    patientPresenter: IPatientPresenter;

    constructor(patientRepository: IPatientRepository, patientPresenter : IPatientPresenter)
    {
        this.patientPresenter = patientPresenter;
        this.patientRepository = patientRepository;
    }

    async getAll(): Promise<Patient[]> {
        const [patients, error] = await wrapError(this.patientRepository.findAll());

        if (error)
        {
            throw error;
        }

        return this.patientPresenter.findAll(patients);
    }

}