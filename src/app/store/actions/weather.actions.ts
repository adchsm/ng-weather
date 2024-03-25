import { createAction, props } from '@ngrx/store';
import { WEATHER_CONSTANTS } from '../../constants/weather.constants';
import { ConditionsAndZip } from '../../models/conditions-and-zip.type';
import { ForecastAndZip } from '../../models/weather.models';

/**
 * Conditions
 */

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

export const removeZipcodeSuccess = createAction(
  `[${WEATHER_CONSTANTS.STORE_KEY}] remove zipcode success`,
  props<{ index: number }>()
);

export const updateZipcode = createAction(
  `[${WEATHER_CONSTANTS.STORE_KEY}] update zipcode`,
  props<{ zipcode: string }>()
);

export const updateZipcodeSuccess = createAction(
  `[${WEATHER_CONSTANTS.STORE_KEY}] update zipcode success`,
  props<{ conditionsAndZip: ConditionsAndZip }>()
);

export const updateZipcodeFailure = createAction(
  `[${WEATHER_CONSTANTS.STORE_KEY}] update zipcode failure`,
  props<{ error: any }>()
);

/**
 * Polling
 */

export const startPolling = createAction(
  `[${WEATHER_CONSTANTS.STORE_KEY}] start polling`,
  props<{ zipcode: string }>()
);

export const stopPolling = createAction(`[${WEATHER_CONSTANTS.STORE_KEY}] stop polling`, props<{ zipcode: string }>());

/**
 * Forecasts
 */

export const getForecast = createAction(`[${WEATHER_CONSTANTS.STORE_KEY}] get forecast`, props<{ zipcode: string }>());

export const getForecastSuccess = createAction(
  `[${WEATHER_CONSTANTS.STORE_KEY}] get forecast success`,
  props<{ forecastAndZip: ForecastAndZip }>()
);

export const getForecastFailure = createAction(
  `[${WEATHER_CONSTANTS.STORE_KEY}] get forecast failure`,
  props<{ error: any }>()
);
