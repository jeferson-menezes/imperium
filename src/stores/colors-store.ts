import { Paleta } from "./../model/colors";
import { defineStore } from "pinia";
import { colors } from "src/boot/axios";

export const useColorsStore = defineStore("colors", {
    state: () => ({
        paletas: [] as Paleta[]
    }),

    getters: {},

    actions: {
        paletas() {
            return colors.get("colors/palettes");
        }
    }
});
