import { createSelector } from '@ngrx/store';
import { WeatherState } from '../../models/weather.models';

export const selectWeather = (state: any): WeatherState => state.weather;
export const selectConditions = createSelector(selectWeather, (state) => state?.conditionsAndZips);
export const selectForecasts = createSelector(selectWeather, (state) => state?.forecasts);

export const selectZipcodes = createSelector(selectConditions, (state) => state.map((x) => x.zip));

export const selectConditionByIndex = (index: number) => createSelector(selectConditions, (state) => state[index]);

export const selectForecastByZip = (zipcode: string) =>
  createSelector(selectForecasts, (state) => state.find((f) => f.zip === zipcode));
