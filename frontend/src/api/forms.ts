import Form from 'src/interfaces/form';
import server from 'src/utils/server';

export default async function registerForm(form: Form) {
  const result = await server.post('/forms', form);
  console.log(result);
  return result;
}

export async function registerPatientForm(id: number, form: Form) {
  const result = await server.post(`/records/${id}/patientForms`, form);
  console.log(result);
  return result;
}

export async function listFormsWithRecordId(id: number) {
  const result = await server.get(`/records/${id}/forms`);
  console.log(result);
  return result;
}
