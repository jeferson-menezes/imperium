<template>

    <q-btn v-if="$q.platform.is.desktop" label="novo" icon="mdi-plus" color="purple" @click="dialogRef?.show" />

    <q-btn v-if="$q.platform.is.mobile" round icon="mdi-plus" color="purple" @click="dialogRef?.show">
    </q-btn>

    <q-dialog ref="dialogRef" @hide="onDialogHide">
        <q-card class="q-pa-md">
            <q-form class="col-md-6 col-sm-10 col-xs-11 q-gutter-y-md" ref="formRef" @submit.prevent="submit">

                <div class="col-12 text-center">
                    <p class="text-h6">
                        Fazer transferência
                    </p>
                </div>

                <q-card-section>

                    <MoneyField label="Valor" v-model="form.valor" />

                    <q-input label="Descrição" v-model="form.descricao" lazy-rules :rules="rules.descricao"></q-input>

                    <div class="row justify-between  content-start">
                        <div class="col q-mr-sm">
                            <DatePicker v-model="form.data" />
                        </div>
                        <div class="col q-ml-sm">
                            <TimePicker v-model="form.hora" />
                        </div>
                    </div>

                    <q-select map-options emit-value option-value="id" option-label="nome" v-model="form.contaOrigemId"
                        :options="contaStore.contas" :rules="rules.contaOrigemId" label="Conta origem">
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

                    <q-select map-options emit-value option-value="id" option-label="nome" v-model="form.contaDestinoId"
                        :options="contaStore.contas" :rules="rules.contaDestinoId" label="Conta destino">
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

                </q-card-section>

                <q-card-actions>
                    <q-btn :label="'Cadastrar'" :loading="loading" color="primary" class="full-width" type="submit"
                        outline rounded></q-btn>

                    <q-btn label="Cancelar" class="full-width" color="primary" type="button" rounded flat
                        v-close-popup />
                </q-card-actions>
            </q-form>
        </q-card>
    </q-dialog>
</template>

<script lang="ts">
import { useDialogPluginComponent } from 'quasar';
import { defineComponent, onMounted, ref } from 'vue'
import DatePicker from 'src/components/DatePicker.vue'
import TimePicker from 'src/components/TimePicker.vue'
import MoneyField from 'src/components/MoneyField.vue'
import { ErrorResponse } from 'src/model/error';
import useNotify from '../composable/useNotify';
import { useTransferenciaStore } from 'src/stores/transferencia-store';
import { Transferencia, transferenciaBase, transferenciaRules } from 'src/model/transferencia';
import { useContaStore } from 'src/stores/conta-store';
import { clone } from 'src/model/objeto-helper';

export default defineComponent({
    name: 'TransferenciaForm',
    components: {
        DatePicker,
        TimePicker,
        MoneyField
    },
    setup() {
        const { notifySuccess, notifyError } = useNotify();
        const { dialogRef, onDialogHide, onDialogCancel } = useDialogPluginComponent()
        const transferenciaStore = useTransferenciaStore()
        const contaStore = useContaStore()
        const loading = ref(false);
        const form = ref<Transferencia>(clone(transferenciaBase))

        const submit = async () => {
            try {
                loading.value = true
                await transferenciaStore.transferir(form.value)
                notifySuccess("Transfêrencia com sucesso");
                form.value = clone(transferenciaBase)
                onDialogCancel()
            } catch (error) {
                const err = error as ErrorResponse
                notifyError(err.message);
            } finally {
                loading.value = false;
            }
        }

        onMounted(async () => contaStore.listar())

        return {
            form,
            submit,
            loading,
            dialogRef,
            contaStore,
            onDialogHide,
            onDialogCancel,
            rules: transferenciaRules,
        }
    },
})
</script>
