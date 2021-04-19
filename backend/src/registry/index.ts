import { DoctorController, IAppController, PatientController } from 'interface/controller';
import { PatientPresenter, DoctorPresenter } from 'interface/presenter';
import { PatientRepository, IDatastore, DoctorRepository } from 'interface/repository';
import PatientInteractor from 'app/interactor/patientInteractor';
import DoctorInteractor from 'app/interactor/doctorInteractor';
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

    const doctorRepository = new DoctorRepository(this.datastore);
    const doctorPresenter = new DoctorPresenter();
    const doctorInteractor = new DoctorInteractor(doctorRepository, doctorPresenter);

    const userRepository = new UserRepository(this.datastore);
    const userPresenter = new UserPresenter();
    const userInteractor = new UserInteractor(userRepository, userPresenter);

    const formRepository = new FormRepository(this.datastore);
    const formPresenter = new FormPresenter();
    const formInteractor = new FormInteractor(formRepository, formPresenter);

    return {
      patients: new PatientController(patientInteractor),
      doctors: new DoctorController(doctorInteractor),
      users: new UserController(userInteractor),
      forms: new FormController(formInteractor),
    };
  }
}
