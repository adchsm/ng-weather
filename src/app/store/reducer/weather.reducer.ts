import { createReducer, on } from '@ngrx/store';
import { WeatherState } from '../../models/weather.models';
import { addZipcodeSuccess, removeZipcodeSuccess } from '../actions/weather.actions';

export const initialState: WeatherState = {
  conditionsAndZips: [],
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
  })
);
