<template>
    <q-page padding>
        <div class="row justify-center">
            <div class="col-12 text-center">
                <p class="text-h6">
                    {{ isUpdate ? "Atualizar" : "Cadastrar" }} provento
                </p>
            </div>

            <q-form class="col-md-6 col-sm-10 col-xs-12 q-gutter-y-md" ref="formRef" @submit.prevent="submit">

                <q-input @blur="calcularLiquido" type="number" label="Quantidade" v-model="form.quantidade" lazy-rules
                    :rules="rules.quantidade"></q-input>

                <MoneyField @blur="calcularLiquido" label="Valor" v-model="form.precoUnitario" />

                <MoneyField label="Valor" v-model="form.valorLiquido" />

                <div class="row justify-between  content-start">
                    <div class="col q-mr-sm">
                        <DatePicker v-model="form.pagoEm" />
                    </div>
                    <div class="col q-ml-sm">
                        <DatePicker v-model="form.aprovadoEm" />
                    </div>
                </div>

                <q-select label="Evento" emit-value v-model="form.evento" :options="eventos" :rules="rules.evento">
                    <template v-slot:selected-item="scope">
                        {{ eventoTexto(scope.opt) }}
                    </template>
                    <template v-slot:option="scope">
                        <q-item v-bind="scope.itemProps">
                            <q-item-section>
                                <q-item-label>
                                    {{ eventoTexto(scope.opt) }}
                                </q-item-label>
                            </q-item-section>
                        </q-item>
                    </template>
                </q-select>

                <q-select v-model="form.ativoId" label="Ativo" option-value="id" option-label="nome" map-options
                    emit-value clearable use-input hide-selected fill-input input-debounce="0" :options="ativosOptions"
                    @filter="filterFn">
                    <template v-slot:option="scope">
                        <q-item v-bind="scope.itemProps">
                            <q-item-section>
                                <q-item-label>
                                    {{ scope.opt.codigo }}
                                </q-item-label>
                                <q-item-label caption>
                                    {{ scope.opt.nome }}
                                </q-item-label>
                            </q-item-section>
                        </q-item>
                    </template>
                    <template v-slot:no-option>
                        <q-item>
                            <q-item-section class="text-grey">
                                No results
                            </q-item-section>
                        </q-item>
                    </template>
                </q-select>

                <q-btn :label="isUpdate ? 'Atualizar' : 'Cadastrar'" :loading="loading" color="primary"
                    class="full-width" type="submit" outline rounded></q-btn>

                <q-btn label="Cancelar" class="full-width" color="primary" type="button" rounded flat
                    :to="{ name: 'proventos' }" />

            </q-form>

        </div>
    </q-page>
</template>

<script lang="ts">

import currency from "currency.js";
import DatePicker from 'src/components/DatePicker.vue';
import MoneyField from 'src/components/MoneyField.vue';
import { ErrorResponse } from "src/model/error";
import { clone } from 'src/model/objeto-helper';
import { Evento, eventoTexto, proventoBase, proventoRules } from 'src/model/provento';
import { useAtivoStore } from 'src/stores/ativo-store';
import { useProventoStore } from 'src/stores/provento-store';
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useNotify from "../composable/useNotify";

export default defineComponent({
    name: 'ProventoFormPage',
    components: { DatePicker, MoneyField },
    setup() {
        const route = useRoute()
        const router = useRouter()
        const proventoStore = useProventoStore()
        const ativoStore = useAtivoStore()
        const { notifyError, notifySuccess } = useNotify();

        const loading = ref(false);
        const ativosOptions = ref(ativoStore.ativos)
        const form = ref(clone(proventoBase))
        const isUpdate = computed(() => route.params.id);

        const submit = async () => {
            try {
                loading.value = true

                if (isUpdate.value) {
                    await proventoStore.atualizar(form.value.id, form.value);
                    notifySuccess('Atualizado com sucesso!')
                    router.push({ name: "proventos" });
                } else {
                    await proventoStore.adicionar(form.value)
                    form.value = clone(proventoBase)
                    notifySuccess('Adicionado com sucesso!')
                }
            } catch (error) {
                const err = error as ErrorResponse
                notifyError(err.message);
            } finally {
                loading.value = false
            }
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const filterFn = (val: string, update: any) => {
            update(
                () => {
                    if (val === '') {
                        ativosOptions.value = ativoStore.ativos
                    } else {
                        const needle = val.toLowerCase()
                        ativosOptions.value = ativoStore.ativos.filter(v => v.nome.toLowerCase().indexOf(needle) > -1)
                    }
                },
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (ref: any) => {
                    console.log(ref);

                    if (val !== '' && ref.options.length > 0) {
                        ref.setOptionIndex(-1) // reset optionIndex in case there is something selected
                        ref.moveOptionSelection(1, true) // focus the first selectable option and do not update the input-value
                    }
                }
            )
        }

        const calcularLiquido = () => {
            form.value.valorLiquido = currency(form.value.precoUnitario).multiply(form.value.quantidade)
        }

        onMounted(async () => {
            ativoStore.listar()
            if (isUpdate.value) {
                form.value = await proventoStore.detalhar(isUpdate.value as string)
            }
        })

        return {
            form,
            submit,
            loading,
            filterFn,
            isUpdate,
            ativoStore,
            ativosOptions,
            calcularLiquido,
            rules: proventoRules,
            eventos: Object.keys(Evento),
            eventoTexto: (v: string) => eventoTexto[v]
        }
    },
})
</script>
