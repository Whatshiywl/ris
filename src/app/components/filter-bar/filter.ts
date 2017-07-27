import { FilterBarComponent } from "./filter-bar.component";
import { SelectedFilter } from "./selected-filter";

import * as moment from "moment";

export class Filter {

    static oneFilterAtATime = false;
    static filterBarComponent: FilterBarComponent;

    constructor(
        private apply: boolean,
        private text: string,
        private expanded: string,
        private data: {
            expanded: boolean,
            options: string[];
            display: string;
            selected: number[]
        },
        private status: {
            expanded: boolean;
            none: boolean;
            options: (string | boolean)[][];
            selected: string[];
        },
        private unidades: {
            expanded: boolean;
            none: boolean;
            options: (string | boolean)[][]
            selected: string[];
        },
        private modalidade: {
            expanded: boolean;
            none: boolean;
            options: (string | boolean)[][]
            selected: string[];
        }
    ) {} 

    static setComponent(component: FilterBarComponent) {
        Filter.filterBarComponent = component;
    }

    isOpen(id: string) {
        return this[id].expanded;
    }

    setOpen(id: string, open: boolean) {
        this[id].expanded = open;
    }

    open(id: string) {
        if(this.isOpen(id)) return;
        let element = document.getElementById(id);
        element.style.display = "block";
        element.style.backgroundColor = "#dadada";
        element.style.padding = "10px";
        this.setOpen(id, true);
        if(!Filter.oneFilterAtATime) return;
        if(this.expanded) this.close(this.expanded);
        this.expanded = id;
    }

    close(id: string) {
        if(!this.isOpen(id)) return;
        let element = document.getElementById(id);
        element.style.display = "none";
        this.setOpen(id, false);
        this.expanded = null;
    }

    openOrClose(id: string, event?: any) {
        if(!this.isOpen(id)) this.open(id);
        else this.close(id);
        if(event) event.stopPropagation();
    }

    closeAll() {
        this.close("data");
        this.close("status");
        this.close("unidades");
        this.close("modalidade");
    }

    getOptions(id: string) {
        return this[id].options;
    }

    setAllOptions(id: string, option: boolean, $event: any) {
        for(let opt of this.getOptions(id)) {
            opt[1] = option;
        }
        this.setNone(id, !option);
        $event.stopPropagation(); // Don't pass to host
        Filter.filterBarComponent.onFilterChange();
    }

    flipOption(filter: string, option: (string | boolean)[]) {
        option[1] = !option[1];
        this.updateNoneSelected(filter);
    }

    isNoneSelected(id: string) {
        for(let option of this.getOptions(id)) {
            if(option[1]) return false;
        }
        return true;
    }

    updateNoneSelected(id: string) {
        this.setNone(id, this.isNoneSelected(id));
        Filter.filterBarComponent.onFilterChange();
    }

    isNone(id: string) {
        return this[id].none;
    }

    setNone(id: string, none: boolean) {
        this[id].none = none;
    }

    getApply() {
        return this.apply;
    }

    setApply(apply: boolean) {
        this.apply = apply;
    }

    getText() {
        return this.text;
    }

    setText(text: string) {
        this.text = text;
    }

    setDateFromOption(option: number) {
        if(option===0) this.setDateRange(-1);
        else if(option===1) this.setDateRange(0);
        else if(option===2) this.setDateRange(7);
        else if(option===3) this.setDateRange(30);
        else if(option===4) this.setDateRange(90);
        else if(option===5) this.setDateRange(365);
        this.data.display = this.data.options[option];
    }

    setDateRange(start: number, end?: number) {
        this.data.selected = [start, end?end:0];
        Filter.filterBarComponent.onFilterChange();
    }

    getDateRange() {
        if(this.data.selected[0]<0) return [];
        let startDate = moment().subtract(this.data.selected[0], "days").startOf("day");
        let endDate = moment().subtract(this.data.selected[1], "days").endOf("day");
        return [startDate.toDate(), endDate.toDate()];
    }

    genSelectedField(id: string) {
        if(id!=="data") {
            this[id].selected = [];
            for(let option of this[id].options) {
                if(option[1]) {
                this[id].selected.push(option[0]);
                }
            }
        }
        return this[id].selected;
    }

    toSelected() {
        let selectedFilter = new SelectedFilter();
        selectedFilter.setText(this.getText());
        selectedFilter.setApply(this.getApply());
        selectedFilter.setData(this.getDateRange());
        selectedFilter.setStatus(this.genSelectedField("status"));
        selectedFilter.setUnidades(this.genSelectedField("unidades"));
        selectedFilter.setModalidade(this.genSelectedField("modalidade"));
        return selectedFilter;
    }



}