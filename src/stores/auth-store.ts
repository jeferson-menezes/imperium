import { Login, Sessao } from "./../model/sessao";
import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        sessao: {} as Sessao
    }),
    getters: {
        isLoggedIn(): boolean {
            return !!this.sessao;
        }
    },
    actions: {
        logar(login: Login) {
            return api.post("auth", login);
        }
    }
});
