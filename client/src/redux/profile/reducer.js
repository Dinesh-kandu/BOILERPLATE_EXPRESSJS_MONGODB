import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  GET_PROFILES,
  GET_REPOS,
} from './constant';
import { CLEAR_PROFILE } from '../auth/constant';

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  error: {},
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_REPOS:
      return {
        ...state,
        repos: payload,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
      };
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
      };
    default:
      return state;
  }
}
