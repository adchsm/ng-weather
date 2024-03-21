import { createSelector } from '@ngrx/store';
import { WeatherState } from '../../models/weather.models';

export const selectWeather = (state: any): WeatherState => state.weather;

export const selectLocations = createSelector(selectWeather, (state) => state?.locations);
