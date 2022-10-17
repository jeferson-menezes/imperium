export interface Despesa {
    id: number;
    descricao: string;
    data: string;
    hora: string;
    valor: number;
    concluida?: boolean;
    contaNome?: string;
    categoriaNome?: string;
    categoriaId?: number;
    contaId?: number;
}
