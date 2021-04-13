import React from 'react';
import { Route } from 'react-router-dom';
// import Home from './views/home';
import Login from './views/login';

const AppRouter = () => (
  <div>
    <Route path="/" exact component={Login} />
  </div>
);

export default AppRouter;
