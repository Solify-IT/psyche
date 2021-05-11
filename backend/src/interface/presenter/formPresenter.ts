import IFormPresenter from 'app/presenter/formPresenter';
import { Form } from 'domain/model';
import PatientForm from 'domain/model/patientForm';

export default class FormPresenter implements IFormPresenter {
  
  updatePatientForm(form: Form): Form {
    return form;
  }
  
  forms(forms: Form[]): Form[] {
    return forms;
  }

  detailPatientForm(form: PatientForm): PatientForm {
    return form;
  }

  detail(form: Form): Form {
    return form;
  }

  register(form: Form): Form {
    return form;
  }
}
