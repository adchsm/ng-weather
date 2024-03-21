import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ConditionsAndZip } from '../conditions-and-zip.type';
import { selectConditions } from '../store/selectors/weather.selectors';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-current-conditions',
  templateUrl: './current-conditions.component.html',
  styleUrls: ['./current-conditions.component.css'],
})
export class CurrentConditionsComponent {
  @Output() zipcodeRemoved: EventEmitter<number> = new EventEmitter();

  private router = inject(Router);
  protected currentConditionsByZip$: Observable<ConditionsAndZip[]> = this.store.select(selectConditions);
  protected weatherService = inject(WeatherService);

  constructor(private store: Store) {}

  showForecast(zipcode: string) {
    this.router.navigate(['/forecast', zipcode]);
  }

  protected removeZipcode(index: number): void {
    this.zipcodeRemoved.emit(index);
  }
}
