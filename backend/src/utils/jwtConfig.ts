import dotenv from 'dotenv';

dotenv.config();

export = {
  authenticationEnabled: process.env.NO_AUTH === undefined,
  secret: process.env.SECRET || 'example',
  algorithms: ['HS256'],
};
