import axios from 'axios';
import { setAlert } from '../alert/action';
import setAuthToken from '../../utils/setAuthToken';

import { makeConstantCreator } from '../reduxCreator';

export const AuthTypes = makeConstantCreator(
  'REGISTER_SUCCESS',
  'REGISTER_FAIL',
  'USER_LOADED',
  'AUTH_ERROR',
  'LOGIN_SUCCESS',
  'LOGIN_FAIL',
  'LOGOUT',
);

export const ProfileTypes = makeConstantCreator('CLEAR_PROFILE');

export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/api/auth');
    dispatch({
      type: AuthTypes.USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AuthTypes.AUTH_ERROR,
    });
  }
};

export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post('/api/users', body, config);
    dispatch({
      type: AuthTypes.REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    const { errors } = err.response.data;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger', 2000)));
    }
    dispatch({
      type: AuthTypes.REGISTER_FAIL,
    });
  }
};

export const login = ({ email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/auth', body, config);

    dispatch({
      type: AuthTypes.LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const { errors } = err.response.data;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger', 2000)));
    }
    dispatch({
      type: AuthTypes.LOGIN_FAIL,
    });
  }
};

export const logout = () => dispatch => {
  dispatch({ type: ProfileTypes.CLEAR_PROFILE });
  dispatch({ type: AuthTypes.LOGOUT });
};
