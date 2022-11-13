<template>
    <q-page padding>
        <div class="row justify-center">
            <div class="col-12 text-center">
                <p class="text-h6">
                    {{ isUpdate ? "Atualizar" : "Cadastrar" }} provento
                </p>
            </div>

            <q-form class="col-md-6 col-sm-10 col-xs-12 q-gutter-y-md" ref="formRef" @submit.prevent="submit">

                <q-input label="Quantidade" v-model="form.quantidade" lazy-rules :rules="rules.quantidade"></q-input>

                <MoneyField label="Valor" v-model="form.precoUnitario" />

                <MoneyField label="Valor" v-model="form.valorLiquido" />

                <div class="row justify-between  content-start">
                    <div class="col q-mr-sm">
                        <DatePicker v-model="form.pagoEm" />
                    </div>
                    <div class="col q-ml-sm">
                        <DatePicker v-model="form.aprovadoEm" />
                    </div>
                </div>

                <q-select map-options emit-value v-model="form.evento" :options="eventos" :rules="rules.evento"
                    label="Evento" />

                <q-select filled v-model="form.ativoId" use-input input-debounce="0" label="Simple filter"
                    :options="ativoStore.ativos" @filter="filterFn" style="width: 250px" behavior="menu">
                    <template v-slot:no-option>
                        <q-item>
                            <q-item-section class="text-grey">
                                No results
                            </q-item-section>
                        </q-item>
                    </template>
                </q-select>

            </q-form>

        </div>
    </q-page>
</template>

<script lang="ts">
import { clone } from 'src/model/objeto-helper';
import { required } from 'src/model/rules';
import { useProventoStore } from 'src/stores/provento-store';
import { computed, defineComponent, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';

import DatePicker from 'src/components/DatePicker.vue'
import MoneyField from 'src/components/MoneyField.vue'
import { Evento } from 'src/model/provento';
import { useAtivoStore } from 'src/stores/ativo-store';

export default defineComponent({
    name: 'ProventoFormPage',
    components: { DatePicker, MoneyField },
    setup() {
        const route = useRoute()
        const router = useRouter()
        const proventoStore = useProventoStore()
        const ativoStore = useAtivoStore()

        const loading = ref(false);

        const model = {
            id: 0,
            evento: undefined,
            pagoEm: new Date().toISOString().substring(0, 10),
            quantidade: 0,
            aprovadoEm: new Date().toISOString().substring(0, 10),
            valorLiquido: 0,
            precoUnitario: 0,
            ativoId: 0,
        }
        const form = ref(clone(model))
        const rules = {
            evento: [required("O evento é obrigatório")],
            pagoEm: [required("O evento é obrigatório")],
            quantidade: [required("O evento é obrigatório")],
            aprovadoEm: [required("O evento é obrigatório")],
            valorLiquido: [required("O evento é obrigatório")],
            precoUnitario: [required("O evento é obrigatório")],
            ativoId: [required("O evento é obrigatório")],
        }

        const isUpdate = computed(() => route.params.id);

        const submit = async () => {
            try {
                console.log(form.value);
            } catch (error) {

            }
        }

        const filterFn = (val: any, update: any) => {
            console.log(val);
            console.log(update);

            // if (val === '') {
            //     update(() => {
            //         options.value = stringOptions
            //     })
            //     return
            // }

            // update(() => {
            //     const needle = val.toLowerCase()
            //     options.value = stringOptions.filter(v => v.toLowerCase().indexOf(needle) > -1)
            // })
        }

        return {
            form,
            rules,
            submit,
            loading,
            filterFn,
            isUpdate,
            ativoStore,
            eventos: Object.keys(Evento)
        }
    },
})
</script>
