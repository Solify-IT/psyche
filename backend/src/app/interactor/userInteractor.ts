import { wrapError } from '@types';
import IUserPresenter from 'app/presenter/userPresenter';
import IUserRepository from 'app/repository/userRepository';
import LoginResult from 'domain/model/user/loginResult';

export default class UserInteractor {
  userRepository: IUserRepository;

  userPresenter: IUserPresenter;

  constructor(userRepository: IUserRepository, userPresenter : IUserPresenter) {
    this.userPresenter = userPresenter;
    this.userRepository = userRepository;
  }

  async register(user: User): Promise<User> {
    if (!this.isValidForm(user)) {
      throw new InvalidDataError('El usuario no es valido.');
    }
    const [results, error] = await wrapError(this.userRepository.register(user));

    if (error) {
      throw error;
    }
    return this.userPresenter.register(results);
  }

  async login(username: string, password: string): Promise<LoginResult> {
    const [user, error] = await wrapError(this.userRepository.login(username, password));

    if (error) {
      throw error;
    }
    return this.userPresenter.login(user);
  }
}
