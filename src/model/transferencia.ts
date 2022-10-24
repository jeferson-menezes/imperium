import { TipoConta } from "./conta";
import { required } from "./rules";

export interface Transferencia {
    id: number;
    valor: number;
    descricao: string;
    data: string;
    hora: string;
    contaOrigemId?: number;
    contaDestinoId?: number;
    contaDestinoNome?: string;
    contaOrigemNome?: string;
    contaOrigemTipo?: TipoConta;
    contaDestinoTipo?: TipoConta;
}

export const transferenciaBase = {
    id: 0,
    descricao: "",
    data: new Date().toISOString().substring(0, 10),
    hora: new Date().toLocaleTimeString().substring(0, 5),
    valor: 0,
    contaOrigemId: undefined,
    contaDestinoId: undefined
};

export const transferenciaRules = {
    descricao: [required("A descrição é obrigatória")],
    categoriaId: [required("A categoria é obrigatória")],
    contaOrigemId: [required("A conta origem é obrigatória")],
    contaDestinoId: [required("A conta destino é obrigatória")]
};
