import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

import { SelectedFilter } from "./../components/filter-bar/selected-filter";
import { Task } from "./../components/task-list/task";

import * as moment from "moment";

@Injectable()
export class FilterService {
  private taskListUrl = "file:///Users/alexandre/Documents/Programming/NodeJS/Projects/ris/src/assets/task-list.json;"//"assets/task-list.json";

  tasks = [
          new Task(
            101010, //ID: number
            "Atua Lamente", //patient: string
            "Dra. Agora do Momento Imediata", //medic: string
            new Date(),//"18/06/2017 - 10:00h", //dateReg: string
            new Date(),//"18/06/2017 - 10:00h", //dateDone: string
            "CT", //mod: string
            "Fazer o exame agora", //exam:string
            "Para Laudar", //status: string
            "Ponto de Atendimento", //sector: string
            "Copa Star", //unity: string
            "Prontuario" //prontuario: string
          ),
          new Task(
            537890, //ID: number
            "Jorge Augustus", //patient: string
            "Dra. Fernanda Fernanda Fernanda", //medic: string
            new Date(2017, 6, 18, 10, 0),//"18/06/2017 - 10:00h", //dateReg: string
            new Date(2017, 6, 18, 10, 0),//"18/06/2017 - 10:00h", //dateDone: string
            "MR", //mod: string
            "Exame exame exame exame exame exame exame exame", //exam:string
            "Para Laudar", //status: string
            "Ponto de Atendimento", //sector: string
            "Barra D'or", //unity: string
            "Prontuario" //prontuario: string
          ),
          new Task(
            354678, //ID: number
            "Cliente Paciente", //patient: string
            "Dr. Gregor de Gregoris Gregoso", //medic: string
            new Date(2017, 6, 18, 8, 30),//"16/06/2017 - 8:30h", //dateReg: string
            new Date(2017, 6, 18, 9, 0),//"16/06/2017 - 9:00h", //dateDone: string
            "CT", //mod: string
            "Outro exame exame exame exame exame exame exame exame", //exam:string
            "Para Revisar", //status: string
            "URC/Matriz", //sector: string
            "Copa Star", //unity: string
            "Prontuario" //prontuario: string
          ),
          new Task(
            354679, //ID: number
            "Alberta Pimpolho", //patient: string
            "Dr. Acicra Acrecica Acicraca", //medic: string
            new Date(2017, 6, 18, 9, 0),//"18/06/2017 - 9:00h", //dateReg: string
            new Date(2017, 6, 18, 9, 5),//"18/06/2017 - 9:05h", //dateDone: string
            "MR", //mod: string
            "Mais um exame exame exame exame exame exame exame exame", //exam:string
            "Ditafone", //status: string
            "Ponto de Atendimento", //sector: string
            "Barra D'or", //unity: string
            "Prontuario" //prontuario: string
          ),
          new Task(
            537493, //ID: number
            "Diego Diogo Mandiogo", //patient: string
            "Dra. Amarilha Amorosa do Amorar", //medic: string
            new Date(2017, 6, 15, 13, 0),//"15/06/2017 - 13:00h", //dateReg: string
            new Date(2017, 6, 15, 13, 50),//"15/06/2017 - 13:50h", //dateDone: string
            "MR", //mod: string
            "Mais outro exame exame exame exame exame exame exame exame", //exam:string
            "Manuscrito", //status: string
            "Ponto de Atendimento", //sector: string
            "Copa D'or", //unity: string
            "Prontuario" //prontuario: string
          ),
          new Task(
            374210, //ID: number
            "Rodriga Rodrigues Gomez Suez de Rodriganiuz", //patient: string
            "Dr. Ned Stark", //medic: string
            new Date(2017, 6, 14, 9, 30),//"14/06/2017 - 9:30h", //dateReg: string
            new Date(2017, 6, 14, 11, 20),//"14/06/2017 - 11:20h", //dateDone: string
            "CT", //mod: string
            "Ainda outro exame exame exame exame exame exame exame exame", //exam:string
            "Externo", //status: string
            "URC/Matriz", //sector: string
            "Rios D'or", //unity: string
            "Prontuario" //prontuario: string
          ),
          new Task(
            501234, //ID: number
            "Fabia Fabiano de Fatima do Fabio Fabinha", //patient: string
            "Dr. Theodore Roosevelt", //medic: string
            new Date(2017, 5, 20, 12, 0),//"20/05/2017 - 12:00h", //dateReg: string
            new Date(2017, 5, 20, 13, 15),//"20/05/2017 - 13:15h", //dateDone: string
            "MR", //mod: string
            "Ainda mais um outro exame exame exame exame exame exame exame exame", //exam:string
            "Entregue", //status: string
            "Ponto de Atendimento", //sector: string
            "Barra D'or", //unity: string
            "Prontuario" //prontuario: string
          ),
          new Task(
            501235, //ID: number
            "Fabia Outro Fabiano de Fatima do Fabio Fabinha", //patient: string
            "Dr. Theodore Roosevelt III", //medic: string
            new Date(1993, 5, 2, 10, 11),//"02/05/1993 - 10:11h", //dateReg: string
            new Date(1993, 5, 2, 10, 11),//"02/05/1993 - 10:11h", //dateDone: string
            "MR", //mod: string
            "Ainda mais um anouther exame exame exame exame exame exame exame exame", //exam:string
            "Entregue", //status: string
            "Ponto de Atendimento", //sector: string
            "Rios D'or", //unity: string
            "Prontuario" //prontuario: string
          )
      ];

  constructor(private http: Http) { }

  fetchTaskList(filter?: SelectedFilter): Task[] {
    // console.log(filter);
    // return [null];
    return filter ? this.tasks.filter((task) => {
      return filter.applyFilter(task);
    }) : this.tasks;
    // return this.http.get(this.taskListUrl)
    //   .map((response: Response) => <Task[]>response.json());
  }

}
