import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, filter, map, mergeMap, of, tap, withLatestFrom } from 'rxjs';
import { LocationService } from '../../location.service';
import { WeatherService } from '../../weather.service';
import {
  addZipcode,
  addZipcodeFailure,
  addZipcodeSuccess,
  getZipcodesFromLocalStorage,
  removeZipcode,
} from '../actions/weather.actions';
import { selectZipcodes } from '../selectors/weather.selectors';

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
        ofType(addZipcodeSuccess, removeZipcode),
        withLatestFrom(this.store.select(selectZipcodes)),
        tap(([action, zipcodes]) => this.locationService.updateLocalStorage(zipcodes))
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
