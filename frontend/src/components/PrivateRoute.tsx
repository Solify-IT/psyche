// eslint-disable jsx-props-no-spreading
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { authenticationService } from '../api/authenticationService';

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

      // check if the route is restricted by role
      if (roles && roles.indexOf(currentUser.role) === -1) {
        return <Redirect to={{ pathname: '/' }} />;
      }

      // the user is authorized so return component
      return <Component {...props} />;
    }}
  />
);

export default PrivateRoute;
