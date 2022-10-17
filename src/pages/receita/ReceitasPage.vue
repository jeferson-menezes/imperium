<template>
    <q-page padding>
        <div class="row justify-center">
            <q-table class="col-12" title="Lista de categorias" hide-bottom row-key="id" :rowsPerPage="20"
                :loading="loading" :columns="columnsReceita" :rows="receitaStore.receitasPage?.content">

                <template v-slot:top-left>
                    <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
                        <template v-slot:append>
                            <q-icon name="search" />
                        </template>
                    </q-input>
                </template>

                <template v-slot:top-right>
                    <q-btn v-if="$q.platform.is.desktop" label="novo" icon="mdi-plus" color="primary"
                        :to="{ name: 'receita-form' }" />
                </template>

                <template v-slot:body-cell-valor="props">
                    <q-td :props="props" class="q-gutter-x-sm">
                        <q-chip outline square color="green" text-color="white" :label="toReal(props.row.valor)" />
                    </q-td>
                </template>

                <template v-slot:body-cell-data="props">
                    <q-td :props="props" class="q-gutter-x-sm">
                        {{formatDate(props.row.data, 'DD MMM YYYY')}}
                    </q-td>
                </template>

                <template v-slot:body-cell-acoes="props">
                    <q-td :props="props" class="q-gutter-x-sm">
                        <q-btn icon="mdi-pencil-outline" color="info" dense :to="{
                            name: 'receita-form',
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
                                <q-pagination :to-fn="pageChange" v-model="receitaStore.receitasPage.size"
                                    :max="receitaStore.receitasPage.totalPages" />
                            </div>
                        </q-td>
                    </q-tr>
                </template>
            </q-table>
        </div>
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn v-if="$q.platform.is.mobile" fab icon="mdi-plus" color="primary" :to="{ name: 'receita-form' }">
            </q-btn>
        </q-page-sticky>
    </q-page>
</template>

<script lang="ts">
import { columnsReceita } from 'src/model/columns';
import { toRealSymbol } from 'src/model/currency-helper';
import { formatDate } from 'src/model/date-helper';
import { useReceitaStore } from 'src/stores/receita-store';
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
    name: 'ReceitasPage',
    setup() {
        const loading = ref(false);
        const filter = ref('')
        const receitaStore = useReceitaStore()

        const pageChange = (e: number) => {
            console.log(e);
        }

        onMounted(() => receitaStore.listarPage({ page: 0, size: 5 }))

        return {
            columnsReceita,
            receitaStore,
            loading,
            filter,
            pageChange,
            toReal: toRealSymbol,
            formatDate
        }
    },
})
</script>
