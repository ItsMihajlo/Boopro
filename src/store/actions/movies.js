import axios from 'axios';
import { SET_MOVIES, SET_POPOVER_DATA } from './actionTypes';

export const getMovies = (id) => {
  return function (dispatch) {
    return axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?with_genres=${id}&api_key=d38aa8716411ef7d8e9054b34a6678ac`
      )
      .then((response) => {
        dispatch(setMovies(response.data.results, id));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const setMovies = (movies, id) => {
  return {
    type: SET_MOVIES,
    movies,
    id,
  };
};

export const setPopoverData = (payload) => {
  return {
    type: SET_POPOVER_DATA,
    payload,
  };
};
