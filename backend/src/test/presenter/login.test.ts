import { User } from 'domain/model';
import jwt from 'jsonwebtoken';
import UserPresenter from 'interface/presenter/userPresenter';
import userFixture from 'fixtures/user';

describe('User presenter', () => {
  const userPresenter : UserPresenter = new UserPresenter();
  const user : User = userFixture;
  test('should return token and user data', () => {
    const result = userPresenter.login(user);
    expect(result.token).toBeDefined();
    expect(result.user).toBeDefined();
    expect(result.user.username).toEqual(user.username);
  });
  test('decoded token should have user data and expiration', () => {
    const result = userPresenter.login(user);
    const token : any = jwt.decode(result.token);
    expect(token).toBeDefined();
    expect(token.user.username).toEqual(user.username);
    expect(token.exp).toBeDefined();
  });
});
