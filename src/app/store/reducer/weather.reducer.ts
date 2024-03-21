import { createReducer, on } from '@ngrx/store';
import { WeatherState } from '../../models/weather.models';
import { addLocation, getLocationsFromLocalStorageSuccess, removeLocation } from '../actions/weather.actions';

export const initialState: WeatherState = {
  locations: [],
};

export const weatherReducer = createReducer(
  initialState,
  on(getLocationsFromLocalStorageSuccess, (state, { locations }) => ({
    ...state,
    locations,
  })),
  on(addLocation, (state, { location }) => ({
    ...state,
    locations: [...state.locations, location],
  })),
  on(removeLocation, (state, { location }) => ({
    ...state,
    locations: [...state.locations.filter((l) => l !== location)],
  }))
);
