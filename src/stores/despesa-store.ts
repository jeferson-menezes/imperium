import { Despesa } from "./../model/despesa";
import { Page, Pageable } from "./../model/paginacao";
import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useDespesaStore = defineStore("despesa", {
    state: () => ({
        despesasPage: {} as Page<Despesa>
    }),
    getters: {},
    actions: {
        atualizar(id: number, despesa: Despesa) {
            return api.put<Despesa>(`despesas/${id}`, despesa);
        },

        adicionar(despesa: Despesa) {
            return api.post<Despesa>("despesas", despesa);
        },

        detalhar(id: string | number) {
            return api.get<Despesa>(`despesas/${id}`).then(res => res.data);
        },

        listarPage(params?: Pageable) {
            return api
                .get("despesas/page", { params })
                .then(res => (this.despesasPage = res.data));
        }
    }
});
