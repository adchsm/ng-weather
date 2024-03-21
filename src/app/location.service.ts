import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export const LOCATIONS: string = 'locations';

@Injectable()
export class LocationService {
  updateLocalStorage(locations: string[]): void {
    localStorage.setItem(LOCATIONS, JSON.stringify(locations));
  }

  getLocations(): Observable<string[]> {
    const locString = localStorage.getItem(LOCATIONS);
    const locations: string[] = [...(locString ? [...JSON.parse(locString)] : [])];
    return of(locations);
  }
}
