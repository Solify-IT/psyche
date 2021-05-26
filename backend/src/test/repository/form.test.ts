import { wrapError } from '@types';
import { Form } from 'domain/model';
import Record from 'domain/model/record';
import formFixture from 'fixtures/form';
import recordFixture from 'fixtures/record';
import Datastore from 'infraestructure/datastore/datastore';
import FormRepository from 'interface/repository/formRepository';
import testConnection from 'test/utils/testConnection';
import { getConnection } from 'typeorm';

beforeAll(async () => {
  await testConnection.create();
});

afterAll(async () => {
  await testConnection.close();
});

beforeEach(async () => {
  await testConnection.clear();
});
describe('Form repository', () => {
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

  test('should fetch available forms depending on record', async () => {
    await getConnection().transaction(async (entityManager) => {
      const record = await entityManager.getRepository<Record>(Record).save(recordFixture);
      await entityManager.getRepository<Form>(Form).insert({ ...formFixture, id: 1 });
      await entityManager.getRepository<Form>(Form).insert({ ...formFixture, id: 2 });
      await entityManager.getRepository<Form>(Form).insert({ ...formFixture, id: 3, type: 'not joven' });
      const [result, error] = await wrapError(formRepository.getFormsWithReportId(record!.id));
      expect(error).toBeNull();
      expect(result).toBeDefined();
      expect(result.length).toEqual(2);
    });
  });

  test('should throw error if id not found when fetching available forms depending on record', async () => {
    const [result, error] = await wrapError(formRepository.getFormsWithReportId(999));
    expect(error).toBeDefined();
    expect(result).toBeNull();
  });

  test('should delete form', async () => {
    const result = await getConnection().getRepository<Form>(Form).save(form);
    const [found, error] = await wrapError(formRepository.deleteFormWithId(result.id));
    expect(found).toEqual(true);
    expect(error).toBeNull();

    const shouldntExist = await getConnection().getRepository<Form>(Form).findOne(result.id);
    expect(shouldntExist).toBeUndefined();
  });
});
