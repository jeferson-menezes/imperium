export interface TipoConta {
    id: number;
    nome: string;
    descricao: string;
}

export interface Conta {
    id: number;
    ativo: boolean;
    descricao: string;
    incluiSoma: boolean;
    nome: string;
    saldo: number | string;
    tipoContaId?: number;
    tipo?: TipoConta;
}
