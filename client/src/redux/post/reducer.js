import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from './constant';

const initialState = {
  posts: [],
  post: null,
  error: {},
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, payload],
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map(post => post._id === payload.postId
            ? { ...post, likes: payload.likes }
            : post),
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(
          post => post._id !== payload,
        ),
      };
    case GET_POST:
      return {
        ...state,
        post: payload,
      };
    case ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: payload },
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            comment => comment.id !== payload,
          ),
        },
      };
    default:
      return state;
  }
}
