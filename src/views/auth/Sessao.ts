export interface Sessao {
    token: string | undefined
    usuario: Usuario | undefined
}

export interface Usuario {
    id: number
    nome: string
    email: string
    perfis: Perfil[]
}

export interface Perfil {
    id: number
    nome: string
}