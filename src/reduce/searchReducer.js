import {
  SET_SEARCH_RESULTS,
  SET_LOADING,
  SET_ERROR,
} from '../actions/FavoriteAction.js';

const initialState = {
  results: [],
  loading: false, // Aggiungi stato di caricamento
  error: null, // Aggiungi stato di errore
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_RESULTS:
      return {
        ...state,
        results: action.payload,
        loading: false, // Disabilita il caricamento
        error: null, // Resetta l'errore
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true, // Attiva il caricamento
      };
    case SET_ERROR:
      return {
        ...state,
        loading: false, // Disabilita il caricamento
        error: action.payload, // Imposta l'errore
      };
    default:
      return state;
  }
};

export default searchReducer;
