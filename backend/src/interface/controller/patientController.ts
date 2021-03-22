import { wrapError } from 'src/@types';
import PatientInteractor from 'src/app/interactor/patientInteractor'
import { IContext } from './context';


export default class PatientController {

    patientInteractor: PatientInteractor;

    constructor(patientInteractor: PatientInteractor)
    {
        this.patientInteractor = patientInteractor;
    }

    async getPatients(context: IContext): Promise<void> {
        const [patients, error] = await wrapError(this.patientInteractor.getAll());
        if(error)
        {
            context.next(error);
            return;
        }
        context.response.status(200).json(patients);
    }
}