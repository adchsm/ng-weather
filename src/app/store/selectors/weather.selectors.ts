import { createSelector } from '@ngrx/store';
import { WeatherState } from '../../models/weather.models';

export const selectWeather = (state: any): WeatherState => state.weather;
export const selectConditions = createSelector(selectWeather, (state) => state?.conditionsAndZips);
export const selectZipcodes = createSelector(selectConditions, (state) => state.map((x) => x.zip));
