import React from 'react';
import { Route } from 'react-router-dom';
import Login from './views/login';
import PatientsList from './views/patients';

const AppRouter = () => (
  <div>
    <Route path="/" exact component={Login} />
    <Route path="/patients" exact component={PatientsList} />
  </div>
);

export default AppRouter;
