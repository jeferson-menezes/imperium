import { Color, Paleta } from "./../model/colors";
import { defineStore } from "pinia";
import { colors } from "src/boot/axios";

export const useColorsStore = defineStore("colors", {
    state: () => ({
        paletas: [] as Paleta[],
        colors: [] as Color[]
    }),

    getters: {},

    actions: {
        listarPaletas() {
            return colors
                .get("colors/palettes")
                .then(res => (this.paletas = res.data));
        },

        listarColors(params: { paletteId?: number; name?: string }) {
            return colors
                .get("colors", { params })
                .then(res => (this.colors = res.data));
        }
    }
});
