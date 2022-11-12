export enum Renda {
    RENDA_FIXA = "RENDA_FIXA",
    RENDA_VARIAVEL = "RENDA_VARIAVEL"
}

export const rendaTexto = {
    RENDA_FIXA: "Renda fixa",
    RENDA_VARIAVEL: "Renda Variável"
};

export interface Setor {
    id: number;
    nome: string;
}

export interface TipoAtivo {
    id: number;
    nome: string;
    renda: Renda;
}

export interface Ativo {
    id: number;
    nome: string;
    codigo: string;
    setorId: number;
    imagemId: number;
    tipoAtivoId: number;
}
