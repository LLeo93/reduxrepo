import { configureStore } from '@reduxjs/toolkit';
import mainReducer from '../reduce/index';
import {
  saveFavoritesToLocalStorage,
  loadFavoritesFromLocalStorage,
} from '../utilities/localStorage';
import { thunk } from 'redux-thunk'; // Modifica qui

// Carichiamo i preferiti dal localStorage
const preloadedState = {
  favorites: loadFavoritesFromLocalStorage(),
};

const store = configureStore({
  reducer: mainReducer,
  preloadedState, // iniettiamo lo stato iniziale personalizzato
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

store.subscribe(() => {
  const state = store.getState();
  saveFavoritesToLocalStorage(state.favorites);
});

export default store;
