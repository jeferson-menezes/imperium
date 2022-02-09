import http from "@/http";
import { defineStore } from "pinia";
import { LoginForm } from "../LoginForm";
import { Sessao, Usuario } from "../Sessao";
import { deleteLocalToken, deleteLocalUsuario, getLocalToken, getLocalUsuario, setHeaderToken, setLocalToken, setLocalUsuario } from "../storage";

export const useAuthStore = defineStore({

    id: "auth",

    state: () => ({
        token: undefined as string | undefined,
        usuario: undefined as Usuario | undefined
    }),

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
            console.log('Salvando o token');
            
            setLocalToken(this.token)
            setLocalUsuario(this.usuario)
            setHeaderToken(this.token)
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
            
            return this.actionValidaToken(token)
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