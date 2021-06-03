import Form from 'src/interfaces/form';
import server from 'src/utils/server';

export async function registerForm(form: Form) {
  const result = await server.post('/forms', form);
  return result;
}

export async function registerPatientForm(id: number, form: Form) {
  const result = await server.post(`/records/${id}/patientForms`, form);
  return result;
}

export async function updatePatientForm(id: number, form: Form) {
  const result = await server.put(`/patientFormField/${id}`, form);
  return result;
}

export async function listFormsWithRecordId(id: number) {
  const result = await server.get(`/records/${id}/forms`);
  return result;
}

export async function getFormId(id: number) {
  const result = await server.get(`/recordPrint/${id}`);
  return result;
}

export async function getFormField(id: number) {
  const result = await server.get(`/patientFormField/${id}`);
  return result;
}

export async function getForms() {
  const result = await server.get('/forms');
  return result;
}

export async function deleteForm(id: number) {
  const result = await server.delete(`/forms/${id}`);
  return result;
}

export async function getForm(id: number) {
  const result = await server.get(`/forms/${id}`);
  return result.data;
}
