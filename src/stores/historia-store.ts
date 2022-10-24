import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Historia } from "src/model/historia";
import { Page, Pageable } from "./../model/paginacao";

export const useHistoriaStore = defineStore("historia", {
    state: () => ({
        historiasPage: {} as Page<Historia>
    }),
    getters: {},
    actions: {
        listarPage(params?: Pageable) {
            return api
                .get("historias/page", { params })
                .then(res => (this.historiasPage = res.data));
        },

        loadPage(params?: Pageable) {
            return api
                .get("historias/page", { params })
                .then(res =>
                    this.historiasPage.content.push(...res.data.content)
                );
        }
    }
});
