import { makeConstantCreator } from '../reduxCreator';

export const ProfileTypes = makeConstantCreator(
  'GET_PROFILE',
  'PROFILE_ERROR',
  'UPDATE_PROFILE',
  'DELETE_ACCOUNT',
  'GET_PROFILES',
  'GET_REPOS',
  'CLEAR_PROFILE',
);

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  error: {},
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ProfileTypes.GET_REPOS:
      return {
        ...state,
        repos: payload,
      };
    case ProfileTypes.GET_PROFILES:
      return {
        ...state,
        profiles: payload,
      };
    case ProfileTypes.GET_PROFILE:
    case ProfileTypes.UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
      };
    case ProfileTypes.PROFILE_ERROR:
      return {
        ...state,
        error: payload,
      };
    case ProfileTypes.CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
      };
    default:
      return state;
  }
}
