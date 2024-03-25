import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-zipcode-entry',
  templateUrl: './zipcode-entry.component.html',
})
export class ZipcodeEntryComponent {
  @Output() locationAdded: EventEmitter<string> = new EventEmitter();

  addLocation(zipcode: string) {
    this.locationAdded.emit(zipcode);
  }
}