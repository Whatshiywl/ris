import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Filter } from "./../filter-bar/filter";
import { Tab } from "./tab";

@Component({
  selector: 'ris-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {
  tabs: Tab[];
  selectedTab = 0;
  @Output() notifyTabClick: EventEmitter<Tab> = new EventEmitter<Tab>();

  constructor() { }

  ngOnInit() {
    this.tabs = [
      new Tab("Todos"),
      new Tab("Minhas Atividades"),
      new Tab("Emergência"),
      new Tab("Vence hoje")
    ];
    this.onTabClick(1);
  }

  onTabClick(index: number) {
    this.tabs[this.selectedTab].getFilter().closeAll();
    this.selectedTab = index;
    this.notifyTabClick.emit(this.tabs[index]);
  }

  addTab() {
    if(!this.tabs[this.tabs.length-1].getNamed()) return;
    this.tabs.push(new Tab("", false));
    this.onTabClick(this.tabs.length-1);
  }

  closeTab(index: number) {
    this.tabs.splice(index, 1);
    if(index===this.tabs.length) index--;
    this.onTabClick(index);
  }

  onTabNaming(tab: Tab, name: string) { 
    tab.setName(name);
  }

}
