import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Conta } from "src/model/conta";

export const useContaStore = defineStore("conta", {
    state: () => ({
        contas: [] as Conta[] | []
    }),
    getters: {},
    actions: {
        adicionar(conta: Conta) {
            return api
                .post<Conta>("contas", conta)
                .then(res => (this.contas = [...this.contas, res.data]));
        },

        listar() {
            return api.get("contas").then(res => (this.contas = res.data));
        }
    }
});
