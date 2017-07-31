import { Task } from "./../../components/task-list/task";
import * as moment from "moment";

export class SelectedFilter {
    constructor(
        private apply?: boolean,
        private text?: string,
        private data?: Date[],
        private status?: string[],
        private unidades?: string[],
        private modalidade?: string[]
    ) {}

    setApply(apply: boolean){
        this.apply = apply;
    }

    setText(text: string){
        this.text = text;
    }

    setData(data: Date[]){
        this.data = data;
    }

    setStatus(status: string[]){
        this.status = status;
    }

    setUnidades(unidades: string[]){
        this.unidades = unidades;
    }

    setModalidade(modalidade: string[]){
        this.modalidade = modalidade;
    }

    applyFilter(task: Task) {
        if(this.text){
        let text = this.text.toLowerCase();
        if((task["patient"].toLowerCase().indexOf(text) === -1) 
        &&(task["medic"].toLowerCase().indexOf(text) === -1) 
        &&(task["prontuario"].toLowerCase().indexOf(text) === -1) 
        &&(task["exam"].toLowerCase().indexOf(text) === -1) 
        &&(task["ID"].toString().indexOf(text) === -1)) return false;
      }
      if(!this.apply) return true;
      if(this.data.length>0){
        let startDate = moment(this.data[0]);
        let endDate = moment(this.data[1]);
        let date = moment(task["dateReg"]);
        if(!date.isBetween(startDate, endDate, "days", "[]")) return false;
      }
      if(this.status.indexOf(task["status"]) === -1) return false;
      if(this.unidades.indexOf(task["unity"]) === -1) return false;
      if(this.modalidade.indexOf(task["mod"]) === -1) return false;
      return true;
    }
}