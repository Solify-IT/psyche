import React from 'react';
import { Route } from 'react-router-dom';
import Login from './views/login';
import PrivateRoute from './components/PrivateRoute';
import PatientsList from './views/patients';
import Form from './views/form';
import GenerateForm from './views/generateForm';
import RegisterUser from './views/registerUser';

const AppRouter = () => (
  <div>
    <Route path="/" exact component={Login} />
    <Route path="/login" exact component={Login} />
    <Route path="/registerUser" exact component={RegisterUser} />
    <Route path="/form" exact component={Form} />
    <Route path="/read-form" exact component={GenerateForm} />
    <PrivateRoute path="/patients" exact component={PatientsList} />
  </div>
);

export default AppRouter;
