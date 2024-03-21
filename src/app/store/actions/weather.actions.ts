import { createAction, props } from '@ngrx/store';
import { ConditionsAndZip } from '../../conditions-and-zip.type';
import { WEATHER_CONSTANTS } from '../../constants/weather.constants';

export const getZipcodesFromLocalStorage = createAction(
  `[${WEATHER_CONSTANTS.STORE_KEY}] get zipcodes from local storage`
);

export const addZipcode = createAction(`[${WEATHER_CONSTANTS.STORE_KEY}] add zipcode`, props<{ zipcode: string }>());

export const addZipcodeSuccess = createAction(
  `[${WEATHER_CONSTANTS.STORE_KEY}] add zipcode success`,
  props<{ conditionsAndZip: ConditionsAndZip }>()
);

export const addZipcodeFailure = createAction(
  `[${WEATHER_CONSTANTS.STORE_KEY}] add zipcode failure`,
  props<{ error: any }>()
);

export const removeZipcode = createAction(
  `[${WEATHER_CONSTANTS.STORE_KEY}] remove zipcode`,
  props<{ index: number }>()
);

export const removeZipcodeSuccess = createAction(`[${WEATHER_CONSTANTS.STORE_KEY}] remove zipcode success`);
