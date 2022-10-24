export enum NaturezaHistoria {
    DESPESA = "DESPESA",
    RECEITA = "RECEITA",
    TRANSFERENCIA = "TRANSFERENCIA"
}

export interface Historia {
    id: number;
    data: string;
    hora: string;
    descricao: string;
    valor: number;
    natureza: NaturezaHistoria;
}
