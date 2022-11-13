import { Pageable } from "./../model/paginacao";
import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Page } from "src/model/paginacao";
import { Provento } from "src/model/provento";

export const useProventoStore = defineStore("provento", {
    state: () => ({
        proventosPage: {} as Page<Provento>
    }),
    getters: {},
    actions: {
        atualizar(id: number, provento: Provento) {
            return api.put<Provento>(`proventos/${id}`, provento);
        },

        adicionar(provento: Provento) {
            return api.post<Provento>("proventos", provento);
        },

        detalhar(id: string | number) {
            return api.get<Provento>(`proventos/${id}`).then(res => res.data);
        },

        listarPage(params?: Pageable) {
            return api
                .get("proventos/page", { params })
                .then(res => (this.proventosPage = res.data));
        },
        deletar(id: number) {
            return api.delete(`proventos/${id}`);
        }
    }
});
