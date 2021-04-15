import React from 'react';
import { Route } from 'react-router-dom';
import Login from './views/login';
import PrivateRoute from './components/PrivateRoute';
import PatientsList from './views/patients';

const AppRouter = () => (
  <div>
    <Route path="/" exact component={Login} />
    <Route path="/login" exact component={Login} />
    <PrivateRoute path="/patients" exact component={PatientsList} />
  </div>
);

export default AppRouter;
