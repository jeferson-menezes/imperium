import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import useLocalStorage from "src/pages/composable/useLocalStorage";
import { Login, Sessao, Usuario } from "./../model/sessao";

const {
    setLocalToken,
    setLocalUsuario,
    setHeaderToken,
    deleteLocalToken,
    deleteLocalUsuario,
    getLocalToken,
    getLocalUsuario
} = useLocalStorage();

export const useAuthStore = defineStore("auth", {
    state: () => ({
        usuario: undefined as Usuario | undefined,
        token: undefined as string | undefined
    }),
    getters: {
        isLoggedIn(): boolean {
            return !!this.token;
        }
    },
    actions: {
        logar(login: Login) {
            return api.post<Sessao>("auth", login).then(res => {
                this._setSessao(res.data);
                return res;
            });
        },

        checaToken() {
            if (this.token) return Promise.resolve(this.token);

            const token = getLocalToken();

            if (!token) return Promise.reject(new Error("Token inválido"));

            this.token = token;
            setHeaderToken(token);

            const usuario = getLocalUsuario();
            this.usuario = usuario;

            return Promise.resolve();
        },

        actionLogout() {
            this.token = undefined;
            this.usuario = undefined;
            deleteLocalToken();
            deleteLocalUsuario();
        },

        _setSessao(sessao: Sessao) {
            const { token, usuario } = sessao;
            this.token = token;
            this.usuario = usuario;
            setLocalToken(this.token);
            setLocalUsuario(this.usuario);
            setHeaderToken(this.token);
        }
    }
});
