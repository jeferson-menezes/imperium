<template>
    <q-page padding>
        <div class="row justify-center">
            <div class="col-12 text-center">
                <p class="text-h6">
                    {{ isUpdate ? "Atualizar" : "Cadastrar" }} conta
                </p>
            </div>

            <q-form class="col-md-6 col-sm-10 col-xs-11 q-gutter-y-md" ref="formRef" @submit.prevent="submit">
                <q-input label="Saldo" v-model="form.saldo" prefix="R$" mask="#,##" fill-mask="0" lazy-rules
                    reverse-fill-mask :rules="rules.saldo"></q-input>

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
import { required } from "src/model/rules";
import { useContaStore } from "src/stores/conta-store";
import { useTipoContaStore } from "src/stores/tipo-conta-store";
import { Conta } from "src/model/conta";
import { toReal } from "src/model/currency-helper";
import { ErrorResponse } from "src/model/error";

export default defineComponent({
    name: "ContaFormPage",
    setup() {
        const tipoContaStore = useTipoContaStore();
        const contaStore = useContaStore();
        const route = useRoute();
        const router = useRouter();
        const loading = ref(false);
        const formRef = ref(null);

        const rules = {
            saldo: [required("O salvo é obrigatório")],
            nome: [required("O Nome é obrigatório")],
            descricao: [required("A descrição é obrigatória")],
        };

        const form = ref<Conta>({
            id: 0,
            ativo: true,
            descricao: "",
            incluiSoma: true,
            nome: "",
            saldo: "",
            tipoContaId: undefined,
        });

        const { notifySuccess, notifyError } = useNotify();

        const isUpdate = computed(() => route.params.id);

        const submit = async () => {
            try {
                loading.value = true;
                const conta = form.value;
                conta.saldo = conta.saldo.toString().replace(",", ".");

                if (isUpdate.value) {
                    await contaStore.atualizar(conta.id, conta);
                } else {
                    await contaStore.adicionar(conta);
                }
                notifySuccess(isUpdate.value ? "Atualizado" : "Cadastrado" + "com sucesso");
                router.push({ name: "contas" });
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
                const conta = await contaStore.detalhar(
                    isUpdate.value as string
                );
                form.value = conta;
                form.value.saldo = toReal(conta.saldo);
                form.value.tipoContaId = conta?.tipo?.id;
            }
        });

        return {
            loading,
            form,
            formRef,
            isUpdate,
            rules,
            submit,
            tipoContaStore,
        };
    },
});
</script>
