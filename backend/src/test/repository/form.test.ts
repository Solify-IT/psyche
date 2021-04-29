import { wrapError } from '@types';
import { Form } from 'domain/model';
import formFixture from 'fixtures/form';
import Datastore from 'infraestructure/datastore/datastore';
import FormRepository from 'interface/repository/formRepository';
import testConnection from 'test/utils/testConnection';
import { getConnection } from 'typeorm';

describe('Form repository', () => {
  beforeAll(async () => {
    await testConnection.create();
  });

  afterAll(async () => {
    await testConnection.close();
  });

  beforeEach(async () => {
    await testConnection.clear();
  });

  const datastore: Datastore = new Datastore();
  const formRepository : FormRepository = new FormRepository(datastore);
  const form : Form = formFixture;
  test('should return form if found', async () => {
    await getConnection().getRepository<Form>(Form).save(form);
    const result = await formRepository.detail(1);
    expect(result).toBeDefined();
    expect(result.name).toEqual(form.name);
    expect(result.fields.length).toEqual(2);
  });

  test('should return error if form not found', async () => {
    await getConnection().getRepository<Form>(Form).save(form);
    const [result, error] = await wrapError(formRepository.detail(99));
    expect(error).toBeDefined();
    expect(result).toBeNull();
  });

  test('should register new form', async () => {
    const [result, error] = await wrapError(formRepository.register(form as Form));
    expect(error).toBeNull();
    expect(result).toBeDefined();
    expect(result.fields.length).toEqual(2);
    expect(result.fields[1].options).toBeDefined();
  });
});
