// src/redux/reducers/mainReducer.js
import { combineReducers } from 'redux';
import favoriteReducer from './favoriteReducer';
import searchReducer from './searchReducer';
const mainReducer = combineReducers({
  favorites: favoriteReducer,
  search: searchReducer,
});

export default mainReducer;
