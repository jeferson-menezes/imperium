import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Ativo } from "src/model/ativo";

export const useAtivoStore = defineStore("ativo", {
    state: () => ({
        ativos: [] as Ativo[] | []
    }),
    getters: {},
    actions: {
        adicionar(ativo: Ativo) {
            return api.post<Ativo>("ativos", ativo);
        },

        atualizar(id: number, ativo: Ativo) {
            return api.put<Ativo>(`ativos/${id}`, ativo);
        },
        atualizarImagem(id: number, ativo: Ativo) {
            return api.patch<Ativo>(`ativos/${id}/imagem`, ativo);
        },
        listar() {
            return api.get("ativos").then(res => (this.ativos = res.data));
        },

        detalhar(id: string | number) {
            return api.get<Ativo>(`ativos/${id}`).then(res => res.data);
        }
    }
});
