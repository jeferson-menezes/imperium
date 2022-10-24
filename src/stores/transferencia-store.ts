import { Page, Pageable } from "./../model/paginacao";
import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Transferencia } from "src/model/transferencia";

export const useTransferenciaStore = defineStore("transferencia", {
    state: () => ({
        tranferenciasPage: {} as Page<Transferencia>
    }),
    getters: {},
    actions: {
        transferir(transacao: Transferencia) {
            return api.post<Transferencia>("transferencias", transacao);
        },
        listar(params?: Pageable) {
            return api
                .get("transferencias/page", { params })
                .then(res => (this.tranferenciasPage = res.data));
        }
    }
});
