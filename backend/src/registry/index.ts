import { IAppController, PatientController } from 'interface/controller';
import { PatientPresenter } from 'interface/presenter';
import { PatientRepository, IDatastore } from 'interface/repository';
import PatientInteractor from 'app/interactor/patientInteractor';
import UserRepository from 'interface/repository/userRepository';
import UserPresenter from 'interface/presenter/userPresenter';
import UserInteractor from 'app/interactor/userInteractor';
import UserController from 'interface/controller/userController';
import FormRepository from 'interface/repository/formRepository';
import FormPresenter from 'interface/presenter/formPresenter';
import FormInteractor from 'app/interactor/formInteractor';
import FormController from 'interface/controller/formController';

export default class Registry {
  datastore: IDatastore;

  constructor(datastore: IDatastore) {
    this.datastore = datastore;
  }

  newAppController(): IAppController {
    const patientRepository = new PatientRepository(this.datastore);
    const patientPresenter = new PatientPresenter();
    const patientInteractor = new PatientInteractor(patientRepository, patientPresenter);

    const userRepository = new UserRepository(this.datastore);
    const userPresenter = new UserPresenter();
    const userInteractor = new UserInteractor(userRepository, userPresenter);

    const formRepository = new FormRepository(this.datastore);
    const formPresenter = new FormPresenter();
    const formInteractor = new FormInteractor(formRepository, formPresenter);

    return {
      patients: new PatientController(patientInteractor),
      users: new UserController(userInteractor),
      forms: new FormController(formInteractor),
    };
  }
}
