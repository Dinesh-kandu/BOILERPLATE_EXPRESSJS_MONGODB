import { CHANGE_LOADING } from './constant';

const initialState = {
  isLoading: false,
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CHANGE_LOADING:
      return {
        ...state,
        isLoading: payload,
      };
    default:
      return state;
  }
}
