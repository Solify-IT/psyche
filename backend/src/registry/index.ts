import { DoctorController, IAppController, PatientController } from 'interface/controller';
import { PatientPresenter, DoctorPresenter } from 'interface/presenter';
import { PatientRepository, IDatastore, DoctorRepository } from 'interface/repository';
import PatientInteractor from 'app/interactor/patientInteractor';
import DoctorInteractor from 'app/interactor/doctorInteractor';

export default class Registry {
  datastore: IDatastore;

  constructor(datastore: IDatastore) {
    this.datastore = datastore;
  }

  newAppController(): IAppController {
    const patientRepository = new PatientRepository(this.datastore);
    const patientPresenter = new PatientPresenter();
    const patientInteractor = new PatientInteractor(patientRepository, patientPresenter);

    const doctorRepository = new DoctorRepository(this.datastore);
    const doctorPresenter = new DoctorPresenter();
    const doctorInteractor = new DoctorInteractor(doctorRepository, doctorPresenter);

    return {
      patients: new PatientController(patientInteractor),
      doctors: new DoctorController(doctorInteractor),
    };
  }
}
