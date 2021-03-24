import { IAppController, PatientController } from 'interface/controller';
import { PatientPresenter } from 'interface/presenter';
import { PatientRepository, IDatastore } from 'interface/repository';
import PatientInteractor from 'app/interactor/patientInteractor';

export default class Registry {
  datastore: IDatastore;

  constructor(datastore: IDatastore) {
    this.datastore = datastore;
  }

  newAppController(): IAppController {
    const patientRepository = new PatientRepository(this.datastore);
    const patientPresenter = new PatientPresenter();
    const patientInteractor = new PatientInteractor(patientRepository, patientPresenter);
    return {
      patients: new PatientController(patientInteractor),
    };
  }
}
