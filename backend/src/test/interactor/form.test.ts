import { wrapError } from '@types';
import FormInteractor from 'app/interactor/formInteractor';
import formFixture from 'fixtures/form';
import patientFormFixture from 'fixtures/patientForm';
import Datastore from 'infraestructure/datastore/datastore';
import FormPresenter from 'interface/presenter/formPresenter';
import FormRepository from 'interface/repository/formRepository';

jest.mock('interface/repository/formRepository');
jest.mock('infraestructure/datastore/datastore');

const datastore = new Datastore();
const formRepository = new FormRepository(datastore);
const formPresenter = new FormPresenter();
const interactor = new FormInteractor(formRepository, formPresenter);

describe('Form register', () => {
  const form = formFixture;

  test('should register form when passed', async () => {
    jest.spyOn(
      formRepository, 'register',
    ).mockImplementation(async () => form);
    const [result, error] = await wrapError(interactor.register(form));

    expect(error).toBe(null);
    expect(result).toBeDefined();
    expect(result.name).toEqual(form.name);
  });

  test('should catch error from repository', async () => {
    jest.spyOn(
      formRepository, 'register',
    ).mockImplementation(async () => { throw new Error('An error occured'); });
    const [result, error] = await wrapError(interactor.register(form));

    expect(error).toBeInstanceOf(Error);
    expect(result).toBe(null);
  });
});

describe('Patient Form register', () => {
  const patientForm = patientFormFixture;

  test('should register patient form when passed', async () => {
    jest.spyOn(
      formRepository, 'registerPatientForm',
    ).mockImplementation(async () => patientForm);
    const [result, error] = await wrapError(interactor.registerPatientForm(patientForm));

    expect(error).toBe(null);
    expect(result).toBeDefined();
    expect(result.name).toEqual(patientForm.name);
  });

  test('should catch error from repository', async () => {
    jest.spyOn(
      formRepository, 'registerPatientForm',
    ).mockImplementation(async () => { throw new Error('An error occured'); });
    const [result, error] = await wrapError(interactor.registerPatientForm(patientForm));

    expect(error).toBeInstanceOf(Error);
    expect(result).toBe(null);
  });
});

describe('Get all forms by record id', () => {
  const forms = [formFixture, formFixture];

  test('should register patient form when passed', async () => {
    jest.spyOn(
      formRepository, 'getFormsWithReportId',
    ).mockImplementation(async () => forms);
    const [result, error] = await wrapError(interactor.getFormsByRecordId(1));

    expect(error).toBe(null);
    expect(result).toBeDefined();
    expect(result.length).toEqual(forms.length);
  });

  test('should catch error from repository', async () => {
    jest.spyOn(
      formRepository, 'getFormsWithReportId',
    ).mockImplementation(async () => { throw new Error('An error occured'); });
    const [result, error] = await wrapError(interactor.getFormsByRecordId(1));

    expect(error).toBeInstanceOf(Error);
    expect(result).toBe(null);
  });
});
