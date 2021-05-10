import { Form } from 'domain/model';
import PatientForm from 'domain/model/patientForm';
import PatientFormField from 'domain/model/patientFormField';

export default interface IFormPresenter {
  detail(form: Form) : Form;
  register(form: Form) : Form;
  detailPatientForm(form: PatientForm) : PatientForm;
  detailField(form: PatientFormField) : PatientFormField;
  forms(forms: Form[]) : Form[];
}
