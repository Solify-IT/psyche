
import { Application } from 'express';
import { wrapError } from 'src/@types';
import IAppController from 'src/interface/controller/appController'

export default class Router {
    constructor(app: Application, controller: IAppController) {
        app.get('/patients', async (request, response, next) => {
            await wrapError(controller.patients.getPatients({ request, response, next}),
            )
        });
    }
}