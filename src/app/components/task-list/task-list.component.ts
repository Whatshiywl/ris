import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Task } from "./task";
import * as moment from "moment";

@Component({
  selector: 'ris-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  host: {
    '(document:click)': 'onHostClick($event)'
  }
})
export class TaskListComponent implements OnInit, OnChanges {
  columns = [
    ["ATENDIMENTO", true, 177.75, "ID"],
    ["PACIENTE", true, 177.75, "patient"],
    ["MÉDICO SOLICITANTE", true, 177.75, "medic"],
    ["DATA (Registro)", true, 177.75, "dateReg"],
    ["DATA (Realização)", true, 177.75, "dateDone"],
    ["MOD.", true, 177.75, "mod"],
    ["EXAME", true, 177.75, "exam"],
    ["STATUS", true, 177.75, "status"],
    ["SETOR", true, 177.75, "sector"],
  ];

  @Input() taskList: Task[];

  colSelect = false;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){
  }

  onHostClick(event) {
    let element = document.getElementById("col-select");
    if(this.colSelect && !element.contains(event.target)){
      element.style.display = "none";
      this.colSelect = false;
    }
  }

  showColSelect(event) {
    let element = document.getElementById("col-select");
    if(!this.colSelect){
      element.style.display = "block";
      element.style.left = (event.pageX-5) + "px";
      element.style.top = (event.pageY-5) + "px";
    } else {
      element.style.display = "none";
    }
    this.colSelect = !this.colSelect;
    event.stopPropagation(); // Don't pass to host
  }

  dateToString(date: Date) {
    let momDate = moment(date);
    return momDate.format("DD/MM/YYYY - H:mm") + "h";
  }

  closeWarning() {
    let element = document.getElementById("warning");
    element.style.display = "none";
  }

  log(str: string){
    console.log(str);
  }

}
