import { User } from 'domain/model';
import IUserPresenter from 'app/presenter/userPresenter';
import LoginResult from 'domain/model/user/loginResult';
import jwt from 'jsonwebtoken';
import jwtConfig from 'utils/jwtConfig';

export default class UserPresenter implements IUserPresenter {
  expiresIn: string = '30 days';

  login(user: User): LoginResult {
    const userLoginResult = {
      id: user.id, username: user.username, email: user.email, role: user.role,
    };
    const token = jwt.sign({ user: userLoginResult },
      jwtConfig.secret, { expiresIn: this.expiresIn });

    return { user: userLoginResult, token };
  }
}
