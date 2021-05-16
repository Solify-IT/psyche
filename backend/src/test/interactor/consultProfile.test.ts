import { wrapError } from '@types';
import UserInteractor from 'app/interactor/userInteractor';
import userFixture from 'fixtures/user';
import Datastore from 'infraestructure/datastore/datastore';
import UserPresenter from 'interface/presenter/userPresenter';
import { UserRepository } from 'interface/repository';
import testConnection from 'test/utils/testConnection';

jest.mock('interface/repository/userRepository');
jest.mock('infraestructure/datastore/datastore');

const datastore = new Datastore();
const userRepository = new UserRepository(datastore);
const userPresenter = new UserPresenter();
const interactor = new UserInteractor(userRepository, userPresenter);

describe(' user', () => {
  const user = userFixture;
  beforeAll(async () => {
    await testConnection.create();
  });

  afterAll(async () => {
    await testConnection.close();
  });

  beforeEach(async () => {
    await testConnection.clear();
  });

  test('should return one user', async () => {
    jest.spyOn(
      userRepository, 'findOne',
    );
    const [result, error] = await wrapError(interactor.getOne(user.id));

    expect(error).toBe(null);
    expect(result).toEqual(undefined);
  });

  test('should catch error from repository', async () => {
    jest.spyOn(
      userRepository, 'findOne',
    ).mockImplementation(async () => { throw new Error('An error occured'); });
    const [result, error] = await wrapError(interactor.getOne(user.id));

    expect(error).toBeInstanceOf(Error);
    expect(result).toBe(null);
  });
});
