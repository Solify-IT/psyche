import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import Router from './infraestructure/router/router';
import Datastore from './infraestructure/datastore/datastore';
import sequelize from './infraestructure/orm/sequelize';
import Registry from './registry';

const app: express.Application = express();

const port : number = 8000;

const initServer = () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(morgan('dev'));
};

async function initDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Connection to database has been established succesfully');
  } catch (error) {
    console.error('Unabble to connect to database: ', error);
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
