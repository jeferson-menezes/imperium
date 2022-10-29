import currency from "currency.js";
import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { DonutChart } from "./../model/charts";
import { Page, Pageable } from "./../model/paginacao";
import { Receita } from "./../model/receita";

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
        },
        agruparCategorias(): DonutChart {
            return this.receitas.reduce((acc: DonutChart, curr) => {
                acc[curr.categoriaNome] = acc[curr.categoriaNome] || 0;
                acc[curr.categoriaNome] = acc[curr.categoriaNome] + curr.valor;
                return acc;
            }, {});
        },
        valores(): number[] {
            return this.receitas.map(e => e.valor);
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
        listar(params?: { mes: string }) {
            return api
                .get("receitas", { params })
                .then(res => (this.receitas = res.data));
        }
    }
});
