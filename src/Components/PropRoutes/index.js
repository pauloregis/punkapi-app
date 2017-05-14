import React from 'react';
import { Route } from 'react-router-dom';

const PropsRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={routeProps => (
      <Component {...routeProps} {...rest} />
    )} />
  );
};

export default PropsRoute;