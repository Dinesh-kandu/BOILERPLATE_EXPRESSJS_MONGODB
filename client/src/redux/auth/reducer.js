import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
} from './constant';
import { DELETE_ACCOUNT } from '../profile/constant';

const innitialState = {
  token: localStorage.getItem('token'),
  isAuth: null,
  user: null,
};

export default function(state = innitialState, action) {
  const { payload } = action;

  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuth: true,
        user: payload,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuth: true,
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case DELETE_ACCOUNT:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        isAuth: false,
      };
    default:
      return state;
  }
}
