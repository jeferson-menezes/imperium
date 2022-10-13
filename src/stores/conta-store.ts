import currency from "currency.js";
import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Conta } from "src/model/conta";

export const useContaStore = defineStore("conta", {
    state: () => ({
        contas: [] as Conta[] | []
    }),
    getters: {
        totalNaSoma(state): currency {
            return state.contas
                .filter(e => e.incluiSoma)
                .reduce((a, c) => a.add(c.saldo), currency(0));
        },
        totalSemSoma(state): currency {
            return state.contas
                .filter(e => !e.incluiSoma)
                .reduce((a, c) => a.add(c.saldo), currency(0));
        }
    },
    actions: {
        adicionar(conta: Conta) {
            return api.post<Conta>("contas", conta);
        },

        atualizar(id: number, conta: Conta) {
            return api.put<Conta>(`contas/${id}`, conta);
        },

        listar() {
            return api.get("contas").then(res => (this.contas = res.data));
        },

        detalhar(id: string | number) {
            return api.get<Conta>(`contas/${id}`).then(res => res.data);
        }
    }
});
