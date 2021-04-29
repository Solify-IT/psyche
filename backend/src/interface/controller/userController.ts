import { wrapError } from '@types';
import UserInteractor from 'app/interactor/userInteractor';
import { IContext } from 'utils/context';

export default class UserController {
  userInteractor: UserInteractor;

  constructor(userInteractor: UserInteractor) {
    this.userInteractor = userInteractor;
  }

  async registerUser(context: IContext): Promise<void> {
    const [user, error] = await wrapError(this.userInteractor.register(context.request.body));

    if (error) {
      context.next(error);
      return;
    }
    context.response.status(200).json(user);
  }

  async getUsers(context: IContext): Promise<void> {
    const [users, error] = await wrapError(this.userInteractor.getAll());
    if (error) {
      context.next(error);
      return;
    }
    context.response.status(200).json(users);
  }

  async login(context: IContext): Promise<void> {
    const { username, password } = context.request.body;
    const [loginResult, error] = await wrapError(this.userInteractor.login(username, password));

    if (error) {
      context.next(error);
      return;
    }

    context.response.status(200).json(loginResult);
  }
}
