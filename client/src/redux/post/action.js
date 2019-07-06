import axios from 'axios';
import { setAlert } from '../alert/action';
import { CHANGE_LOADING } from '../loading/constant';
import { makeConstantCreator } from '../reduxCreator';

export const PostTypes = makeConstantCreator(
  'GET_POST',
  'GET_POSTS',
  'POST_ERROR',
  'DELETE_POST',
  'ADD_POST',
  'UPDATE_LIKES',
  'ADD_COMMENT',
  'REMOVE_COMMENT',
);

export const getPosts = () => async dispatch => {
  try {
    dispatch({
      type: CHANGE_LOADING,
      payload: true,
    });
    const res = await axios.get('/api/posts');
    dispatch({
      type: PostTypes.GET_POSTS,
      payload: res.data,
    });
    dispatch({
      type: CHANGE_LOADING,
      payload: false,
    });
  } catch (error) {
    dispatch({
      type: PostTypes.POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const getPost = id => async dispatch => {
  try {
    dispatch({
      type: CHANGE_LOADING,
      payload: true,
    });
    const res = await axios.get(`/api/posts/${id}`);
    dispatch({
      type: PostTypes.GET_POST,
      payload: res.data,
    });
    dispatch({
      type: CHANGE_LOADING,
      payload: false,
    });
  } catch (error) {
    dispatch({
      type: PostTypes.POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const addLike = postId => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/like/${postId}`);
    dispatch({
      type: PostTypes.UPDATE_LIKES,
      payload: { postId, likes: res.data },
    });
  } catch (error) {
    dispatch({
      type: PostTypes.POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const removeLike = postId => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/unlike/${postId}`);
    dispatch({
      type: PostTypes.UPDATE_LIKES,
      payload: { postId, likes: res.data },
    });
  } catch (error) {
    dispatch({
      type: PostTypes.POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const deletePost = id => async dispatch => {
  try {
    await axios.delete(`/api/posts/${id}`);
    dispatch({
      type: PostTypes.DELETE_POST,
      payload: id,
    });
    dispatch(setAlert('Post Removed', 'success'));
  } catch (error) {
    dispatch({
      type: PostTypes.POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const addPost = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('/api/posts', formData, config);

    dispatch({
      type: PostTypes.ADD_POST,
      payload: res.data,
    });

    dispatch(setAlert('Post Created', 'success'));
  } catch (error) {
    dispatch({
      type: PostTypes.POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const addComment = (postId, formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    dispatch({
      type: CHANGE_LOADING,
      payload: true,
    });
    const res = await axios.post(`/api/posts/comment/${postId}`, formData, config);

    dispatch({
      type: PostTypes.ADD_COMMENT,
      payload: res.data,
    });

    dispatch(setAlert('Comment Created', 'success'));
    dispatch({
      type: CHANGE_LOADING,
      payload: false,
    });
  } catch (error) {
    dispatch({
      type: PostTypes.POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const deleteComment = (postId, commentId) => async dispatch => {
  try {
    dispatch({
      type: CHANGE_LOADING,
      payload: true,
    });
    await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

    dispatch({
      type: PostTypes.REMOVE_COMMENT,
      payload: commentId,
    });

    dispatch(setAlert('Comment Removed', 'success'));
    dispatch({
      type: CHANGE_LOADING,
      payload: false,
    });
  } catch (error) {
    dispatch({
      type: PostTypes.POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
