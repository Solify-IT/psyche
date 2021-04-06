import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import Router from './infraestructure/router/router';
import Datastore from './infraestructure/datastore/datastore';
import Registry from './registry';

const app: express.Application = express();

const initServer = () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(morgan('dev'));
};

const setupRoutes = () => {
  const datastore = new Datastore();
  const registry = new Registry(datastore);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = new Router(app, registry.newAppController());
};

const setupEnvironment = () => {
  const result = dotenv.config();
  if (result.error) {
    console.error('An error ocurred attempting to open .env file. Make sure it is created properly on the project root.');
    return;
  }
  console.log(result.parsed);
};

app.listen(8000, async () => {
  setupEnvironment();
  initServer();
  setupRoutes();
  console.log('Backend service started on port 8000.');
});
