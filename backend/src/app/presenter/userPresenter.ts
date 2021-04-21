import { User } from 'domain/model';
import LoginResult from 'domain/model/user/loginResult';

export default interface IUserPresenter {
  register(user: User) : User;
  login(user: User) : LoginResult;
}
