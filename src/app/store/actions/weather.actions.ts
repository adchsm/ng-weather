import { createAction, props } from '@ngrx/store';
import { WEATHER_CONSTANTS } from '../../constants/weather.constants';

export const getLocationsFromLocalStorage = createAction(`[${WEATHER_CONSTANTS.STORE_KEY}] get locations`);

export const getLocationsFromLocalStorageSuccess = createAction(
  `[${WEATHER_CONSTANTS.STORE_KEY}] get locations success`,
  props<{ locations: string[] }>()
);

export const addLocation = createAction(`[${WEATHER_CONSTANTS.STORE_KEY}] add location`, props<{ location: string }>());

export const removeLocation = createAction(
  `[${WEATHER_CONSTANTS.STORE_KEY}] remove location`,
  props<{ location: string }>()
);
