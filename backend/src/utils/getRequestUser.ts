import UserLoginResult from 'domain/model/user/userLoginResult';
import jwt from 'jsonwebtoken';
import InvalidDataError from './errors/InvalidDataError';
import jwtConfig from './jwtConfig';

function getRequestUser(token: string) : UserLoginResult {
  try {
    const { user } = jwt.verify(token, jwtConfig.secret) as any;
    return user;
  } catch (error) {
    throw new InvalidDataError('Invalid token');
  }
}

export default getRequestUser;
