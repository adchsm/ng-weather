import { ConditionsAndZip } from './conditions-and-zip.type';
import { Forecast } from './forecast.type';

export interface WeatherState {
  conditionsAndZips: ConditionsAndZip[];
  forecasts: ForecastAndZip[];
  config: {
    refreshTime: number;
  };
}

export interface ForecastAndZip {
  data: Forecast;
  cacheTime: Date;
  zip: string;
}
