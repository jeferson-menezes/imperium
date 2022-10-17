import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Categoria } from "src/model/categoria";

export const useCategoriaStore = defineStore("categoria", {
    state: () => ({
        categorias: [] as Categoria[] | []
    }),
    getters: {
        filtrarPorNatureza(state) {
            return (natureza: string) =>
                state.categorias.filter(n => n.natureza === natureza);
        }
    },
    actions: {
        adicionar(categoria: Categoria) {
            return api.post<Categoria>("categorias", categoria);
        },
        atualizar(id: number, categoria: Categoria) {
            return api.put<Categoria>(`categorias/${id}`, categoria);
        },
        listar() {
            return api
                .get<Categoria[]>("categorias")
                .then(res => (this.categorias = res.data));
        },
        detalhar(id: number | string) {
            return api.get<Categoria>(`categorias/${id}`).then(res => res.data);
        }
    }
});
