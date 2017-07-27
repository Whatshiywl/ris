import { Component, OnInit } from '@angular/core';
import { SelectedFilter } from "./../filter-bar/selected-filter";
import { Task } from "./../task-list/task";
import { FilterService } from "./../../services/filter.service";

@Component({
  selector: 'ris-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  taskList: Task[];

  constructor(private filterService: FilterService) { }

  ngOnInit() {
    this.taskList = this.filterService.fetchTaskList();
  }

  onFilterChange(filter: SelectedFilter) {
    setTimeout(() => this.taskList = this.filterService.fetchTaskList(filter), 0);
    // this.filterService.fetchTaskList(filter).subscribe(tasks => this.taskList = tasks);
  }

}
