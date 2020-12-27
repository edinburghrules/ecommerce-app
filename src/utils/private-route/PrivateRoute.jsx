import React from 'react';
import { Route, Redirect } from 'react-router-dom';



const PrivateRoute = ({ authenticated, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (authenticated ? <Redirect to='/' /> : <Component {...props} />)}
  />
);

export default PrivateRoute;
