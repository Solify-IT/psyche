import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { createConnection } from 'typeorm';
import ormConfig from 'infraestructure/orm/ormconfig';
import jwt from 'express-jwt';
import jwtConfig from 'utils/jwtConfig';
import Router from './infraestructure/router/router';
import Datastore from './infraestructure/datastore/datastore';
import Registry from './registry';
import 'reflect-metadata';

const app: express.Application = express();

const port : number = 8000;

const initServer = () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(morgan('dev'));
 // app.use(jwt(jwtConfig).unless({ path: '/login' }));
};

async function initDatabase() {
  try {
    await createConnection(ormConfig);
    console.log('Database connection established succesfully');
  } catch (e) {
    console.error(`An error occured when establishing a connection to the database: ${e}`);
  }
}

const setupRoutes = () => {
  const datastore = new Datastore();
  const registry = new Registry(datastore);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = new Router(app, registry.newAppController());
};

app.listen(port, async () => {
  initServer();
  initDatabase();
  setupRoutes();
  console.log(`Backend service started on port ${port}.`);
});
