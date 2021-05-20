import UserPresenter from 'interface/presenter/userPresenter';

describe('User presenter', () => {
  const userPresenter : UserPresenter = new UserPresenter();
  const password = 'HolaPobre:DDD';
  test('Te amooo AC <3 :DDD', async () => {
    const result = await userPresenter.encryptedPassword(password);
    expect(result).toBeDefined();
    expect(result !== password).toEqual(true);
  });
});
