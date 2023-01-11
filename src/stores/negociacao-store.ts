import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Negociacao } from "src/model/posicao";

export const useNegociacaoStore = defineStore("negociacao", {
    state: () => ({}),
    getters: {},
    actions: {
        adicionar(negociacao: Negociacao) {
            return api.post<Negociacao>("negociacoes", negociacao);
        },
        atualizar(id: number, negociacao: Negociacao) {
            return api.put<Negociacao>(`negociacoes/${id}`, negociacao);
        },
        detalhar(id: string | number) {
            return api
                .get<Negociacao>(`negociacoes/${id}`)
                .then(res => res.data);
        }
    }
});
