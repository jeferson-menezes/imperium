<template>
    <q-page padding>

        <div class="row justify-center">

            <div class="col-12 text-center">
                <p class="text-h6">
                    {{ isUpdate ? "Atualizar" : "Cadastrar" }} imagem do ativo {{ ativoNome }}
                </p>
            </div>

            <q-form class="col-md-6 col-sm-10 col-xs-12 q-gutter-y-md" ref="formRef" @submit.prevent="submit">

                <q-file v-model="image" label="Imagem" accept="image/*">
                    <template v-slot:before v-if="form.imagemId">
                        <AvatarImagem :imagemId="form.imagemId" />
                    </template>
                    <template v-slot:append>
                        <q-icon name="attach_file" />
                    </template>
                </q-file>

                <q-btn :loading="loading" label="Atualizar" color="primary" class="full-width" type="submit" outline
                    rounded />

                <q-btn label="Cancel" class="full-width" color="primary" type="button" rounded flat
                    :to="{ name: 'ativos' }" />

            </q-form>
        </div>
    </q-page>
</template>

<script lang="ts">
import { ErrorResponse } from 'src/model/error';
import { Imagem } from 'src/model/imagem';
import { clone } from 'src/model/objeto-helper';
import useNotify from 'src/pages/composable/useNotify';
import { useAtivoStore } from 'src/stores/ativo-store';
import { useImagemStore } from 'src/stores/imagem-store';
import { computed, defineComponent, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import AvatarImagem from 'src/components/AvatarImagem.vue'

export default defineComponent({

    name: 'AtivoImagemFormPage',

    components: { AvatarImagem },

    setup() {
        const route = useRoute();
        const router = useRouter();
        const imagemStore = useImagemStore();
        const ativoStore = useAtivoStore();
        const image = ref<File>();
        let imagem: Imagem;
        const imagemData = ref()
        const { notifyError, notifySuccess } = useNotify();
        const loading = ref(false);
        const model = { imagemId: undefined }

        const form = ref(clone(model));
        const isUpdate = computed(() => route.params.id);
        const ativoNome = computed(() => route.query.ativoNome)

        const submit = async () => {
            try {
                loading.value = true
                const file = image.value as File
                const res = await uploadImagem(file)
                imagem = res.data
                form.value.imagemId = imagem.id
                await ativoStore.atualizarImagem(form.value.id, form.value);

                notifySuccess("Atualizado com sucesso")
                router.push({ name: "ativos" });
            } catch (error) {
                if (imagem?.id) {
                    await imagemStore.delete(imagem.id)
                }
                const err = error as ErrorResponse
                notifyError(err.message);
            } finally {
                loading.value = false
            }
        }

        const uploadImagem = async (file: File) => {
            try {
                const formData = new FormData()
                formData.append('image', file)
                const res = await imagemStore.upload(formData, (event) => {
                    console.log(event);
                })
                return Promise.resolve(res)
            } catch (error) {
                return Promise.reject(error);
            }
        }

        onMounted(async () => {
            if (isUpdate.value) {
                form.value = await ativoStore.detalhar(isUpdate.value as string)
            }
        });

        return { isUpdate, loading, image, submit, form, ativoNome, imagemData }
    },
})
</script>
