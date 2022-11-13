<template>
    <q-page padding>
        <div class="row justify-center">
            <q-table class="col-12" title="Lista de proventos" hide-bottom row-key="id" :loading="loading"
                :columns="columnsProvento" :rows="proventoStore.proventosPage?.content" :rows-per-page-options="[0]">

                <template v-slot:top>
                    <div class="row col-sm-8 col-xs-12 start content-start">
                    </div>
                    <q-space></q-space>
                    <q-btn v-if="$q.platform.is.desktop" label="novo" icon="mdi-plus" color="primary"
                        :to="{ name: 'provento-form' }" />

                </template>

                <template v-slot:body-cell-ativoCodigo="props">
                    <q-td :props="props">
                        {{ props.row.ativoCodigo }} - {{ props.row.ativoNome }}
                    </q-td>
                </template>

                <template v-slot:body-cell-precoUnitario="props">
                    <q-td :props="props" class="q-gutter-x-sm">
                        {{ toReal(props.row.precoUnitario) }}
                    </q-td>
                </template>

                <template v-slot:body-cell-valorLiquido="props">
                    <q-td :props="props" class="q-gutter-x-sm">
                        {{ toReal(props.row.valorLiquido) }}
                    </q-td>
                </template>

                <template v-slot:body-cell-pagoEm="props">
                    <q-td :props="props" class="q-gutter-x-sm">
                        {{ formatDate(props.row.pagoEm, 'DD MMM YYYY') }}
                    </q-td>
                </template>

                <template v-slot:body-cell-evento="props">
                    <q-td :props="props" class="q-gutter-x-sm">
                        {{ eventoTexto(props.row.evento) }}
                    </q-td>
                </template>

                <template v-slot:body-cell-acoes="props">
                    <q-td :props="props" class="q-gutter-x-sm">

                        <q-btn icon="mdi-pencil-outline" color="info" dense :to="{
                            name: 'provento-form',
                            params: { id: props.row.id },
                        }">
                            <q-tooltip> Editar ativo</q-tooltip>
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
                                <q-pagination @click="listar" v-model="page"
                                    :max="proventoStore?.proventosPage?.totalPages || 0" :max-pages="6"
                                    :boundary-numbers="false" gutter="sm" />
                            </div>
                        </q-td>
                    </q-tr>
                </template>
            </q-table>

        </div>

        <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn v-if="$q.platform.is.mobile" fab icon="mdi-plus" color="primary" :to="{ name: 'provento-form' }">
            </q-btn>
        </q-page-sticky>
    </q-page>
</template>

<script lang="ts">
import { columnsProvento } from 'src/model/columns'
import { toRealSymbol } from 'src/model/currency-helper'
import { formatDate } from 'src/model/date-helper'
import { Direction } from 'src/model/paginacao'
import { eventoTexto } from 'src/model/provento'
import { useProventoStore } from 'src/stores/provento-store'
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
    name: 'ProventosPage',
    setup() {
        const proventoStore = useProventoStore()
        const page = ref(1)
        const ativoId = ref(undefined)
        const loading = ref(false)

        const listar = () => {
            loading.value = true
            proventoStore.listarPage(params())
                .finally(() => (loading.value = false))
        }

        const params = () => {
            return {
                page: page.value - 1,
                size: 10,
                sort: `pagoEm,${Direction.DESC}`,
                ativoId: ativoId.value
            }
        }

        onMounted(() => {
            listar()
        })

        return {
            page,
            listar,
            loading,
            formatDate,
            proventoStore,
            columnsProvento,
            toReal: toRealSymbol,
            eventoTexto: (v: string) => eventoTexto[v]
        }
    },
})
</script>
