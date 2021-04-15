import { wrapError } from '@types';
import UserInteractor from 'app/interactor/userInteractor';
import { IContext } from 'utils/context';

export default class UserController {
  userInteractor: UserInteractor;

  constructor(userInteractor: UserInteractor) {
    this.userInteractor = userInteractor;
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
