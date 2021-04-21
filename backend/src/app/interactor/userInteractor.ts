import { wrapError } from '@types';
import IUserPresenter from 'app/presenter/userPresenter';
import IUserRepository from 'app/repository/userRepository';
import { User } from 'domain/model';
import LoginResult from 'domain/model/user/loginResult';
import InvalidDataError from 'utils/errors/InvalidDataError';

export default class UserInteractor {
  userRepository: IUserRepository;

  userPresenter: IUserPresenter;

  constructor(userRepository: IUserRepository, userPresenter : IUserPresenter) {
    this.userPresenter = userPresenter;
    this.userRepository = userRepository;
  }

  async register(user: User): Promise<User> {
    if (!this.isValidUser(user)) {
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

  isValidUser(user: User) : boolean {
    if (user.password.length < 8) {
      return false;
    }
    if (user.username === '') {
      return false;
    }
    return true;
  }
}
