import { User } from 'domain/model';
import LoginResult from 'domain/model/loginResult';

export default interface IUserPresenter {
  login(user: User) : LoginResult;
}
