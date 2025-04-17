// src/redux/reducers/favoriteReducer.js

import {
  ADD_TO_FAVS,
  REMOVE_FROM_FAVS,
  SET_FAVORITES,
  SET_LOADING,
  SET_ERROR,
} from '../actions/ActionType';

const initialState = {
  companies: [], // Stato iniziale per i preferiti
  isLoading: false, // Stato di caricamento
  error: null, // Stato di errore
};

const favoriteReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_FAVS:
      if (state.companies.includes(action.payload)) return state;
      return {
        ...state,
        companies: [...state.companies, action.payload],
      };

    case REMOVE_FROM_FAVS:
      return {
        ...state,
        companies: state.companies.filter(
          (company) => company !== action.payload
        ),
      };

    case SET_FAVORITES:
      return {
        ...state,
        companies: action.payload,
      };

    case SET_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case SET_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default favoriteReducer;
