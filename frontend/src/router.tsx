import React from 'react';
import { Route } from 'react-router-dom';
// import Home from './views/home';
import PatientsList from './views/patients';
import Login from './views/login';

const AppRouter = () => (
  <div>
    <Route path="/" exact component={Login} />
    <Route path="/pacientes" component={PatientsList} />
  </div>
);

export default AppRouter;
