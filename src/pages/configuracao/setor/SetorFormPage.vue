<template>
    <q-page padding>
        <div class="row justify-center">
            <div class="col-12 text-center">
                <p class="text-h6">
                    {{ isUpdate ? "Atualizar" : "Cadastrar" }} setor
                </p>
            </div>
            <q-form ref="formRef" class="col-md-6 col-sm-10 col-xs-12 q-gutter-y-md" @submit.prevent="submit">
                <q-input label="Nome" v-model="form.nome" lazy-rules :rules="rules.nome"></q-input>

                <q-btn :loading="loading" :label="isUpdate ? 'Atualizar' : 'Cadastrar'" color="primary"
                    class="full-width" type="submit" outline rounded></q-btn>

                <q-btn label="Cancel" class="full-width" color="primary" type="button" rounded flat
                    :to="{ name: 'setores' }" />
            </q-form>
        </div>
    </q-page>
</template>

<script lang="ts">
import { ErrorResponse } from 'src/model/error';
import { clone } from 'src/model/objeto-helper';
import { required } from 'src/model/rules';
import useNotify from 'src/pages/composable/useNotify';
import { useSetorStore } from 'src/stores/setor-store';
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
    name: 'SetorFormPage',
    setup() {
        const route = useRoute();
        const router = useRouter();
        const setorStore = useSetorStore()
        const { notifySuccess, notifyError } = useNotify();

        const isUpdate = computed(() => route.params.id);
        const loading = ref(false);
        const model = { id: 0, nome: "" }
        const form = ref(clone(model));
        const rules = {
            nome: [required('O nome é obrigatório')]
        }

        const submit = async () => {
            try {
                loading.value = true
                if (isUpdate.value) {
                    await setorStore.atualizar(form.value.id, form.value)
                    notifySuccess('Atualizado com sucesso!')
                    router.push({ name: 'setores' })
                } else {
                    await setorStore.adicionar(form.value)
                    form.value = clone(model)
                    notifySuccess('Adicionado com sucesso!')
                }
            } catch (error) {
                const err = error as ErrorResponse
                notifyError(err.message);
            } finally {
                loading.value = false
            }
        }

        onMounted(async () => {
            if (isUpdate.value) {
                form.value = await setorStore.detalhar(isUpdate.value as string)
            }
        })

        return { submit, isUpdate, form, rules, loading }
    },
})
</script>
