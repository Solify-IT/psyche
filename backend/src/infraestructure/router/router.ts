import { Application } from 'express';
import { wrapError } from '@types';
import IAppController from 'interface/controller/appController';

export default class Router {
  constructor(app: Application, controller: IAppController) {
    app.get('/patients', async (request, response, next) => {
      await wrapError(controller.patients.getPatients({ request, response, next }));
    });
  }
}
