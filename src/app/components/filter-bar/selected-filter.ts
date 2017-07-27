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
}