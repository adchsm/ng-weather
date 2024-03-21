import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { addLocation, removeLocation } from '../store/actions/weather.actions';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
})
export class MainPageComponent {
  protected testTabs: { title: string; content: string }[] = [
    { title: 'Tab 1', content: 'Lets test out tab usage in a different way' },
    { title: 'Tab 2', content: 'Content for the second tab' },
    { title: 'Tab 3', content: 'Content for the third tab' },
  ];
  constructor(private store: Store) {}

  protected addLocation(location: string): void {
    this.store.dispatch(addLocation({ location }));
  }

  protected removeLocation(location: string): void {
    this.store.dispatch(removeLocation({ location }));
  }

  protected testRemoveTab(title: string): void {
    this.testTabs = this.testTabs.filter((t) => t.title !== title);
  }
}
