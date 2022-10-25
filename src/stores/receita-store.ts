import currency from "currency.js";
import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Receita } from "src/model/receita";
import { Page, Pageable } from "./../model/paginacao";

export const useReceitaStore = defineStore("receita", {
    state: () => ({
        receitasPage: {} as Page<Receita>,
        receitas: [] as Receita[]
    }),
    getters: {
        totalReceitas(): number {
            return this.receitas.length;
        },
        somaReceitas(): currency {
            return this.receitas.reduce((a, c) => a.add(c.valor), currency(0));
        }
    },
    actions: {
        atualizar(id: number, receita: Receita) {
            return api.put<Receita>(`receitas/${id}`, receita);
        },

        adicionar(receita: Receita) {
            return api.post<Receita>("receitas", receita);
        },

        detalhar(id: string | number) {
            return api.get<Receita>(`receitas/${id}`).then(res => res.data);
        },

        listarPage(params?: Pageable) {
            return api
                .get("receitas/page", { params })
                .then(res => (this.receitasPage = res.data));
        },
        listar(params?: any) {
            return api
                .get("receitas", { params })
                .then(res => (this.receitas = res.data));
        }
    }
});
