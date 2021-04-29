import { wrapError } from '@types';
import FormInteractor from 'app/interactor/formInteractor';
import formFixture from 'fixtures/form';
import Datastore from 'infraestructure/datastore/datastore';
import FormPresenter from 'interface/presenter/formPresenter';
import FormRepository from 'interface/repository/formRepository';

jest.mock('interface/repository/formRepository');
jest.mock('infraestructure/datastore/datastore');

const datastore = new Datastore();
const formRepository = new FormRepository(datastore);
const formPresenter = new FormPresenter();
const interactor = new FormInteractor(formRepository, formPresenter);

const form = formFixture;

describe('Form register', () => {
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
