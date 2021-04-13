import { User } from 'domain/model';
import LoginResult from 'domain/model/user/loginResult';

export default interface IUserPresenter {
  login(user: User) : LoginResult;
}
