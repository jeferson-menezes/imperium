import { QTableColumn } from "quasar";

const columnsConta: QTableColumn[] = [
    {
        label: "",
        name: "tipoContaIcone",
        align: "left",
        field: "tipoContaIcone",
        sortable: false
    },
    {
        label: "Nome",
        name: "nome",
        align: "left",
        field: "nome",
        sortable: true
    },
    {
        label: "Descrição",
        name: "descricao",
        align: "left",
        field: "descricao",
        sortable: true
    },
    {
        label: "Saldo",
        name: "saldo",
        align: "left",
        field: "saldo",
        sortable: true
    },
    {
        label: "Categoria",
        name: "tipoContaNome",
        align: "left",
        field: "tipoContaNome",
        sortable: true
    },
    {
        label: "Ativa",
        name: "ativo",
        align: "left",
        field: "ativo",
        sortable: true
    },
    {
        label: "Ações",
        name: "acoes",
        align: "center",
        field: "acoes",
        sortable: false
    }
];

const columnsCategoria: QTableColumn[] = [
    {
        label: "",
        name: "icone",
        align: "left",
        field: "icone",
        sortable: false
    },
    {
        label: "Nome",
        name: "nome",
        align: "left",
        field: "nome",
        sortable: true
    },
    {
        label: "Descrição",
        name: "descricao",
        align: "left",
        field: "descricao",
        sortable: true
    },
    {
        label: "Natureza",
        name: "natureza",
        align: "left",
        field: "natureza",
        sortable: true
    },
    {
        label: "Ativa",
        name: "ativo",
        align: "left",
        field: "ativo",
        sortable: true
    },
    {
        label: "Ações",
        name: "acoes",
        align: "center",
        field: "acoes",
        sortable: false
    }
];

export { columnsConta, columnsCategoria };
