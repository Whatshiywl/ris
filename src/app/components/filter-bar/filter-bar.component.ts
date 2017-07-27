import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { Filter} from "./filter";
import { SelectedFilter } from "./selected-filter";
import { Tab } from "./../tabs/tab";

@Component({
  selector: 'ris-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css'],
  host: {
    '(document:click)': 'onHostClick($event)'
  }
})
export class FilterBarComponent implements OnInit {
  @Input() activeTab: Tab;
  @Output() notifyFilterChange: EventEmitter<SelectedFilter> = new EventEmitter<SelectedFilter>();

  activeFilter: Filter;
  applyFilter = true;
  unityFilter: string;

  filterText: string;

  constructor() { }

  ngOnInit() {
    this.activeFilter.closeAll();
  }

  ngOnChanges() {
    Filter.setComponent(this);
    this.activeFilter = this.activeTab.getFilter();
    this.onFilterChange(); 
  }

  onHostClick($event){
    if(!this.isClickingAnyFilter(event.target)){
      this.activeFilter.closeAll()
    }
  }
  
  onFilterChange(){
    this.activeFilter.setText(this.filterText);
    this.activeFilter.setApply(this.applyFilter);
    let selFilter = this.activeFilter.toSelected();
    this.notifyFilterChange.emit(selFilter);
  }

  onTextSubmit(text: string) {
    //clear text area ?
    this.activeFilter.setText(text);
    this.onFilterChange();
  }

  onUnityFilter(filter: string) {
    this.unityFilter = filter;
  }

  setApplyFilter(apply: boolean){
    this.applyFilter = apply;
    this.onFilterChange();
  }

  isClickingAnyFilter(target: EventTarget) {
    return this.isTargeting("data", target) ||
      this.isTargeting("status", target) ||
      this.isTargeting("unidades", target) ||
      this.isTargeting("modalidade", target);
  }

  isTargeting(id: string, target: any) {
    return document.getElementById(id).contains(target);
  }

  log(str: string){
    console.log(str);
  }

}
