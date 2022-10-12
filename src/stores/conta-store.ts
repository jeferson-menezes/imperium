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

        atualizar(id: number, conta: Conta) {
            return api
                .put<Conta>(`contas/${id}`, conta)
                .then(
                    res =>
                        (this.contas = [
                            ...this.contas.filter(c => c.id !== id),
                            res.data
                        ])
                );
        },

        listar() {
            return api.get("contas").then(res => (this.contas = res.data));
        },

        detalhar(id: string | number) {
            return api.get<Conta>(`contas/${id}`).then(res => res.data);
        }
    }
});
