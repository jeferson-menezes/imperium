export interface Conta {
    id: number;
    ativo: boolean;
    descricao: string;
    incluiSoma: boolean;
    nome: string;
    saldo: number;
    tipoContaId?: number;
    usuarioId?: number;
}
