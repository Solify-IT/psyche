import {IAppController,  PatientController } from 'src/interface/controller';
import { PatientPresenter } from 'src/interface/presenter';
import { PatientRepository, IDatastore } from 'src/interface/repository';
import PatientInteractor from 'src/app/interactor/patientInteractor';

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