export enum Evento {
    DIVIDENDO = "DIVIDENDO",
    RENDIMENTO = "RENDIMENTO",
    JUROS_SOBRE_CAPITAL_PROPRIO = "JUROS_SOBRE_CAPITAL_PROPRIO",
    REEMBOLSO_EMPRESTIMO_DE_ATIVOS = "REEMBOLSO_EMPRESTIMO_DE_ATIVOS"
}

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
