import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, filter, interval, map, mergeMap, of, switchMap, takeUntil, tap, withLatestFrom } from 'rxjs';
import { WEATHER_CONSTANTS } from '../../constants/weather.constants';
import { LocationService } from '../../location.service';
import { WeatherService } from '../../weather.service';
import {
  addZipcode,
  addZipcodeFailure,
  addZipcodeSuccess,
  getZipcodesFromLocalStorage,
  removeZipcode,
  removeZipcodeSuccess,
  startPolling,
  stopPolling,
} from '../actions/weather.actions';
import { selectConditionByIndex, selectZipcodes } from '../selectors/weather.selectors';

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
      map(({ conditionsAndZip }) => startPolling({ zipcode: conditionsAndZip.zip }))
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

  startPolling$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(startPolling),
        mergeMap(({ zipcode }) =>
          interval(WEATHER_CONSTANTS.REFRESH_TIME)
            .pipe(
              takeUntil(
                this.actions$.pipe(
                  ofType(stopPolling),
                  filter((z) => zipcode === z.zipcode),
                  tap((z) => console.log('Stop polling: ', z.zipcode))
                )
              )
            )
            .pipe(tap(() => console.log('Poll: ', zipcode)))
        )
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
