import { configureStore } from '@reduxjs/toolkit';
import mainReducer from '../reduce/index';
console.log('is working');
const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state.favorites);
    localStorage.setItem('favorites', serializedState);
  } catch (e) {
    console.warn('Impossibile salvare su localStorage', e);
  }
};

const store = configureStore({
  reducer: mainReducer,
});

store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

export default store;
