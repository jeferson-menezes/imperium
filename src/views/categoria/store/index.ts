import http from "@/http";
import { defineStore } from "pinia";
import { Categoria } from "../Categoria";

export const useCategoriaStore = defineStore({

    id: 'categoria',

    state: () => ({
        categorias: [] as Categoria[]
    }),

    getters: {

    },

    actions: {

        actionListarCategorias() {
            return http.get<Categoria[]>('categorias')
                .then(res => {
                    this.categorias = res.data
                    return res.data
                })
        }
    }
})