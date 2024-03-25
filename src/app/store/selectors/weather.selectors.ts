import { createSelector } from '@ngrx/store';
import { WeatherState } from '../../models/weather.models';

/**
 * State
 */

export const selectWeather = (state: any): WeatherState => state.weather;

/**
 * Conditions
 */

export const selectConditions = createSelector(selectWeather, (state) => state?.conditionsAndZips);
export const selectZipcodes = createSelector(selectConditions, (state) => state.map((x) => x.zip));
export const selectConditionByIndex = (index: number) => createSelector(selectConditions, (state) => state[index]);

/**
 * Forecasts
 */

export const selectForecasts = createSelector(selectWeather, (state) => state?.forecasts);
export const selectForecastByZip = (zipcode: string) =>
  createSelector(selectForecasts, (state) => state.find((f) => f.zip === zipcode));

/**
 * Config
 */

export const selectConfig = createSelector(selectWeather, (state) => state?.config);
export const selectRefreshTime = createSelector(selectConfig, (state) => state?.refreshTime);

/**
 * Combined
 */

export const selectZipcodesAndRefreshTime = createSelector(selectWeather, (state) => {
  const zipcodes = state.conditionsAndZips.map((x) => x.zip);
  const refreshTime = state.config.refreshTime;

  return { zipcodes, refreshTime };
});

export const selectForecastByZipAndRefreshTime = (zipcode: string) =>
  createSelector(selectWeather, (state) => {
    const forecast = state.forecasts.find((f) => f.zip === zipcode);
    const refreshTime = state.config.refreshTime;

    return { forecast, refreshTime };
  });
