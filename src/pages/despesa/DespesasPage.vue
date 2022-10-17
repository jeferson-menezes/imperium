<template>
    <q-page padding>
        <div class="row justify-center">

            <q-table class="col-12" title="Lista de categorias" hide-bottom row-key="id" :rowsPerPage="20"
                :loading="loading" :columns="columnsDespesa" :rows="despesaStore.despesasPage?.content">

                <template v-slot:top-left>
                    <q-input borderless dense debounce="600" v-model="filter" placeholder="Search"
                        @update:model-value="filterChange">
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

                <template v-slot:body-cell-data="props">
                    <q-td :props="props" class="q-gutter-x-sm">
                        {{formatDate(props.row.data, 'DD MMM YYYY')}}
                    </q-td>
                </template>

                <template v-slot:body-cell-acoes="props">
                    <q-td :props="props" class="q-gutter-x-sm">
                        <q-btn icon="mdi-pencil-outline" color="info" dense
                            :to="{name: 'despesa-form', params: { id: props.row.id }}">
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
                                <q-pagination @update:model-value="pageChange" v-model="pageable.page"
                                    :max="despesaStore?.despesasPage?.totalPages || 0" />
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
import { identifier } from '@babel/types';
import { columnsDespesa } from 'src/model/columns';
import { toRealSymbol } from 'src/model/currency-helper';

import { formatDate } from 'src/model/date-helper';
import { FilterEhAno, FilterEhData, FilterEhMes, FilterEhTexto, FilterEhValor, FilterVazio } from 'src/model/filtro-chain';
import { Pageable, Direction } from 'src/model/paginacao';
import { ehData, ehMes, ehValor, ehAno } from 'src/model/pattern-helper';
import { useDespesaStore } from 'src/stores/despesa-store';
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
    setup() {
        const loading = ref(false);
        const despesaStore = useDespesaStore()
        const filter = ref('')
        const pageable = ref<Pageable>({
            page: 0,
            size: 5,
            sort: `data,${Direction.DESC}`
        })

        const pageChange = (e: number) => {
            console.log('Page');

            loading.value = true
            pageable.value.page = (e - 1)
            despesaStore.listarPage(pageable.value)
                .finally(() => (loading.value = false))
        }

        const filterChange = () => {
            const pattern = new FilterEhAno(new FilterEhMes(new FilterEhData(new FilterEhValor(new FilterEhTexto(new FilterVazio())))));

            loading.value = true
            // pageable.value.page = 0
            const params = Object.assign(pattern.verifica(filter.value), pageable.value)
            console.log(params);

            despesaStore.listarPage(params)
                .finally(() => (loading.value = false))
        }

        onMounted(() => despesaStore.listarPage(pageable.value)
            .finally(() => (loading.value = false)))

        return { columnsDespesa, despesaStore, loading, filter, pageChange, toReal: toRealSymbol, formatDate, pageable, filterChange }
    },
})
</script>
