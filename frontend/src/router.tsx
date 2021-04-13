import React from 'react';
import { Route } from 'react-router-dom';
import Home from './views/home';
import PatientsList from './views/patients';

const AppRouter = () => (
  <div>
    <Route path="/" exact component={Home} />
    <Route path="/pacientes" component={PatientsList} />
  </div>
);

export default AppRouter;
