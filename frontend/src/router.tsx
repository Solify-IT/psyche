import React from 'react';
import { Route } from 'react-router-dom';
import Login from './views/login';
import PrivateRoute from './components/PrivateRoute';
import PatientsList from './views/patients';
import Home from './views/Dashboard/home';
import NewForm from './views/Forms/newForm';
import GenerateForm from './views/generateForm';
import RegisterUser from './views/registerUser';
import RecordDetail from './views/Patients/recordDetail';
// Dashboard Views
import DashboardArea from './views/Dashboard/dashboardArea';
import DashboardAtPsic from './views/Dashboard/dashboardAtPsic';
import DashboardAtPsiq from './views/Dashboard/dashboardAtPsiq';
import DashboardEvaluacion from './views/Dashboard/dashboardEvaluacion';
import DashboardAsesoria from './views/Dashboard/dashboardAsesoria';
// Patient Views
import RegisterPatient from './views/Patients/registerPatient';
import DashboardPsic from './views/Dashboard/dashboardAsPsic';

const AppRouter = () => (
  <div>
    <Route path="/login" exact component={Login} />
    <Route path="/registerUser" exact component={RegisterUser} />
    <Route path="/form" exact component={Form} />
    <Route path="/new-form" exact component={NewForm} />
    <Route path="/read-form" exact component={GenerateForm} />
    <PrivateRoute path="/" exact component={Home} />
    <PrivateRoute path="/pacientes" exact component={PatientsList} />
    <PrivateRoute path="/expediente/:id(\d+)" exact component={RecordDetail} />
    <PrivateRoute path="/register-patient/:area/:group" exact component={RegisterPatient} />
    <PrivateRoute path="/home" exact component={Home} />
    <PrivateRoute path="/dashboard-area" exact component={DashboardArea} />
    <PrivateRoute path="/dashboard-atencion-psicologica" exact component={DashboardAtPsic} />
    <PrivateRoute path="/dashboard-psiquiatrica" exact component={DashboardAtPsiq} />
    <PrivateRoute path="/dashboard-evaluacion" exact component={DashboardEvaluacion} />
    <PrivateRoute path="/dashboard-asesoria" exact component={DashboardAsesoria} />
    <PrivateRoute path="/dashboard-as-psic" exact component={DashboardPsic} />
  </div>
);

export default AppRouter;
