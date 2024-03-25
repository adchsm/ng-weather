import { Injectable } from '@angular/core';

export const LOCATIONS: string = 'locations';

@Injectable()
export class LocationService {
  updateLocalStorage(locations: string[]): void {
    localStorage.setItem(LOCATIONS, JSON.stringify(locations));
  }

  getLocalStorage(): string[] {
    const locString = localStorage.getItem(LOCATIONS);
    const locations: string[] = [...(locString ? [...JSON.parse(locString)] : [])];
    return locations;
  }
}
