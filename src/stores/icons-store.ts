import { defineStore } from "pinia";
import { colors } from "src/boot/axios";
import { Icon, Tag } from "./../model/icons";

export const useIconsStore = defineStore("icons", {
    state: () => ({
        tags: [] as Tag[],
        icons: [] as Icon[]
    }),

    getters: {},

    actions: {
        listarTags() {
            return colors.get("icons/tags").then(res => (this.tags = res.data));
        },

        listarIcons(params: { tagUid?: number; name?: string }) {
            return colors
                .get("icons", { params })
                .then(res => (this.icons = res.data));
        }
    }
});
