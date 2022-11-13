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
            </q-table>

        </div>
    </q-page>
</template>

<script lang="ts">
import { columnsProvento } from 'src/model/columns'
import { Direction } from 'src/model/paginacao'
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
            loading,
            proventoStore,
            columnsProvento
        }
    },
})
</script>
