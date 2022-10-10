export interface Usuario {
    id: number;
    nome: string;
    email: string;
    perfis: [];
}

export interface Sessao {
    token: string;
    usuario: Usuario;
}

export interface Login {
    email: string;
    senha: string;
}
