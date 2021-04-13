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

  async login(username: string, password: string): Promise<LoginResult> {
    const [user, error] = await wrapError(this.userRepository.login(username, password));

    if (error) {
      throw error;
    }
    return this.userPresenter.login(user);
  }
}
