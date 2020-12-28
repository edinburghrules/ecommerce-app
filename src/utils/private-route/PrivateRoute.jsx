import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ authenticated, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      authenticated ? <Redirect to='/' /> : <Component {...props} />
    }
  />
);

const mapStateToProps = (state) => {
  console.log(state.account.authenticated);
  return {
    authenticated: state.account.authenticated,
  };
};

export default connect(mapStateToProps)(PrivateRoute);
