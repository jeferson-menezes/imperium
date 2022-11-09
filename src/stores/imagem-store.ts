import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Imagem } from "src/model/imagem";

export const useImagemStore = defineStore("imagem", {
    state: () => ({}),

    getters: {},

    actions: {
        upload(
            formData: FormData,
            onUploadProgress?: (progressEvent: any) => void
        ) {
            return api.post<Imagem>("imagens", formData, { onUploadProgress });
        },
        download(
            id: number,
            onDownloadProgress?: (progressEvent: any) => void
        ) {
            return api.get(`imagens/${id}`, {
                responseType: "arraybuffer",
                onDownloadProgress
            });
        },
        delete(id: number) {
            return api.delete(`imagens/${id}`);
        }
    }
});
