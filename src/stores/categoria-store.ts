import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Categoria } from "src/model/categoria";

export const useCategoriaStore = defineStore("categoria", {
    state: () => ({
        categorias: [] as Categoria[] | []
    }),
    getters: {},
    actions: {
        listar() {
            return api
                .get<Categoria[]>("categorias")
                .then(res => (this.categorias = res.data));
        }
    }
});
