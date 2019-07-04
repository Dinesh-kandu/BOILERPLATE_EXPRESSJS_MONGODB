import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import LoadingComponent from '../common/LoadingScreenTransparent';

const PrivateRoute = ({
  component: Component,
  isAuth,
  isLoading,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => !isAuth ? (
        <Redirect to="/login" />
        ) : (
          <Fragment>
            {isLoading && <LoadingComponent />}
            <Component {...props} />
          </Fragment>
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  isAuth: PropTypes.bool,
  isLoading: PropTypes.bool,
  component: PropTypes.object.isRequired,
};

export default connect(state => ({
  isAuth: state.auth.isAuth,
  isLoading: state.loading.isLoading,
}))(PrivateRoute);
