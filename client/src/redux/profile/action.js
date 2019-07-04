import axios from 'axios';
import { setAlert } from '../alert/action';
import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  DELETE_ACCOUNT,
  GET_PROFILES,
  GET_REPOS,
} from './constant';
import { CLEAR_PROFILE } from '../auth/constant';
import { CHANGE_LOADING } from '../loading/constant';

export const getCurrentProfile = () => async dispatch => {
  try {
    dispatch({
      type: CHANGE_LOADING,
      payload: true,
    });
    const res = await axios.get('/api/profile/me');
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
    dispatch({
      type: CHANGE_LOADING,
      payload: false,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const getProfiles = () => async dispatch => {
  try {
    dispatch({
      type: CHANGE_LOADING,
      payload: true,
    });
    const res = await axios.get('/api/profile');
    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
    dispatch({
      type: CHANGE_LOADING,
      payload: false,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response,
        status: error.response,
      },
    });
  }
};

export const getProfileById = userId => async dispatch => {
  try {
    dispatch({
      type: CHANGE_LOADING,
      payload: false,
    });
    const res = await axios.get(
      `/api/profile/user/${userId}`,
    );
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
    dispatch({
      type: CHANGE_LOADING,
      payload: false,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response,
        status: error.response,
      },
    });
  }
};

export const getGithubRepos = username => async dispatch => {
  try {
    dispatch({
      type: CHANGE_LOADING,
      payload: true,
    });
    const res = await axios.get(
      `/api/profile/github/${username}`,
    );
    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
    dispatch({
      type: CHANGE_LOADING,
      payload: false,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const createProfile = (
  formData,
  history,
  edit = false,
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    dispatch({
      type: CHANGE_LOADING,
      payload: true,
    });
    const res = await axios.post(
      '/api/profile',
      formData,
      config,
    );
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
    dispatch(
      setAlert(edit ? 'Profile Updated' : 'Profile Created'),
    );
    dispatch({
      type: CHANGE_LOADING,
      payload: false,
    });

    if (edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    const { errors } = err.response.data;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger', 2000)));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

export const addExperience = (
  formData,
  history,
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    dispatch({
      type: CHANGE_LOADING,
      payload: true,
    });
    const res = await axios.put(
      '/api/profile/experience',
      formData,
      config,
    );
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch({
      type: CHANGE_LOADING,
      payload: false,
    });
    dispatch(setAlert('Experience Added', 'success'));
    history.push('/dashboard');
  } catch (err) {
    const { errors } = err.response.data;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger', 2000)));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

export const addEducation = (
  formData,
  history,
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    dispatch({
      type: CHANGE_LOADING,
      payload: true,
    });
    const res = await axios.put(
      '/api/profile/education',
      formData,
      config,
    );
    dispatch({
      type: CHANGE_LOADING,
      payload: false,
    });
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Education Added', 'success'));
    history.push('/dashboard');
  } catch (err) {
    const { errors } = err.response.data;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger', 2000)));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

export const deleteExperience = id => async dispatch => {
  try {
    dispatch({
      type: CHANGE_LOADING,
      payload: true,
    });
    const res = await axios.delete(
      `/api/profile/experience/${id}`,
    );
    dispatch({
      type: CHANGE_LOADING,
      payload: false,
    });
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Experience Removed', 'success'));
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const deleteEducation = id => async dispatch => {
  try {
    dispatch({
      type: CHANGE_LOADING,
      payload: true,
    });
    const res = await axios.delete(
      `/api/profile/education/${id}`,
    );
    dispatch({
      type: CHANGE_LOADING,
      payload: false,
    });
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Education Removed', 'success'));
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const deleteAccount = () => async dispatch => {
  if (
    window.confirm('Are you sure? This can NOT be undone')
  ) {
    try {
      dispatch({
        type: CHANGE_LOADING,
        payload: true,
      });
      await axios.delete('/api/profile');
      dispatch({
        type: CHANGE_LOADING,
        payload: false,
      });
      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: DELETE_ACCOUNT });

      dispatch(
        setAlert('Your account has been deleted', 'success'),
      );
    } catch (error) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  }
};
