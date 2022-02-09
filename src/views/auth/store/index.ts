import http from "@/http";
import { defineStore } from "pinia";
import { LoginForm } from "../LoginForm";
import { Sessao, Usuario } from "../Sessao";
import { deleteLocalToken, deleteLocalUsuario, getLocalToken, getLocalUsuario, setLocalToken, setLocalUsuario } from "../storage";

export const useAuthStore = defineStore({

    id: "auth",

    state: () => ({
        token: undefined as string | undefined,
        usuario: undefined as Usuario | undefined
    } as Sessao),

    getters: {
        hasToken: (state) => !!state.token
    },

    actions: {

        actionLogar(form: LoginForm) {
            return http.post<Sessao>('auth', form)
                .then(res => {
                    this.actionSetSessao(res.data)
                    return res.data;
                })
        },

        actionSetSessao(sessao: Sessao): void {
            const { token, usuario } = sessao
            this.token = token as string
            this.usuario = usuario as Usuario
            setLocalToken(this.token)
            setLocalUsuario(this.usuario)
        },

        actionChecaToken() {

            if (this.token) {
                return Promise.resolve(this.token)
            }

            const token = getLocalToken()

            if (!token) {
                return Promise.reject(new Error('Token inválido'))
            }

            this.token = token

            const usuario = getLocalUsuario()

            this.usuario = usuario
        },

        async actionValidaToken(token: string): Promise<string> {
            try {

                const res = await http.post<Sessao>('auth/valida', { token })

                const sessao = res.data

                this.actionSetSessao(sessao)

                return Promise.resolve(sessao.token as string);

            } catch (error) {
                this.actionLogout()
                return Promise.reject(error)
            }
        },

        actionLogout() {
            deleteLocalToken()
            deleteLocalUsuario()
            this.usuario = undefined
            this.token = undefined
        }
    }
})