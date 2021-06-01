import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { createConnection } from 'typeorm';
import ormConfig from 'infraestructure/orm/ormconfig';
// import jwtConfig from 'utils/jwtConfig';
// import jwt from 'express-jwt';
import Router from './infraestructure/router/router';
import Datastore from './infraestructure/datastore/datastore';
import Registry from './registry';
import 'reflect-metadata';

const app: express.Application = express();

const port : number = 8000;
function setMorgan() {
  app.use(morgan((tokens, req, res) => {
    if (req && req.user) {
      const { user } = (req.user as any);
      return [
        user.username || '',
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
      ].join(' ');
    }
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
    ].join(' ');
  }));
}
const initServer = () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(express.static(path.join(__dirname, '../public')));
  setMorgan();
  /* app.use(
    jwt({ secret: jwtConfig.secret, algorithms:
       jwtConfig.algorithms }).unless({ path: ['/login'] }),
  ); */
};

async function initDatabase() {
  try {
    await createConnection(ormConfig);
    /* eslint-disable no-console */
    console.log('Database connection established succesfully');
  } catch (e) {
    /* eslint-disable no-console */
    console.error(`An error occured when establishing a connection to the database: ${e}`);
  }
}

const setupRoutes = () => {
  const datastore = new Datastore();
  const registry = new Registry(datastore);
  return new Router(app, registry.newAppController());
};

app.listen(port, async () => {
  initServer();
  initDatabase();
  setupRoutes();
});
