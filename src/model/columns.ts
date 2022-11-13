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

const columnsDespesa: QTableColumn[] = [
    {
        label: "Descrição",
        name: "descricao",
        align: "left",
        field: "descricao",
        sortable: true
    },
    {
        label: "Valor",
        name: "valor",
        align: "left",
        field: "valor",
        sortable: true
    },
    {
        label: "Data",
        name: "data",
        align: "left",
        field: "data",
        sortable: true
    },
    {
        label: "Categoria",
        name: "categoriaNome",
        align: "left",
        field: "categoriaNome",
        sortable: true
    },
    {
        label: "Hora",
        name: "hora",
        align: "left",
        field: "hora",
        sortable: true
    },
    {
        label: "Conta",
        name: "contaNome",
        align: "left",
        field: "contaNome",
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

const columnsReceita: QTableColumn[] = [
    {
        label: "Descrição",
        name: "descricao",
        align: "left",
        field: "descricao",
        sortable: true
    },
    {
        label: "Valor",
        name: "valor",
        align: "left",
        field: "valor",
        sortable: true
    },
    {
        label: "Data",
        name: "data",
        align: "left",
        field: "data",
        sortable: true
    },
    {
        label: "Categoria",
        name: "categoriaNome",
        align: "left",
        field: "categoriaNome",
        sortable: true
    },
    {
        label: "Hora",
        name: "hora",
        align: "left",
        field: "hora",
        sortable: true
    },
    {
        label: "Conta",
        name: "contaNome",
        align: "left",
        field: "contaNome",
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

const columnsAtivo: QTableColumn[] = [
    {
        label: "",
        name: "imagem",
        align: "left",
        field: "imagem",
        sortable: false
    },
    {
        label: "Código",
        name: "codigo",
        align: "left",
        field: "codigo",
        sortable: true
    },
    {
        label: "Nome",
        name: "nome",
        align: "left",
        field: "nome",
        sortable: true
    },
    {
        label: "Tipo",
        name: "tipoAtivoNome",
        align: "left",
        field: "tipoAtivoNome",
        sortable: true
    },
    {
        label: "Setor",
        name: "setorNome",
        align: "left",
        field: "setorNome",
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

const columnsProvento: QTableColumn[] = [
    {
        label: "Ativo",
        name: "ativoCodigo",
        align: "left",
        field: "ativoCodigo",
        sortable: false
    },
    {
        label: "Preço Unitário",
        name: "precoUnitario",
        align: "center",
        field: "precoUnitario",
        sortable: false
    },
    {
        label: "Valor Líquido",
        name: "valorLiquido",
        align: "center",
        field: "valorLiquido",
        sortable: false
    },
    {
        label: "Quantidade",
        name: "quantidade",
        align: "center",
        field: "quantidade",
        sortable: false
    },
    {
        label: "Pagamento",
        name: "pagoEm",
        align: "center",
        field: "pagoEm",
        sortable: false
    },
    {
        label: "Tipo de Evento",
        name: "evento",
        align: "center",
        field: "evento",
        sortable: false
    },
    {
        label: "Ações",
        name: "acoes",
        align: "center",
        field: "acoes",
        sortable: false
    }
];

export {
    columnsConta,
    columnsAtivo,
    columnsReceita,
    columnsDespesa,
    columnsProvento,
    columnsCategoria
};
