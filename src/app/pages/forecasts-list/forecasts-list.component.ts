import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { Forecast } from '../../models/forecast.type';
import { getForecast } from '../../store/actions/weather.actions';
import { selectForecastByZip } from '../../store/selectors/weather.selectors';
import { WeatherService } from '../../weather.service';

@Component({
  selector: 'app-forecasts-list',
  templateUrl: './forecasts-list.component.html',
  styleUrls: ['./forecasts-list.component.css'],
})
export class ForecastsListComponent implements OnInit {
  @Input() zipcode: string; // This is now obtained from the route params
  protected forecast$: Observable<Forecast> | null = null;

  constructor(protected weatherService: WeatherService, private store: Store) {}

  public ngOnInit(): void {
    // Improvement: we could move this to the store, utilising the router store to obtain the params for both the dispatch and selector
    this.store.dispatch(getForecast({ zipcode: this.zipcode }));
    this.forecast$ = this.store.select(selectForecastByZip(this.zipcode)).pipe(map((x) => x?.data));
  }
}
