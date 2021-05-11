import { Form } from 'domain/model';
import PatientForm from 'domain/model/patientForm';

export default interface IFormPresenter {
  detail(form: Form) : Form;
  register(form: Form) : Form;
  detailPatientForm(form: PatientForm) : PatientForm;
  forms(forms: Form[]) : Form[];
  updatePatientForm(form: Form): Form;
}
