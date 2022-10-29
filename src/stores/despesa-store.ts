import currency from "currency.js";
import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { DonutChart } from "src/model/charts";
import { Despesa } from "./../model/despesa";
import { Page, Pageable } from "./../model/paginacao";

export const useDespesaStore = defineStore("despesa", {
    state: () => ({
        despesasPage: {} as Page<Despesa>,
        despesas: [] as Despesa[]
    }),
    getters: {
        totalDespesas(): number {
            return this.despesas.length;
        },
        somaDespesas(): currency {
            return this.despesas.reduce((a, c) => a.add(c.valor), currency(0));
        },
        agruparCategorias(): DonutChart {
            return this.despesas.reduce((acc: DonutChart, curr) => {
                acc[curr.categoriaNome] = acc[curr.categoriaNome] || 0;
                acc[curr.categoriaNome] = acc[curr.categoriaNome] + curr.valor;
                return acc;
            }, {});
        },
        valores(): number[] {
            return this.despesas.map(e => e.valor);
        }
    },
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
        },

        listar(params?: { mes: string }) {
            return api
                .get("despesas", { params })
                .then(res => (this.despesas = res.data));
        },
        deletar(id: number) {
            return api.delete(`despesas/${id}`);
        }
    }
});
