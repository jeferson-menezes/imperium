import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Posicao } from "src/model/posicao";
export const usePosicaoStore = defineStore("posicao", {
    state: () => ({
        posicoes: [] as Posicao[]
    }),
    getters: {},
    actions: {
        listar(params?: any) {
            return api
                .get("posicoes", { params })
                .then(res => (this.posicoes = res.data));
        }
    }
});
