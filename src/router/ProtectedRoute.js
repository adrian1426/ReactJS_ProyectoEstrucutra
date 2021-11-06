import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { nameLastPathLocal } from '../constants/storage';

const ProtectedRoute = ({ component: Component, ...restProps }) => {
  localStorage.setItem(nameLastPathLocal, restProps.location.pathname);

  return (
    <Route
      {...restProps}
      component={props => (<Component {...props} />)}
    />
  );
};

ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired
}

export default ProtectedRoute;