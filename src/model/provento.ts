import { minNum, required } from "./rules";

export enum Evento {
    DIVIDENDO = "DIVIDENDO",
    RENDIMENTO = "RENDIMENTO",
    JUROS_SOBRE_CAPITAL_PROPRIO = "JUROS_SOBRE_CAPITAL_PROPRIO",
    REEMBOLSO_EMPRESTIMO_DE_ATIVOS = "REEMBOLSO_EMPRESTIMO_DE_ATIVOS"
}

export const eventoTexto: { [key: string]: string } = {
    DIVIDENDO: "Dividento",
    RENDIMENTO: "Rendimento",
    JUROS_SOBRE_CAPITAL_PROPRIO: "Juros sobre capital próprio",
    REEMBOLSO_EMPRESTIMO_DE_ATIVOS: "Reembolso - Empréstimo de Ativos"
};

export interface Provento {
    id: number;
    pagoEm: Date;
    evento: Evento;
    ativoId: number;
    aprovadoEm: Date;
    ativoNome: string;
    quantidade: number;
    ativoCodigo: string;
    valorLiquido: number;
    precoUnitario: number;
}
export const proventoBase = {
    id: 0,
    evento: undefined,
    pagoEm: new Date().toISOString().substring(0, 10),
    quantidade: 1,
    aprovadoEm: new Date().toISOString().substring(0, 10),
    valorLiquido: 0,
    precoUnitario: 0,
    ativoId: undefined
};

export const proventoRules = {
    evento: [required("O evento é obrigatório")],
    pagoEm: [required("O evento é obrigatório")],
    quantidade: [
        required("O evento é obrigatório"),
        minNum("O valor mínimo é 1", 1)
    ],
    aprovadoEm: [required("O evento é obrigatório")],
    valorLiquido: [required("O evento é obrigatório")],
    precoUnitario: [required("O evento é obrigatório")],
    ativoId: [required("O evento é obrigatório")]
};
