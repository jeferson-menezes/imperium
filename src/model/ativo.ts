export enum Renda {
    RENDA_FIXA = "RENDA_FIXA",
    RENDA_VARIAVEL = "RENDA_VARIAVEL"
}

export interface Setor {
    id: number;
    nome: string;
}

export interface Ativo {
    id: number;
    nome: string;
    codigo: string;
    renda: Renda;
    setorId: number;
    imagemId: number;
}
