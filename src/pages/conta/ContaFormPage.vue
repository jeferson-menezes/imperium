<template>
    <q-page padding>
        <div class="row justify-center">
            <div class="col-12 text-center">
                <p class="text-h6">
                    {{ isUpdate ? "Atualizar" : "Cadastrar" }} conta
                </p>
            </div>

            <q-form class="col-md-6 col-sm-10 col-xs-11 q-gutter-y-md" ref="formRef" @submit.prevent="submit">

                <MoneyField label="Saldo" v-model="form.saldo" />

                <q-input label="Nome" v-model="form.nome" lazy-rules :rules="rules.nome"></q-input>

                <q-input label="Descrição" v-model="form.descricao" lazy-rules :rules="rules.descricao"></q-input>

                <q-select map-options emit-value option-value="id" option-label="nome" v-model="form.tipoContaId"
                    :options="tipoContaStore.tipos" :rules="[(v) => v || 'Tipo de conta é obrigatório']"
                    label="Tipo de Conta">
                    <template v-slot:option="scope">
                        <q-item v-bind="scope.itemProps">
                            <q-item-section avatar>
                                <q-icon :name="'mdi-' + scope.opt.icone" />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>{{
                                scope.opt.nome
                                }}</q-item-label>
                                <q-item-label caption>{{
                                scope.opt.descricao
                                }}</q-item-label>
                            </q-item-section>
                        </q-item>
                    </template>
                </q-select>

                <q-checkbox left-label v-model="form.incluiSoma" label="Incluir na soma" />

                <q-checkbox left-label v-model="form.ativo" label="Ativo" />

                <q-btn :label="isUpdate ? 'Atualizar' : 'Cadastrar'" :loading="loading" color="primary"
                    class="full-width" type="submit" outline rounded></q-btn>

                <q-btn label="Cancelar" class="full-width" color="primary" type="button" rounded flat
                    :to="{ name: 'contas' }" />
            </q-form>
        </div>
    </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import useNotify from "../composable/useNotify";
import { useContaStore } from "src/stores/conta-store";
import { useTipoContaStore } from "src/stores/tipo-conta-store";
import { Conta, contaBase, contaRules } from "src/model/conta";
import { ErrorResponse } from "src/model/error";
import MoneyField from 'src/components/MoneyField.vue'
import { clone } from "src/model/objeto-helper";

export default defineComponent({

    name: "ContaFormPage",

    components: {
        MoneyField
    },

    setup() {
        const { notifySuccess, notifyError } = useNotify();
        const tipoContaStore = useTipoContaStore();
        const contaStore = useContaStore();
        const route = useRoute();
        const router = useRouter();
        const loading = ref(false);
        const formRef = ref(null);
        const form = ref<Conta>(clone(contaBase));

        const isUpdate = computed(() => route.params.id);

        const submit = async () => {
            try {
                loading.value = true;

                if (isUpdate.value) {
                    await contaStore.atualizar(form.value.id, form.value);
                    router.push({ name: "contas" });
                } else {
                    await contaStore.adicionar(form.value);
                    form.value = clone(contaBase)
                }
                notifySuccess(isUpdate.value ? "Atualizado" : "Cadastrado" + "com sucesso");
            } catch (error) {
                const err = error as ErrorResponse
                notifyError(err.message);
            } finally {
                loading.value = false;
            }
        };

        onMounted(async () => {
            tipoContaStore.listar();
            if (isUpdate.value) {
                form.value = await contaStore.detalhar(
                    isUpdate.value as string
                );
            }
        });

        return {
            form,
            submit,
            formRef,
            loading,
            isUpdate,
            tipoContaStore,
            rules: contaRules,
        };
    },
});
</script>
