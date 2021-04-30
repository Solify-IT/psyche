import { User } from 'domain/model';
import jwt from 'jsonwebtoken';
import UserPresenter from 'interface/presenter/userPresenter';

describe('User presenter', () => {
  const userPresenter : UserPresenter = new UserPresenter();
  const user : User = {
    id: 1, username: 'test', password: 'test', email: 'test@mail.com', role: 'role', name: 'carlos', address: 'Av La Luz 97', zipCode: '35689',
  };
  test('should return token and user data', () => {
    const result = userPresenter.login(user);
    expect(result.token).toBeDefined();
    expect(result.user).toBeDefined();
    expect(result.user.username).toEqual('test');
  });
  test('decoded token should have user data and expiration', () => {
    const result = userPresenter.login(user);
    const token : any = jwt.decode(result.token);
    expect(token).toBeDefined();
    expect(token.user.username).toEqual('test');
    expect(token.exp).toBeDefined();
  });
});
