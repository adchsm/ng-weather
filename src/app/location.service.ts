import { Injectable, Signal, signal } from '@angular/core';

export const LOCATIONS: string = 'locations';

@Injectable()
export class LocationService {
  private locs = signal<string[]>([]);

  constructor() {
    let locString = localStorage.getItem(LOCATIONS);

    if (locString) {
      this.locs.set(JSON.parse(locString));
    }
  }

  addLocation(zipcode: string) {
    this.locs.update((locations) => [...locations, zipcode]);
    localStorage.setItem(LOCATIONS, JSON.stringify(this.locs()));
  }

  removeLocation(zipcode: string) {
    this.locs.update((locations) => {
      let index = locations.indexOf(zipcode);

      if (index !== -1) {
        locations.splice(index, 1);
      }

      return locations;
    });

    localStorage.setItem(LOCATIONS, JSON.stringify(this.locs()));
  }

  getLocations(): Signal<string[]> {
    return this.locs.asReadonly();
  }
}
