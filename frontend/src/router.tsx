import React from 'react';
import { Route } from 'react-router-dom';
import Home from './views/home';
import TestHome from './views/testApi';

const AppRouter = () => (
  <div>
    <Route path="/" exact component={Home} />
    <Route path="/test" component={TestHome} />
  </div>
);

export default AppRouter;
