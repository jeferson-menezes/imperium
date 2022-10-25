import { required } from "./rules";

export interface TipoConta {
    id: number;
    nome: string;
    descricao: string;
    icone: string;
    cor: string;
}

export interface Conta {
    id: number;
    ativo: boolean;
    descricao: string;
    incluiSoma: boolean;
    nome: string;
    saldo: number;
    tipoContaId?: number;
    tipoContaCor?: string;
    tipoContaIcone?: string;
    tipoContaNome?: string;
    usuarioNome?: string;
}

export const contaBase = {
    id: 0,
    ativo: true,
    descricao: "",
    incluiSoma: true,
    nome: "",
    saldo: 0,
    tipoContaId: undefined
};

export const contaRules = {
    saldo: [required("O salvo é obrigatório")],
    nome: [required("O Nome é obrigatório")],
    descricao: [required("A descrição é obrigatória")]
};
