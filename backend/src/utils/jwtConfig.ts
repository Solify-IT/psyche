import dotenv from 'dotenv';

dotenv.config();

export = {
  secret: process.env.SECRET || 'example',
  algorithms: ['HS256'],
};
