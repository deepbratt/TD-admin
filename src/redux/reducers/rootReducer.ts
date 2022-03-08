import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import carFiltersSlice from './carFiltersSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  carFilters: carFiltersSlice,
});

export default rootReducer;
