import { Filter } from "./../filter-bar/filter";

export class Tab {

    constructor(
        private name: string,
        private named = true,
        private filter?: Filter
    ) {
        if (!filter) {
            this.filter = new Filter(
                true,
                "",
                "",
                {
                    expanded: true,
                    options: [
                        "Todos os dias",
                        "Hoje",
                        "Semana passada",
                        "Últimos 30 dias",
                        "Últimos 90 dias",
                        "1 ano atrás"
                    ],
                    display: "Todos os dias",
                    selected: [-1, 0]
                },
                {
                    expanded: true,
                    none: false,
                    options: [
                        ["Para Laudar", true],
                        ["Para Revisar", true],
                        ["Ditafone", true],
                        ["Manuscrito", true],
                        ["Externo", true],
                        ["Entregue", true],
                        ["Cancelado", true]
                    ],
                    selected: []
                },
                {
                    expanded: true,
                    none: false,
                    options: [
                        ["Copa D'or", true],
                        ["Copa Star", true],
                        ["Barra D'or", true],
                        ["Rios D'or", true]
                    ],
                    selected: []
                },
                {
                    expanded: true,
                    none: false,
                    options: [
                        ["CT", true],
                        ["MR", true],
                        ["US", true],
                        ["NM", true],
                        ["XA", true],
                        ["CR", true],
                        ["MG", true],
                        ["OT", true]
                    ],
                    selected: []
                }
            ) // Close Filter constructor
        }
    } // Close Tab constructor

    getName(): string {
        return this.name;
    }

    getFilter(): Filter {
        return this.filter;
    }

    getNamed() {
        return this.named;
    }

    setName(name: string) {
        this.name = name;
        this.named = true;
    }

}