import React from 'react';
import { Route, Switch } from 'react-router-dom';
import RegisterProfile from 'src/views/Users/registerProfile';
import PrivateRoute from 'src/components/PrivateRoute';
import ConsultPatient from './views/Patients/consultPatient';
import Home from './views/Dashboard/home';
import RecordDetail from './views/Patients/recordDetail';

// User Views
import RegisterUser from './views/Users/registerUser';
import Login from './views/login';
import ModifyProfile from './views/Users/modifyProfile';
import ViewUsers from './views/Users/viewUsers';

// Soolers View
import Soolers from './views/Dashboard/soolers';

// Dashboard Views
import DashboardArea from './views/Dashboard/dashboardArea';
import DashboardAtPsic from './views/Dashboard/dashboardAtPsic';
import DashboardAtPsiq from './views/Dashboard/dashboardAtPsiq';
import DashboardEvaluacion from './views/Dashboard/dashboardEvaluacion';
import DashboardAsesoria from './views/Dashboard/dashboardAsesoria';

// Patient Views
import RegisterPatient from './views/Patients/registerPatient';
import DashboardPsic from './views/Dashboard/dashboardAsPsic';
import PatientCanalization from './views/Patients/patientCanalization';
import UpdatePatientCanalization from './views/Patients/updatePatientCanalization';
import GenerateForm from './components/Forms/NewPatientForm/generateForm';
import UpdateForm from './views/Forms/updateForm';
import ViewPatients from './views/Patients/viewPatients';

// Form views
import {
  ViewForms,
  ConsultPatientForm,
  UpdatePatientForm,
  PatientAvailableForms,
  NewPatientForm,
  NewForm,
} from './views/Forms';

// Users
import ConsultProfiles from './views/Users/consultProfiles';
import UpdateUserAdmin from './views/Users/updateUserAdmin';
import UpdateUser from './views/Users/updateUser';
import ChangePassword from './views/Users/changePassword';
import NotFound from './components/NotFound';
import UserRole from './fixtures/roles';

const AppRouter = () => (
  <Switch>
    <Route path="/login" exact component={Login} />
    <PrivateRoute path="/register-user" exact component={RegisterUser} roles={[UserRole.Administrador]} />
    <PrivateRoute path="/new-form" exact component={NewForm} />
    <PrivateRoute path="/update-patient-form/:formId(\d+)" exact component={UpdatePatientForm} roles={[UserRole.Administrador, UserRole.Psicólogo]} />
    <PrivateRoute path="/expediente/:id(\d+)/encuestas/:formId(\d+)" exact component={NewPatientForm} roles={[UserRole.Administrador, UserRole.Psicólogo]} />
    <PrivateRoute path="/expediente/:id(\d+)/encuestas" exact component={PatientAvailableForms} roles={[UserRole.Administrador, UserRole.Psicólogo]} />
    <PrivateRoute path="/" exact component={Home} />
    <PrivateRoute path="/read-form" exact component={GenerateForm} roles={[UserRole.Administrador, UserRole.Psicólogo]} />
    <PrivateRoute path="/consult-patient" exact component={ConsultPatient} />
    <PrivateRoute path="/expediente/:id(\d+)" exact component={RecordDetail} />
    <PrivateRoute path="/register-patient/:area/:group" exact component={RegisterPatient} />
    <PrivateRoute path="/home" exact component={Home} />
    <PrivateRoute path="/dashboard-area" exact component={DashboardArea} roles={[UserRole.Administrador, UserRole.Psicólogo]} />
    <PrivateRoute path="/dashboard-atencion-psicologica" exact component={DashboardAtPsic} roles={[UserRole.Administrador, UserRole.Psicólogo]} />
    <PrivateRoute path="/dashboard-psiquiatrica" exact component={DashboardAtPsiq} roles={[UserRole.Administrador, UserRole.Psicólogo]} />
    <PrivateRoute path="/dashboard-evaluacion" exact component={DashboardEvaluacion} roles={[UserRole.Administrador, UserRole.Psicólogo]} />
    <PrivateRoute path="/dashboard-asesoria" exact component={DashboardAsesoria} roles={[UserRole.Administrador, UserRole.Psicólogo]} />
    <PrivateRoute path="/dashboard-as-psic" exact component={DashboardPsic} roles={[UserRole.Administrador, UserRole.Psicólogo]} />
    <PrivateRoute path="/register-profile" exact component={RegisterProfile} roles={[UserRole.Administrador, UserRole.Psicólogo]} />
    <PrivateRoute path="/modify-profile" exact component={ModifyProfile} roles={[UserRole.Administrador, UserRole.Psicólogo]} />
    <PrivateRoute path="/user-profile/update/:id/" exact component={UpdateUser} />
    <PrivateRoute path="/patient-form/:id" exact component={ConsultPatientForm} roles={[UserRole.Administrador, UserRole.Psicólogo]} />
    <PrivateRoute path="/user-profile/:id" exact component={ConsultProfiles} />
    <PrivateRoute path="/patient-profile/:id" exact component={ConsultProfiles} />
    <PrivateRoute path="/patient-canalization/:patientId(\d+)" exact component={PatientCanalization} roles={[UserRole.Administrador, UserRole.Psicólogo]} />
    <PrivateRoute path="/update-patient-canalization/:patientId(\d+)" exact component={UpdatePatientCanalization} roles={[UserRole.Administrador, UserRole.Psicólogo]} />
    <PrivateRoute path="/change-password" exact component={ChangePassword} />
    <PrivateRoute path="/view-users" exact component={ViewUsers} roles={[UserRole.Administrador]} />
    <PrivateRoute path="/user-update" exact component={UpdateUserAdmin} roles={[UserRole.Administrador]} />
    <PrivateRoute path="/user-update/:id/" exact component={UpdateUserAdmin} roles={[UserRole.Administrador]} />
    <Route path="/soolers" exact component={Soolers} />
    <PrivateRoute path="/user-update" exact component={UpdateUserAdmin} />
    <PrivateRoute path="/view-forms" exact component={ViewForms} />
    <PrivateRoute path="/update-form/:id" exact component={UpdateForm} />
    <PrivateRoute path="/view-patients" exact component={ViewPatients} />
    <PrivateRoute path="/update-form/:id" exact component={UpdateForm} roles={[UserRole.Administrador]} />
    <Route component={NotFound} />
  </Switch>
);

export default AppRouter;
