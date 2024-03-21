import { AfterContentInit, Component, ContentChildren, EventEmitter, Output, QueryList } from '@angular/core';
import { startWith } from 'rxjs';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-tabs-container',
  templateUrl: './tabs-container.component.html',
  styleUrl: './tabs-container.component.css',
})
export class TabsContainerComponent implements AfterContentInit {
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;
  @Output() tabRemoved: EventEmitter<string> = new EventEmitter();

  public ngAfterContentInit(): void {
    this.tabs?.changes.pipe(startWith(this.tabs)).subscribe((tabs: QueryList<TabComponent>) => {
      const hasActiveTab = tabs.find((t) => t.active);

      if (tabs?.length && !hasActiveTab) {
        // TODO: Look into another method of setting the active tab without causing change detection issues
        setTimeout(() => {
          this.selectTab(this.tabs.first.title);
        });
      }
    });
  }

  protected selectTab(title: string): void {
    this.tabs.forEach((t) => (t.active = false));
    const tab = this.tabs.find((t) => t.title === title);
    tab.active = true;
  }

  protected removeTab(title: string): void {
    this.tabRemoved.emit(title);
  }
}
