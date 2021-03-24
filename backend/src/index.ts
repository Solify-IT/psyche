import express from 'express';
import cors from 'cors';
import Router from './infraestructure/router/router';
import Datastore from './infraestructure/datastore/datastore';
import Registry from './registry';

const portNumber: number = 8000;
const app: express.Application = express();

const initServer = () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
};

const setupRoutes = () => {
  const datastore = new Datastore();
  const registry = new Registry(datastore);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = new Router(app, registry.newAppController());
};

app.listen(portNumber, async () => {
  console.log(`Backend server running on port ${
    portNumber}`);

  initServer();
  setupRoutes();
});
