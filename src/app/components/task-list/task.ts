export class Task {

    constructor(
        private ID: number,
        private patient: string,
        private medic: string,
        private dateReg: Date,
        private dateDone: Date,
        private mod: string,
        private exam: string,
        private status: string,
        private sector: string,
        private unity: string,
        private prontuario: string
    ){ }

    getBgColor() {
        switch(this.status) {
            case "Para Laudar": return "#d9d9ff";
            case "Para Revisar": return "#d9f7d9";
            case "Ditafone": return "#ffd9ff";
            case "Manuscrito": return "#ecd9ec";
            case "Externo": return "#d9d9d9";
            case "Entregue":
            case "Cancelado": return "#f2f2f2";
        }
    }

    getFontColor() {
        if(this.status === "Entregue" || this.status === "Cancelado") return "#999999";
        else return "#666666";
    }

}