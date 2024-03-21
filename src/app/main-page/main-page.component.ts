import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { addLocation, removeLocation } from '../store/actions/weather.actions';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
})
export class MainPageComponent {
  constructor(private store: Store) {}

  protected addLocation(location: string): void {
    this.store.dispatch(addLocation({ location }));
  }

  protected removeLocation(location: string): void {
    this.store.dispatch(removeLocation({ location }));
  }
}
