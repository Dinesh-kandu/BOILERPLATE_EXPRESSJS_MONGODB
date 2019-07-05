import { makeConstantCreator } from '../reduxCreator';

export const AuthTypes = makeConstantCreator(
  'REGISTER_SUCCESS',
  'REGISTER_FAIL',
  'USER_LOADED',
  'AUTH_ERROR',
  'LOGIN_SUCCESS',
  'LOGIN_FAIL',
  'DELETE_ACCOUNT',
  'LOGOUT',
);

const innitialState = {
  token: localStorage.getItem('token'),
  isAuth: null,
  user: null,
};

export default function(state = innitialState, action) {
  const { payload } = action;

  switch (action.type) {
    case AuthTypes.USER_LOADED:
      return {
        ...state,
        isAuth: true,
        user: payload,
      };
    case AuthTypes.REGISTER_SUCCESS:
    case AuthTypes.LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuth: true,
      };
    case AuthTypes.REGISTER_FAIL:
    case AuthTypes.LOGIN_FAIL:
    case AuthTypes.AUTH_ERROR:
    case AuthTypes.DELETE_ACCOUNT:
    case AuthTypes.LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        isAuth: false,
      };
    default:
      return state;
  }
}
