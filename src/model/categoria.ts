export enum Natureza {
    DESPESA = "DESPESA",
    RECEITA = "RECEITA"
}

export interface Categoria {
    id: number;
    nome: string;
    descricao: string;
    natureza: Natureza | undefined | string;
    ativo: boolean;
    icone: string;
    cor: string;
}
