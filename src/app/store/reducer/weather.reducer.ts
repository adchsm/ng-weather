import { createReducer, on } from '@ngrx/store';
import { WeatherState } from '../../models/weather.models';
import {
  addZipcodeSuccess,
  getForecastSuccess,
  removeZipcodeSuccess,
  updateZipcodeSuccess,
} from '../actions/weather.actions';

export const initialState: WeatherState = {
  conditionsAndZips: [],
  forecasts: [],
};

export const weatherReducer = createReducer(
  initialState,
  on(addZipcodeSuccess, (state, { conditionsAndZip }) => ({
    ...state,
    conditionsAndZips: [...state.conditionsAndZips, conditionsAndZip],
  })),
  on(removeZipcodeSuccess, (state, { index }) => {
    const conditionsAndZips = [...state.conditionsAndZips];
    conditionsAndZips.splice(index, 1);
    return { ...state, conditionsAndZips };
  }),
  on(updateZipcodeSuccess, (state, { conditionsAndZip }) => {
    const conditionsAndZips = [...state.conditionsAndZips];
    const index = conditionsAndZips.findIndex((c) => c.zip === conditionsAndZip.zip);
    conditionsAndZips.splice(index, 1, conditionsAndZip);
    return { ...state, conditionsAndZips };
  }),
  on(getForecastSuccess, (state, { forecastAndZip }) => {
    const forecasts = [...state.forecasts];
    const index = forecasts.findIndex((c) => c.zip === forecastAndZip.zip);

    if (index >= 0) {
      forecasts.splice(index, 1, forecastAndZip);
    } else {
      forecasts.push(forecastAndZip);
    }

    return { ...state, forecasts };
  })
);
