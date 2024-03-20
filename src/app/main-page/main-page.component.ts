import { Component, OnInit, inject } from '@angular/core';
import { LocationService } from '../location.service';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
})
export class MainPageComponent implements OnInit {
  private weatherService = inject(WeatherService);
  private locationService = inject(LocationService);
  protected locations = this.locationService.getLocations();

  public ngOnInit(): void {
    this.locations().forEach((zipcode) => this.weatherService.addCurrentConditions(zipcode));
  }

  addLocation(zipcode: string): void {
    this.locationService.addLocation(zipcode);
    this.weatherService.addCurrentConditions(zipcode);
  }

  removeLocation(zipcode: string): void {
    this.locationService.removeLocation(zipcode);
    this.weatherService.removeCurrentConditions(zipcode);
  }
}
