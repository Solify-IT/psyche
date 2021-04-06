/* eslint-disable no-console */
import config from 'config';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'postgres',
  username: config.dbUser,
  password: config.dbPassword,
  database: config.dbHost,
  logging: console.log,
});

export default sequelize;
