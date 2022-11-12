<template>
    <q-page padding>
        <div class="row justify-center">
            <q-table class="col-12" title="Lista de proventos" hide-bottom row-key="id" :loading="loading"
                :columns="columnsProvento" :rows="proventoStore.proventosPage?.content" :rows-per-page-options="[0]">
            </q-table>

        </div>
    </q-page>
</template>

<script lang="ts">
import { columnsProvento } from 'src/model/columns'
import { useProventoStore } from 'src/stores/provento-store'
import { defineComponent, ref } from 'vue'

export default defineComponent({
    name: 'ProventosPage',
    setup() {
        const proventoStore = useProventoStore()

        const loading = ref(false)

        return {
            loading,
            proventoStore,
            columnsProvento
        }
    },
})
</script>
