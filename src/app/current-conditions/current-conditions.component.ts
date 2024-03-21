import { Component, EventEmitter, inject, Output, Signal } from '@angular/core';
import { Router } from '@angular/router';
import { ConditionsAndZip } from '../conditions-and-zip.type';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-current-conditions',
  templateUrl: './current-conditions.component.html',
  styleUrls: ['./current-conditions.component.css'],
})
export class CurrentConditionsComponent {
  @Output() locationRemoved: EventEmitter<string> = new EventEmitter();
  private weatherService = inject(WeatherService);
  private router = inject(Router);
  protected currentConditionsByZip: Signal<ConditionsAndZip[]> = this.weatherService.getCurrentConditions();

  showForecast(zipcode: string) {
    this.router.navigate(['/forecast', zipcode]);
  }

  protected removeLocation(title: string): void {
    const location = this.currentConditionsByZip().find((l) => title.includes(l.zip));
    this.locationRemoved.emit(location.zip);
  }
}
