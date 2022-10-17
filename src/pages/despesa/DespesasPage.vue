<template>
    <q-page padding>
        <div class="row justify-center">
            <q-table class="col-12" title="Lista de categorias" hide-bottom row-key="id" :rowsPerPage="20"
                :loading="loading" :columns="columnsDespesa" :rows="despesaStore.despesasPage?.content">

                <template v-slot:top-left>
                    <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
                        <template v-slot:append>
                            <q-icon name="search" />
                        </template>
                    </q-input>
                </template>

                <template v-slot:top-right>
                    <q-btn v-if="$q.platform.is.desktop" label="novo" icon="mdi-plus" color="primary"
                        :to="{ name: 'despesa-form' }" />
                </template>

                <template v-slot:body-cell-valor="props">
                    <q-td :props="props" class="q-gutter-x-sm">
                        <q-chip outline square color="red" text-color="white" :label="toReal(props.row.valor)" />
                    </q-td>
                </template>

                <template v-slot:body-cell-concluida="props">
                    <q-td :props="props" class="q-gutter-x-sm">
                        <q-badge :color="props.row.concluida? 'green' :'red'" rounded class="q-mr-sm" />
                    </q-td>
                </template>

                <template v-slot:body-cell-acoes="props">
                    <q-td :props="props" class="q-gutter-x-sm">
                        <q-btn icon="mdi-pencil-outline" color="info" dense :to="{
                            name: 'despesa-form',
                            params: { id: props.row.id },
                        }">
                            <q-tooltip> Editar </q-tooltip>
                        </q-btn>
                        <q-btn icon="mdi-delete-outline" color="negative" dense>
                            <q-tooltip> Deletar </q-tooltip>
                        </q-btn>
                    </q-td>
                </template>

                <template v-slot:bottom-row>
                    <q-tr>
                        <q-td colspan="100%">
                            <div class="q-pa-md flex flex-center">
                                <q-pagination :to-fn="pageChange" v-model="despesaStore.despesasPage.size"
                                    :max="despesaStore.despesasPage.totalPages" />
                            </div>
                        </q-td>
                    </q-tr>
                </template>
            </q-table>
        </div>
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn v-if="$q.platform.is.mobile" fab icon="mdi-plus" color="primary" :to="{ name: 'despesa-form' }">
            </q-btn>
        </q-page-sticky>
    </q-page>
</template>

<script lang="ts">
import { columnsDespesa } from 'src/model/columns';
import { toRealSymbol } from 'src/model/currency-helper';

import { useDespesaStore } from 'src/stores/despesa-store';
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
    setup() {
        const loading = ref(false);
        const despesaStore = useDespesaStore()
        const filter = ref('')

        const pageable = {
            value: 0,
            size: 0,
            page: 0
        }

        const pageChange = (e: any) => {
            console.log(e);
        }

        onMounted(() => despesaStore.listarPage())

        return { columnsDespesa, despesaStore, loading, filter, pageChange, toReal: toRealSymbol }
    },
})
</script>
