export interface Usuario {
    nome: string;
}

export interface Sessao {
    usuario: Usuario;
}

export interface Login {
    email: string;
    senha: string;
}
