import { minNum, required } from "./rules";

export interface Posicao {
    id: number;
}

export enum Movimentacao {
    COMPRA = "COMPRA",
    VENDA = "VENDA"
}

export interface Negociacao {
    id: number;
    quantidade: number;
    preco: number;
    valorTotal: number;
    data: Date;
    movimentacao: Movimentacao;
}

export const negociacaoBase = {
    id: 0,
    quantidade: 1,
    preco: 0,
    valorTotal: 0,
    data: new Date().toISOString().substring(0, 10),
    movimentacao: Movimentacao.COMPRA
};

export const negociacaoRules = {
    quantidade: [
        required("O evento é obrigatório"),
        minNum("O valor mínimo é 1", 1)
    ],
    preco: [required("O preço é obrigatório")],
    valorTotal: [required("O valor total é obrigatório")],
    data: [required("A data é obrigatória")]
};
