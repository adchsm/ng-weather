import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { exhaustMap, map, tap, withLatestFrom } from 'rxjs';
import { LocationService } from '../../location.service';
import { WeatherService } from '../../weather.service';
import {
  addLocation,
  getLocationsFromLocalStorage,
  getLocationsFromLocalStorageSuccess,
  removeLocation,
} from '../actions/weather.actions';
import { selectLocations } from '../selectors/weather.selectors';

@Injectable()
export class WeatherEffects {
  getLocationsFromLocalStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getLocationsFromLocalStorage),
      exhaustMap(() =>
        this.locationService.getLocations().pipe(map((locations) => getLocationsFromLocalStorageSuccess({ locations })))
      )
    )
  );

  getInitialWeatherConditions$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getLocationsFromLocalStorageSuccess),
        tap(({ locations }) => {
          // NOTE: Further improvements could see the weather service data being managed by the store
          locations.forEach((location) => this.weatherService.addCurrentConditions(location));
        })
      ),
    { dispatch: false }
  );

  addLocation$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addLocation),
        tap(({ location }) => {
          this.weatherService.addCurrentConditions(location);
        })
      ),
    { dispatch: false }
  );

  removeLocation$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(removeLocation),
        tap(({ location }) => {
          this.weatherService.removeCurrentConditions(location);
        })
      ),
    { dispatch: false }
  );

  mapAddOrRemoveLocationToUpdateLocalStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addLocation, removeLocation),
        withLatestFrom(this.store.select(selectLocations)),
        tap(([action, locations]) => this.locationService.updateLocalStorage(locations))
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
