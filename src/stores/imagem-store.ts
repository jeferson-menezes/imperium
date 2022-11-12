import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Imagem } from "src/model/imagem";

export const useImagemStore = defineStore("imagem", {
    state: () => ({
        imagens: {} as { [key: number]: string }
    }),
    getters: {},
    actions: {
        upload(
            formData: FormData,
            onUploadProgress?: (progressEvent: ProgressEvent) => void
        ) {
            return api.post<Imagem>("imagens", formData, {
                onUploadProgress
            });
        },
        download(
            id: number,
            onDownloadProgress?: (progressEvent: ProgressEvent) => void
        ) {
            if (this.imagens[id]) return Promise.resolve(this.imagens[id]);

            return api
                .get(`imagens/${id}`, {
                    responseType: "arraybuffer",
                    onDownloadProgress
                })
                .then(res => {
                    this.imagens[id] = res.data;
                    return res.data;
                });
        },
        delete(id: number) {
            return api.delete(`imagens/${id}`);
        }
    }
});
