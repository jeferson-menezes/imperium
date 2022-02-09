import { Usuario } from "../Sessao";

export interface State {
    token?: string
    usuario?: Usuario
}

export const state: State = {
    token: undefined,
    usuario: undefined
}