import Form from 'src/interfaces/form';
import server from 'src/utils/server';

export default async function registerForm(form: Form) {
  const result = await server.post('/forms', form);
  console.log(result);
  return result;
}
