// eslint-disable jsx-props-no-spreading
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserRole from 'src/fixtures/roles';
import {
  authenticationService, logout, profileSet,
} from 'src/api/authenticationService';

const PrivateRoute = ({ component: Component, roles, ...rest }: any) => (
  /* eslint-disable react/jsx-props-no-spreading */
  <Route
    {...rest}
    render={(props) => {
      const currentUser = authenticationService.currentUserValue;
      if (!currentUser) {
        // the user is not logged in so redirect to login page
        return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
      }
      // User role is corrupt
      if (currentUser.role === '') {
        logout();
        return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
      }

      // check if the route is restricted by role
      if (roles && roles.indexOf(currentUser.role) === -1) {
        return <Redirect to={{ pathname: '/' }} />;
      }

      // check if user is first time logged in
      if (props.location.pathname !== '/register-profile' && currentUser.user.firstTime) {
        if (currentUser.user.role === UserRole.Psicólogo || currentUser.user.role
          === UserRole.Administrador) {
          return <Redirect to={{ pathname: '/register-profile' }} />;
        }
        profileSet();
      }

      // the user is authorized so return component
      return <Component {...props} />;
    }}
  />
);

export default PrivateRoute;
