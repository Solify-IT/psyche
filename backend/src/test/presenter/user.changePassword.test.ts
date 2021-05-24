import UserPresenter from 'interface/presenter/userPresenter';

describe('User presenter', () => {
  const userPresenter : UserPresenter = new UserPresenter();
  const password = 'HolaPobre:DDD';
  test('should return an encrypted password', async () => {
    const result = await userPresenter.encryptedPassword(password);
    expect(result).toBeDefined();
    expect(result !== password).toEqual(true);
  });
});
