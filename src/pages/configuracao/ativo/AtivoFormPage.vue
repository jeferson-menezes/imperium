<template>
    <q-page padding>

        <div class="row justify-center">

            <div class="col-12 text-center">
                <p class="text-h6">
                    {{ isUpdate ? "Atualizar" : "Cadastrar" }} ativo
                </p>
            </div>

            <q-form class="col-md-6 col-sm-10 col-xs-12 q-gutter-y-md" ref="formRef" @submit.prevent="submit">

                <q-input label="Código" v-model="form.codigo" lazy-rules :rules="rules.codigo"></q-input>

                <q-input label="Nome" v-model="form.nome" lazy-rules :rules="rules.nome"></q-input>

                <q-select map-options emit-value option-value="id" option-label="nome" v-model="form.setorId"
                    :options="setorStore.setores" :rules="rules.setorId" label="Setor" />

                <q-radio keep-color v-model="form.renda" val="RENDA_FIXA" label="Renda fixa" color="orange" />
                <q-radio keep-color v-model="form.renda" val="RENDA_VARIAVEL" label="Renda variável" color="accent" />

                <q-btn :label="isUpdate ? 'Atualizar' : 'Cadastrar'" color="primary" class="full-width" type="submit"
                    outline rounded />

                <q-btn label="Cancel" class="full-width" color="primary" type="button" rounded flat
                    :to="{ name: 'ativos' }" />

            </q-form>

        </div>

    </q-page>
</template>

<script lang="ts">
import { Ativo, Renda } from "src/model/ativo";
import { ErrorResponse } from "src/model/error";
import { clone } from "src/model/objeto-helper";
import { required } from "src/model/rules";
import useNotify from "src/pages/composable/useNotify";
import { useAtivoStore } from "src/stores/ativo-store";
import { useSetorStore } from "src/stores/setor-store";
import { computed, defineComponent, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
    name: "AtivoFormPage",

    setup() {
        const route = useRoute();
        const router = useRouter();
        const ativoStore = useAtivoStore();
        const setorStore = useSetorStore();

        const { notifyError, notifySuccess } = useNotify();
        const loading = ref(false);

        const model = {
            id: 0,
            nome: '',
            codigo: '',
            renda: Renda.RENDA_FIXA,
            setorId: undefined
        }

        const form = ref<Ativo>(clone(model));

        const rules = {
            nome: [required("O nome é obrigatóro!")],
            codigo: [required("O código é obrigatório!")],
            setorId: [required("O setor é obrigatório!")]
        }

        const isUpdate = computed(() => route.params.id);

        const submit = async () => {
            try {
                loading.value = true;
                if (isUpdate.value) {
                    await ativoStore.atualizar(form.value.id, form.value);
                    notifySuccess('Atualizado com sucesso!')
                    router.push({ name: "ativos" });
                } else {
                    await ativoStore.adicionar(form.value);
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
            setorStore.listar()
            if (isUpdate.value) {
                form.value = await ativoStore.detalhar(isUpdate.value as string)
            }
        });

        return {
            form,
            rules,
            submit,
            isUpdate,
            setorStore,
        };
    },
});
</script>
