import { User } from 'domain/model';
import IUserPresenter from 'app/presenter/userPresenter';
import LoginResult from 'domain/model/loginResult';
import jwt from 'jsonwebtoken';
import jwtConfig from 'utils/jwtConfig';

export default class UserPresenter implements IUserPresenter {
  login(user: User): LoginResult {
    const token = jwt.sign({ user: user.username }, jwtConfig.secret);

    return { user, token };
  }
}
