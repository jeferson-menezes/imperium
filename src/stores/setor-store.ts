import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Setor } from "src/model/ativo";

export const useSetorStore = defineStore("setor", {
    state: () => ({
        setores: [] as Setor[] | []
    }),
    getters: {},
    actions: {
        adicionar(setor: Setor) {
            return api.post<Setor>("setores", setor);
        },

        atualizar(id: number, setor: Setor) {
            return api.put<Setor>(`setores/${id}`, setor);
        },

        listar() {
            return api.get("setores").then(res => (this.setores = res.data));
        },

        detalhar(id: string | number) {
            return api.get<Setor>(`setores/${id}`).then(res => res.data);
        }
    }
});
