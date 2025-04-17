// src/actions/favoriteActions.js

import {
  ADD_TO_FAVS,
  REMOVE_FROM_FAVS,
  SET_FAVORITES,
  SET_LOADING,
  SET_ERROR,
  SET_SEARCH_RESULTS,
} from './ActionType';

// Aggiungi un'azienda ai preferiti
export const addToFavs = (company) => ({
  type: ADD_TO_FAVS,
  payload: company,
});

// Rimuovi un'azienda dai preferiti
export const removeFromFavs = (company) => ({
  type: REMOVE_FROM_FAVS,
  payload: company,
});

// Imposta la lista dei preferiti (usato per il recupero dei preferiti)
export const setFavorites = (favorites) => ({
  type: SET_FAVORITES,
  payload: favorites,
});

// Imposta lo stato di caricamento
export const setLoading = () => ({
  type: SET_LOADING,
});

// Imposta lo stato di errore
export const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});

// Salva i risultati della ricerca
export const setSearchResults = (results) => ({
  type: SET_SEARCH_RESULTS,
  payload: results,
});

// Azione asincrona per ottenere i lavori dalla API
export const fetchJobs = (query) => {
  return async (dispatch) => {
    dispatch(setLoading()); // Inizia il caricamento
    try {
      const baseEndpoint =
        'https://strive-benchmark.herokuapp.com/api/jobs?search=';
      const response = await fetch(`${baseEndpoint}${query}&limit=20`);

      if (response.ok) {
        const { data } = await response.json();
        dispatch(setSearchResults(data)); // Aggiungi i risultati alla store
      } else {
        throw new Error('Errore durante il recupero dei dati');
      }
    } catch (error) {
      dispatch(setError(error.message)); // Gestisci l'errore
    }
  };
};
