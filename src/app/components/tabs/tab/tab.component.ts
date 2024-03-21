import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.css',
})
export class TabComponent {
  @Input() title: string = '';
  active: boolean = false;
}
