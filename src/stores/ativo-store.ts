import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Ativo, TipoAtivo } from "src/model/ativo";

export const useAtivoStore = defineStore("ativo", {
    state: () => ({
        ativos: [] as Ativo[] | [],
        tiposAtivos: [] as TipoAtivo[] | []
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
        listarTipo() {
            return api
                .get("ativos/tipos")
                .then(res => (this.tiposAtivos = res.data));
        },
        detalhar(id: string | number) {
            return api.get<Ativo>(`ativos/${id}`).then(res => res.data);
        }
    }
});
