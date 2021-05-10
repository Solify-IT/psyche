import IFormPresenter from 'app/presenter/formPresenter';
import { Form } from 'domain/model';
import PatientForm from 'domain/model/patientForm';
import PatientFormField from 'domain/model/patientFormField';

export default class FormPresenter implements IFormPresenter {
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

  detailField(form: PatientFormField): PatientFormField {
    return form;
  }
}
