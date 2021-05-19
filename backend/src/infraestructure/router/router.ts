import { Application } from 'express';
import { wrapError } from '@types';
import IAppController from 'interface/controller/appController';

export default class Router {
  constructor(app: Application, controller: IAppController) {
    app.post('/login', async (request, response, next) => {
      await wrapError(controller.users.login({ request, response, next }));
    });
    app.post('/users', async (request, response, next) => {
      await wrapError(controller.users.registerUser({ request, response, next }));
    });
    app.get('/users', async (request, response, next) => {
      await wrapError(controller.users.getUsers({ request, response, next }));
    });
    app.get('/patients', async (request, response, next) => {
      await wrapError(controller.patients.getPatients({ request, response, next }));
    });
    app.get('/records/:id/forms', async (request, response, next) => {
      await wrapError(controller.forms.getFormsWithRecordId({ request, response, next }));
    });
    app.get('/records/:id', async (request, response, next) => {
      await wrapError(controller.patients.getRecordDetail({ request, response, next }));
    });
    app.post('/patients', async (request, response, next) => {
      await wrapError(controller.patients.registerPatient({ request, response, next }));
    });
    app.get('/doctors', async (request, response, next) => {
      await wrapError(controller.doctors.getDoctors({ request, response, next }));
    });
    app.get('/doctors/old', async (request, response, next) => {
      await wrapError(controller.doctors.getDoctorsOld({ request, response, next }));
    });
    app.post('/forms', async (request, response, next) => {
      await wrapError(controller.forms.registerForm({ request, response, next }));
    });
    app.get('/forms/:id', async (request, response, next) => {
      await wrapError(controller.forms.detailForm({ request, response, next }));
    });
    app.post('/records/:id/patientForms', async (request, response, next) => {
      await wrapError(controller.forms.registerPatientForm({ request, response, next }));
    });
    app.post('/profile', async (request, response, next) => {
      await wrapError(controller.users.registerProfile({ request, response, next }));
    });
    app.get('/profilePatient/:id', async (request, response, next) => {
      await wrapError(controller.users.getUsers({ request, response, next }));
    });
    app.put('/profile', async (request, response, next) => {
      await wrapError(controller.users.modifyProfile({ request, response, next }));
    });
    app.get('/profile/areas', async (request, response, next) => {
      await wrapError(controller.users.getUserPatientAreas({ request, response, next }));
    });
    app.put('/patientFormField/:id', async (request, response, next) => {
      await wrapError(controller.forms.updatePatientForm({ request, response, next }));
    });
    app.get('/patientFormField/:id', async (request, response, next) => {
      await wrapError(controller.forms.detailField({ request, response, next }));
    });
    app.get('/allUsers', async (request, response, next) => {
      await wrapError(controller.users.getAllUsers({ request, response, next }));
    });
    app.post('/canalize-patient', async (request, response, next) => {
      await wrapError(controller.patients.canalizePatient({ request, response, next }));
    });
  }
}
