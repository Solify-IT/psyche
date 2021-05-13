import userFixture from 'fixtures/user';
import jwt from 'jsonwebtoken';
import InvalidDataError from 'utils/errors/InvalidDataError';
import getRequestUser from 'utils/getRequestUser';
import jwtConfig from 'utils/jwtConfig';

describe('Get request user util', () => {
  test('returns user object when valid jwt passed', async () => {
    const user = userFixture;
    const userLoginResult = {
      user: {
        id: 1,
        username: user.username,
        email: user.email,
        role: user.role,
        firstTime: user.firstTime,
      },
    };
    const token = jwt.sign(userLoginResult, jwtConfig.secret);
    const result = getRequestUser(token);
    expect(result).toBeDefined();
    expect(result.id).toEqual(userLoginResult.user.id);
  });

  test('should throw error when invalid jwt passed', async () => {
    expect(() => { getRequestUser('DMASKD'); }).toThrowError(InvalidDataError);
  });
});
