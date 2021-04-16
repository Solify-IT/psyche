import { wrapError } from '@types';
import { Form } from 'domain/model';
import IFormRepository from 'app/repository/formRepository';
import NotFoundError from 'utils/errors/NotFoundError';
import IDatastore from './datastore';

export default class FormRepository implements IFormRepository {
  datastore: IDatastore;

  constructor(datastore: IDatastore) {
    this.datastore = datastore;
  }

  async detail(id: number): Promise<Form> {
    const [result, error] = await wrapError(
      this.datastore.fetchOne<Form>('Form', {
        id,
      }),
    );

    if (error) {
      throw error;
    } if (result) {
      return result;
    }
    throw new NotFoundError('No se enccontró el form');
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
