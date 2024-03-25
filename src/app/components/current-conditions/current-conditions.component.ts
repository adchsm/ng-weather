import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ConditionsAndZip } from '../../models/conditions-and-zip.type';
import { WeatherService } from '../../weather.service';

@Component({
  selector: 'app-current-conditions',
  templateUrl: './current-conditions.component.html',
  styleUrls: ['./current-conditions.component.css'],
})
export class CurrentConditionsComponent {
  @Input() currentConditionsByZip: ConditionsAndZip[] = [];
  @Output() zipcodeRemoved: EventEmitter<number> = new EventEmitter();

  private router = inject(Router);
  protected weatherService = inject(WeatherService);

  showForecast(zipcode: string) {
    this.router.navigate(['/forecast', zipcode]);
  }

  protected removeZipcode(index: number): void {
    this.zipcodeRemoved.emit(index);
  }
}
