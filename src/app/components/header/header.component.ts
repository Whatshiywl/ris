import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Tab } from "./../tabs/tab";
import { SelectedFilter } from "./../filter-bar/selected-filter";

@Component({
  selector: 'ris-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  selectedTab: Tab;
  @Output() notifyFilterChange: EventEmitter<SelectedFilter> = new EventEmitter<SelectedFilter>();

  constructor() { }
  name = "Dr. Doutor";

  ngOnInit() {
    this.selectedTab = new Tab("Todos");
  }

  onTabClick(tab: Tab) {
    this.selectedTab = tab;
  }

  onFilterChange(filter: SelectedFilter) {
    this.notifyFilterChange.emit(filter);
  }

}
