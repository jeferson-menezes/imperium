<template>
    <q-page padding>
        <div class="row justify-center">
            <q-table class="col-12" title="Lista de categorias" row-key="id" :rowsPerPage="20" :loading="loading"
                :columns="columnsCategoria" :rows="categoriaStore.categorias"
                :rows-per-page-options="[10, 20, 30, 40, 0]">

                <template v-slot:top>
                    <div class="text-h6">Categorias</div>
                    <q-space></q-space>
                    <q-btn v-if="$q.platform.is.desktop" label="novo" icon="mdi-plus" color="primary"
                        :to="{ name: 'categoria-form' }" />
                </template>

                <template v-slot:body-cell-icone="props">
                    <q-td :props="props" class="q-gutter-x-sm">
                        <q-icon :color="props.row.cor" :name="'mdi-' + props.row.icone" size="3em" />
                    </q-td>
                </template>

                <template v-slot:body-cell-natureza="props">
                    <q-td :props="props" class="q-gutter-x-sm">
                        <q-badge rounded :color="props.row.natureza === 'RECEITA' ? 'green' : 'red'"
                            :label="props.row.natureza" />
                    </q-td>
                </template>

                <template v-slot:body-cell-ativo="props">
                    <q-td :props="props" class="q-gutter-x-sm">
                        <q-badge :color="props.row.ativo ? 'green' : 'red'" rounded class="q-mr-sm" />
                    </q-td>
                </template>

                <template v-slot:body-cell-acoes="props">
                    <q-td :props="props" class="q-gutter-x-sm">
                        <q-btn icon="mdi-pencil-outline" color="info" dense :to="{
                            name: 'categoria-form',
                            params: { id: props.row.id },
                        }">
                            <q-tooltip> Editar </q-tooltip>
                        </q-btn>
                        <q-btn icon="mdi-delete-outline" color="negative" dense>
                            <q-tooltip> Deletar </q-tooltip>
                        </q-btn>
                    </q-td>
                </template>

            </q-table>
        </div>

        <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn v-if="$q.platform.is.mobile" fab icon="mdi-plus" color="primary" :to="{ name: 'categoria-form' }">
            </q-btn>
        </q-page-sticky>
    </q-page>
</template>

<script lang="ts">
import { columnsCategoria } from 'src/model/columns';
import { useCategoriaStore } from 'src/stores/categoria-store';
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
    name: 'CategoriasPage',
    setup() {
        const loading = ref(false);
        const categoriaStore = useCategoriaStore()

        const listaCategorias = async () => {
            loading.value = true;
            await categoriaStore.listar().finally(() => (loading.value = false))
        }

        onMounted(() => listaCategorias())

        return {
            loading,
            columnsCategoria,
            categoriaStore
        }
    },
})
</script>
