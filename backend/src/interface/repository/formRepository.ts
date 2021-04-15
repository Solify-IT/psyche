import { wrapError } from '@types';
import { Form } from 'domain/model';
import IFormRepository from 'app/repository/formRepository';
import IDatastore from './datastore';

export default class FormRepository implements IFormRepository {
  datastore: IDatastore;

  constructor(datastore: IDatastore) {
    this.datastore = datastore;
  }

  detail(): Promise<Form> {
    throw new Error('Method not implemented.');
  }

  async register(form: Form): Promise<Form> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [result, error] = await wrapError(
      this.datastore.insert<Form>('Form', form),
    );

    if (error) {
      throw error;
    }
    return form;
  }
}
