import { User } from 'domain/model';
import IUserPresenter from 'app/presenter/userPresenter';
import LoginResult from 'domain/model/user/loginResult';
import jwt from 'jsonwebtoken';
import jwtConfig from 'utils/jwtConfig';

export default class UserPresenter implements IUserPresenter {
  login(user: User): LoginResult {
    const token = jwt.sign({ user: user.username }, jwtConfig.secret, { expiresIn: '30 days' });
    const userLoginResult = {
      id: user.id, username: user.username, email: user.email, role: user.role,
    };
    return { user: userLoginResult, token };
  }
}
