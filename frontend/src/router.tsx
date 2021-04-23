import React from 'react';
import { Route } from 'react-router-dom';
import Login from './views/login';
import PrivateRoute from './components/PrivateRoute';
import PatientsList from './views/patients';
import Home from './views/Dashboard/home';
import Form from './views/form';
import GenerateForm from './views/generateForm';
import DashboardArea from './views/Dashboard/dashboardArea';
import DasboarPsic from './views/Dashboard/dashboardAsPsic';

const AppRouter = () => (
  <div>
    <Route path="/" exact component={Login} />
    <Route path="/login" exact component={Login} />
    <Route path="/form" exact component={Form} />
    <Route path="/read-form" exact component={GenerateForm} />
    <PrivateRoute path="/patients" exact component={PatientsList} />
    <PrivateRoute path="/home" exact component={Home} />
    <PrivateRoute path="/dashboard-area" exact component={DashboardArea} />
    <PrivateRoute path="/dashboard-as-psic" exact component={DasboarPsic} />
  </div>
);

export default AppRouter;
