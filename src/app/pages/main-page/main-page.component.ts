import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ConditionsAndZip } from '../../models/conditions-and-zip.type';
import { addZipcode, removeZipcode } from '../../store/actions/weather.actions';
import { selectConditions } from '../../store/selectors/weather.selectors';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
})
export class MainPageComponent {
  protected currentConditionsByZip$: Observable<ConditionsAndZip[]> = this.store.select(selectConditions);

  protected testTabs: { title: string; content: string }[] = [
    { title: 'Tab 1', content: 'Lets test out tab usage in a different way' },
    { title: 'Tab 2', content: 'Content for the second tab' },
    { title: 'Tab 3', content: 'Content for the third tab' },
  ];

  constructor(private store: Store) {}

  protected addLocation(zipcode: string): void {
    this.store.dispatch(addZipcode({ zipcode }));
  }

  protected removeLocation(index: number): void {
    this.store.dispatch(removeZipcode({ index }));
  }

  protected testRemoveTab(index: number): void {
    this.testTabs.splice(index, 1);
  }
}
