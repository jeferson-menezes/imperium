<template>
    <q-page padding>
        <div class="row justify-center">
            <div class="col-12 text-center">
                <p class="text-h6">
                    {{ isUpdate ? "Atualizar" : "Cadastrar" }} receita
                </p>
            </div>

            <q-form class="col-md-6 col-sm-10 col-xs-11 q-gutter-y-md" ref="formRef" @submit.prevent="submit">

                <MoneyField label="Valor" v-model="form.valor" />

                <q-input label="Descrição" v-model="form.descricao" lazy-rules :rules="rules.descricao"></q-input>

                <q-select map-options emit-value option-value="id" option-label="nome" v-model="form.categoriaId"
                    :options="categoriaStore.filtrarPorNatureza('RECEITA')" :rules="rules.categoriaId"
                    label="Categoria">
                    <template v-slot:option="scope">
                        <q-item v-bind="scope.itemProps">
                            <q-item-section avatar>
                                <q-icon :color="scope.opt.cor" :name="'mdi-' + scope.opt.icone" />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>
                                    {{ scope.opt.nome }}
                                </q-item-label>
                                <q-item-label caption>
                                    {{ scope.opt.descricao }}
                                </q-item-label>
                            </q-item-section>
                        </q-item>
                    </template>
                </q-select>

                <q-select map-options emit-value option-value="id" option-label="nome" v-model="form.contaId"
                    :options="contaStore.contas" :rules="rules.contaId" label="Conta">
                    <template v-slot:option="scope">
                        <q-item v-bind="scope.itemProps">
                            <q-item-section avatar>
                                <q-icon :name="'mdi-' + scope.opt.tipoContaIcone" />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>
                                    {{ scope.opt.nome }}
                                </q-item-label>
                                <q-item-label caption>
                                    {{ scope.opt.descricao }}
                                </q-item-label>
                            </q-item-section>
                        </q-item>
                    </template>
                </q-select>

                <div class="row justify-between  content-start">
                    <div class="col q-mr-sm">
                        <DatePicker v-model="form.data" />
                    </div>
                    <div class="col q-ml-sm">
                        <TimePicker v-model="form.hora" />
                    </div>
                </div>

                <q-btn :label="isUpdate ? 'Atualizar' : 'Cadastrar'" :loading="loading" color="primary"
                    class="full-width" type="submit" outline rounded></q-btn>

                <q-btn label="Cancelar" class="full-width" color="primary" type="button" rounded flat
                    :to="{ name: 'receitas' }" />

            </q-form>
        </div>
    </q-page>
</template>

<script lang="ts">
import { ErrorResponse } from 'src/model/error';
import { useCategoriaStore } from 'src/stores/categoria-store';
import { useContaStore } from 'src/stores/conta-store';
import { computed, defineComponent, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import useNotify from '../composable/useNotify';
import DatePicker from 'src/components/DatePicker.vue'
import TimePicker from 'src/components/TimePicker.vue'
import MoneyField from 'src/components/MoneyField.vue'
import { required } from 'src/model/rules';
import { Receita } from 'src/model/receita';
import { useReceitaStore } from 'src/stores/receita-store';

export default defineComponent({
    name: 'ReceitaFormPage',
    components: {
        DatePicker,
        TimePicker,
        MoneyField
    },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const loading = ref(false);
        const formRef = ref(null);
        const { notifySuccess, notifyError } = useNotify();
        const receitaStore = useReceitaStore()
        const contaStore = useContaStore()
        const categoriaStore = useCategoriaStore()

        const rules = {
            descricao: [required('A descrição é obrigatória')],
            categoriaId: [required('A categoria é obrigatória')],
            contaId: [required('A conta é obrigatória')]
        }

        const form = ref<Receita>({
            id: 0,
            descricao: "",
            data: new Date().toISOString().substring(0, 10),
            hora: new Date().toLocaleTimeString(),
            valor: 0,
            categoriaId: undefined,
            contaId: undefined,
            categoriaNome: ''
        })

        const isUpdate = computed(() => route.params.id);

        const submit = async () => {
            try {
                loading.value = true
                if (isUpdate.value) {
                    await receitaStore.atualizar(form.value.id, form.value)
                } else {
                    await receitaStore.adicionar(form.value as Receita)
                }
                notifySuccess(isUpdate.value ? "Atualizado" : "Cadastrado" + "com sucesso");
                router.push({ name: "receitas" });
            } catch (error) {
                const err = error as ErrorResponse
                notifyError(err.message);
            } finally {
                loading.value = false;
            }
        }

        onMounted(async () => {
            contaStore.listar()
            categoriaStore.listar()
            if (isUpdate.value) {
                form.value = await receitaStore.detalhar(isUpdate.value as string)
            }
        })

        return {
            loading,
            form,
            formRef,
            isUpdate,
            rules,
            submit,
            contaStore,
            categoriaStore
        }
    },
})
</script>
