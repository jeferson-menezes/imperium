<template>
    <q-page>
        <q-card>
            <q-card-section>
                <div class="row items-center no-wrap">
                    <div class="col text-h5">
                        <q-avatar>
                            <q-icon name="mdi-history" :size="'lg'" color="purple"></q-icon>
                        </q-avatar>
                        Transferências
                    </div>
                    <div class="col-auto">
                        <TransferenciaForm />
                    </div>
                </div>
            </q-card-section>

            <q-card-section>

                <q-list v-for="item in transferenciaStore.tranferenciasPage.content" :key="item.id">
                    <q-item>

                        <q-item-section avatar>
                            <q-avatar>
                                <q-icon :name="'mdi-'+item?.contaOrigemTipo?.icone"
                                    :color="item.contaOrigemTipo?.cor" />
                            </q-avatar>
                        </q-item-section>

                        <q-item-section>
                            <q-item-label>
                                {{item.contaOrigemNome}}
                                <q-icon :name="'mdi-swap-horizontal'" size="sm" /> {{item.contaDestinoNome}}
                                <q-chip outline square color="blue" text-color="white" :label="toReal(item.valor)" />
                            </q-item-label>
                            <q-item-label caption lines="1">
                                {{item.descricao}} -
                                {{formatDate(item.data, 'DD MMM YYYY')}} às {{item.hora}}
                            </q-item-label>
                        </q-item-section>

                        <q-item-section side top>
                            <q-icon :name="'mdi-' +item?.contaDestinoTipo?.icone"
                                :color="item?.contaDestinoTipo?.cor" />
                        </q-item-section>

                    </q-item>
                    <q-separator spaced inset />

                </q-list>

            </q-card-section>

            <q-card-actions class="q-pb-md flex flex-center">
                <q-pagination @click="listar" v-model="page"
                    :max="transferenciaStore?.tranferenciasPage?.totalPages || 0" />
            </q-card-actions>

        </q-card>
    </q-page>
</template>

<script lang="ts">
import { toRealSymbol } from 'src/model/currency-helper'
import { formatDate } from 'src/model/date-helper'
import { Direction } from 'src/model/paginacao'
import { useTransferenciaStore } from 'src/stores/transferencia-store'
import { defineComponent, onMounted, ref } from 'vue'
import TransferenciaForm from './TransferenciaForm.vue'

export default defineComponent({

    name: 'TransferenciasList',

    components: { TransferenciaForm },

    setup() {
        const transferenciaStore = useTransferenciaStore()
        const page = ref(1)
        const loading = ref(false);

        const params = () => {
            return {
                page: page.value - 1,
                size: 5,
                sort: `data,${Direction.DESC}`,
            }
        }

        const listar = () => {
            loading.value = true
            transferenciaStore.listar(params())
                .finally(() => (loading.value = false))
        }

        onMounted(() => transferenciaStore.listar(params()).finally(() => (loading.value = false)))

        return { transferenciaStore, toReal: toRealSymbol, formatDate, page, listar }
    }
})
</script>
