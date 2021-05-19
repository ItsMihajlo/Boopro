import { SET_MOVIES, SET_POPOVER_DATA } from '../actions/actionTypes';

const initialState = {
  movies: {},
  popoverData: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MOVIES:
      return {
        ...state,
        movies: { ...state.movies, [action.id]: action.movies },
      };
    case SET_POPOVER_DATA:
      return {
        ...state,
        popoverData: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
