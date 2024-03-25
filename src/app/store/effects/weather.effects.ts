import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { differenceInMilliseconds } from 'date-fns';
import { catchError, filter, interval, map, mergeMap, of, switchMap, takeUntil, tap, withLatestFrom } from 'rxjs';
import { LocationService } from '../../services/location.service';
import { WeatherService } from '../../services/weather.service';
import {
  addZipcode,
  addZipcodeFailure,
  addZipcodeSuccess,
  getForecast,
  getForecastFailure,
  getForecastSuccess,
  getZipcodesFromLocalStorage,
  removeZipcode,
  removeZipcodeSuccess,
  startPolling,
  stopPolling,
  updateRefreshTime,
  updateZipcode,
  updateZipcodeFailure,
  updateZipcodeSuccess,
} from '../actions/weather.actions';
import {
  selectConditionByIndex,
  selectForecastByZipAndRefreshTime,
  selectRefreshTime,
  selectZipcodes,
  selectZipcodesAndRefreshTime,
} from '../selectors/weather.selectors';

@Injectable()
export class WeatherEffects {
  getInitialWeatherConditions$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getZipcodesFromLocalStorage),
        tap(() => {
          const zipcodes = this.locationService.getLocalStorage();
          zipcodes.forEach((zipcode) => {
            this.store.dispatch(addZipcode({ zipcode }));
          });
        })
      ),
    {
      dispatch: false,
    }
  );

  addZipcode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addZipcode),
      withLatestFrom(this.store.select(selectZipcodes)),
      tap(([{ zipcode }, zipcodes]) => {
        if (zipcodes.includes(zipcode)) {
          alert(`Already tracking ${zipcode}`);
        }
      }),
      filter(([{ zipcode }, zipcodes]) => !zipcodes.includes(zipcode)),
      mergeMap(([{ zipcode }, zipcodes]) =>
        this.weatherService.getCurrentConditions(zipcode).pipe(
          map((data) => addZipcodeSuccess({ conditionsAndZip: { zip: zipcode, data } })),
          catchError((error) => of(addZipcodeFailure({ error })))
        )
      )
    )
  );

  updateZipcode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateZipcode),
      mergeMap(({ zipcode }) =>
        this.weatherService.getCurrentConditions(zipcode).pipe(
          map((data) => updateZipcodeSuccess({ conditionsAndZip: { zip: zipcode, data } })),
          catchError((error) => of(updateZipcodeFailure({ error })))
        )
      )
    )
  );

  updateLocalStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addZipcodeSuccess, removeZipcodeSuccess),
        withLatestFrom(this.store.select(selectZipcodes)),
        tap(([action, zipcodes]) => this.locationService.updateLocalStorage(zipcodes))
      ),
    { dispatch: false }
  );

  mapAddToStartPolling = createEffect(() =>
    this.actions$.pipe(
      ofType(addZipcodeSuccess),
      withLatestFrom(this.store.select(selectRefreshTime)),
      map(([{ conditionsAndZip }, refreshTime]) => startPolling({ zipcode: conditionsAndZip.zip, refreshTime }))
    )
  );

  mapRemoveToStartPolling = createEffect(() =>
    this.actions$.pipe(
      ofType(removeZipcode),
      concatLatestFrom(({ index }) => this.store.select(selectConditionByIndex(index))),
      switchMap(([{ index }, conditionsAndZip]) => [
        removeZipcodeSuccess({ index }),
        stopPolling({ zipcode: conditionsAndZip.zip }),
      ])
    )
  );

  startPolling$ = createEffect(() =>
    this.actions$.pipe(
      ofType(startPolling),
      tap(({ zipcode, refreshTime }) => console.log(`Start polling ${zipcode} every ${refreshTime}ms`)),
      mergeMap(({ zipcode, refreshTime }) =>
        interval(refreshTime)
          .pipe(
            takeUntil(
              this.actions$.pipe(
                ofType(stopPolling),
                filter((z) => zipcode === z.zipcode),
                tap((z) => console.log(`Stop polling ${z.zipcode} `))
              )
            ),
            map(() => updateZipcode({ zipcode }))
          )
          .pipe(tap(() => console.log(`Polling ${zipcode}`)))
      )
    )
  );

  getForecast$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getForecast),
      concatLatestFrom(({ zipcode }) => this.store.select(selectForecastByZipAndRefreshTime(zipcode))),
      tap(([{ zipcode }, { forecast, refreshTime }]) => console.log({ zipcode, forecast, refreshTime })),
      filter(([{ zipcode }, { forecast, refreshTime }]) => {
        if (!forecast) {
          // We don't have this forecast yet, pass the filter
          return true;
        } else {
          // We already have this forecast, was the cache time greater time ago than the refresh time?
          return differenceInMilliseconds(new Date(), forecast?.cacheTime) > refreshTime;
        }
      }),
      tap(([{ zipcode }, forecast]) => console.log(`No cached data, or cache expired for ${zipcode}`)),
      mergeMap(([{ zipcode }, forecast]) =>
        this.weatherService.getForecast(zipcode).pipe(
          map((data) => getForecastSuccess({ forecastAndZip: { zip: zipcode, data, cacheTime: new Date() } })),
          catchError((error) => of(getForecastFailure({ error })))
        )
      )
    )
  );

  updateRefreshTime$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateRefreshTime),
        withLatestFrom(this.store.select(selectZipcodesAndRefreshTime)),
        tap(([action, { zipcodes, refreshTime }]) => {
          (zipcodes ?? []).forEach((zipcode) => {
            this.store.dispatch(stopPolling({ zipcode }));
            this.store.dispatch(startPolling({ zipcode, refreshTime }));
          });
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private locationService: LocationService,
    private weatherService: WeatherService,
    private store: Store
  ) {}
}
