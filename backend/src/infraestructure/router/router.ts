import { Application } from 'express';
import { wrapError } from '@types';
import IAppController from 'interface/controller/appController';
import Role from 'utils/role';
import authorize from 'utils/authorize';

export default class Router {
  constructor(app: Application, controller: IAppController) {
    app.post('/login', async (request, response, next) => {
      await wrapError(controller.users.login({ request, response, next }));
    });
    app.post('/users', authorize([Role.Admin]), async (request, response, next) => {
      await wrapError(controller.users.registerUser({ request, response, next }));
    });
    app.get('/users', authorize([Role.Admin]), async (request, response, next) => {
      await wrapError(controller.users.getUsers({ request, response, next }));
    });
    app.get('/user/:username', async (request, response, next) => {
      await wrapError(controller.users.getUser({ request, response, next }));
    });
    app.get('/patients', authorize([Role.Admin, Role.Psicologo]), async (request, response, next) => {
      await wrapError(controller.patients.getPatients({ request, response, next }));
    });
    app.get('/records/:id/forms', async (request, response, next) => {
      await wrapError(controller.forms.getFormsWithRecordId({ request, response, next }));
    });
    app.get('/records/:id', authorize([Role.Admin, Role.Psicologo]), async (request, response, next) => {
      await wrapError(controller.patients.getRecordDetail({ request, response, next }));
    });
    app.post('/patients', authorize([Role.Admin, Role.Psicologo]), async (request, response, next) => {
      await wrapError(controller.patients.registerPatient({ request, response, next }));
    });
    app.post('/forms', authorize([Role.Admin, Role.Psicologo]), async (request, response, next) => {
      await wrapError(controller.forms.registerForm({ request, response, next }));
    });
    app.get('/forms/:id', authorize([Role.Admin, Role.Psicologo]), async (request, response, next) => {
      await wrapError(controller.forms.detailForm({ request, response, next }));
    });
    app.post('/records/:id/patientForms', authorize([Role.Admin, Role.Psicologo]), async (request, response, next) => {
      await wrapError(controller.forms.registerPatientForm({ request, response, next }));
    });
    app.post('/profile', authorize([Role.Admin, Role.Psicologo]), async (request, response, next) => {
      await wrapError(controller.users.registerDoctorProfile({ request, response, next }));
    });
    app.get('/profilePatient/:id', async (request, response, next) => {
      await wrapError(controller.users.getUsers({ request, response, next }));
    });
    app.put('/profile', authorize([Role.Admin, Role.Psicologo]), async (request, response, next) => {
      await wrapError(controller.users.modifyDoctorProfile({ request, response, next }));
    });
    app.get('/profile/areas', async (request, response, next) => {
      await wrapError(controller.users.getUserPatientAreas({ request, response, next }));
    });
    app.put('/patientFormField/:id', authorize([Role.Psicologo, Role.Admin]), async (request, response, next) => {
      await wrapError(controller.forms.updatePatientForm({ request, response, next }));
    });
    app.get('/patientFormField/:id', authorize([Role.Psicologo, Role.Admin]), async (request, response, next) => {
      await wrapError(controller.forms.detailField({ request, response, next }));
    });
    app.put('/user/:id', async (request, response, next) => {
      await wrapError(controller.users.updateProfile({ request, response, next }));
    });
    app.get('/allUsers', authorize([Role.Admin]), async (request, response, next) => {
      await wrapError(controller.users.getAllUsers({ request, response, next }));
    });
    app.post('/canalize-patient', authorize([Role.Admin]), async (request, response, next) => {
      await wrapError(controller.patients.canalizePatient({ request, response, next }));
    });
    app.put('/deactivate-account/:id', authorize([Role.Admin]), async (request, response, next) => {
      await wrapError(controller.users.deactivateAccount({ request, response, next }));
    });
    app.put('/changePassword/', async (request, response, next) => {
      await wrapError(controller.users.changePassword({ request, response, next }));
    });
    app.put('/archive-record/:id', authorize([Role.Psicologo, Role.Admin]), authorize([Role.Admin, Role.Psicologo]), async (request, response, next) => {
      await wrapError(controller.patients.archiveRecord({ request, response, next }));
    });
    app.delete('/forms/:id', authorize([Role.Admin]), async (request, response, next) => {
      await wrapError(controller.forms.deleteFormById({ request, response, next }));
    });
    app.get('/forms', async (request, response, next) => {
      await wrapError(controller.forms.getForms({ request, response, next }));
    });
    app.get('/user-email/:email', async (request, response, next) => {
      await wrapError(controller.users.getUserByEmail({ request, response, next }));
    });
    app.get('/report/', async (request, response, next) => {
      await wrapError(controller.patients.getPatientStatistics({ request, response, next }));
    });
    app.put('/change-password/:id', async (request, response, next) => {
      await wrapError(controller.users.changePasswordAdmin({ request, response, next }));
    });
  }
}
