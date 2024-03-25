import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { combineLatest, debounceTime, take } from 'rxjs';
import { updateRefreshTime } from '../../store/actions/weather.actions';
import { selectRefreshTime } from '../../store/selectors/weather.selectors';

@Component({
  selector: 'app-test-area',
  templateUrl: './test-area.component.html',
  styleUrl: './test-area.component.css',
})
export class TestAreaComponent {
  protected testTabs: { title: string; content: string }[] = [
    { title: 'Tab 1', content: 'Lets test out tab usage in a different way' },
    { title: 'Tab 2', content: 'Content for the second tab' },
    { title: 'Tab 3', content: 'Content for the third tab' },
  ];

  protected form: FormGroup = this.formBuilder.group({
    refreshTime: [null, [Validators.required, Validators.min(2000)]],
  });

  constructor(private store: Store, private formBuilder: FormBuilder) {
    this.store
      .select(selectRefreshTime)
      .pipe(take(1))
      .subscribe((value) => {
        this.form.controls.refreshTime.setValue(value);
        this.form.controls.refreshTime.updateValueAndValidity();
      });

    combineLatest([this.form.controls.refreshTime.valueChanges, this.form.controls.refreshTime.statusChanges])
      .pipe(takeUntilDestroyed(), debounceTime(1000))
      .subscribe(([refreshTime, status]) => {
        if (status === 'VALID') {
          this.store.dispatch(updateRefreshTime({ refreshTime }));
        }
      });
  }

  protected testRemoveTab(index: number): void {
    this.testTabs.splice(index, 1);
  }
}
