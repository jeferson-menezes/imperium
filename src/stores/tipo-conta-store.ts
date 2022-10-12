import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { TipoConta } from "./../model/conta";

export const useTipoContaStore = defineStore("tipo-conta", {
    state: () => ({
        tipos: [] as TipoConta[] | []
    }),
    getters: {},
    actions: {
        listar() {
            return api.get("tipos/conta").then(res => (this.tipos = res.data));
        },

        detalhar(id: number | string) {
            return api.get(`tipos/conta/${id}`);
        }
    }
});
