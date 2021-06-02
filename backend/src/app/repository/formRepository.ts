import { Form, Record } from 'domain/model';
import PatientForm from 'domain/model/patientForm';
import PatientFormField from 'domain/model/patientFormField';

export default interface IFormRepository {
  detail(id: number) : Promise<Form>;
  register(form: Form) : Promise<Form>;
  updatePatientForm(form: Form) : Promise<Form>;
  registerPatientForm(form: PatientForm) : Promise<PatientForm>;
  getFormsWithReportId(id: number) : Promise<Form[]>;
  detailField(id: number) : Promise<PatientFormField>;
  deleteFormWithId(id: number) : Promise<boolean>;
  getForms() : Promise<Form[]>;
  updateDateAt(recordId: number): Promise<Record>;
  getFormId(id: number) : Promise<PatientForm[]>;
}
