<template>
    <q-page padding>
        <div class="row justify-center">
            <q-table class="col-12" title="Meus investimentos" row-key="id" :loading="loading" :columns="columnsPosicao"
                :rows="posicaoStore.posicoes" :rows-per-page-options="[10, 20, 30, 0]">

                <template v-slot:top>
                    <div class="text-h6">Meus investimentos </div>
                    <q-space></q-space>
                    <q-btn v-if="$q.platform.is.desktop" label="novo" icon="mdi-plus" color="primary"
                        :to="{ name: 'negociacao-form' }" />
                </template>

                <template v-slot:body-cell-imagem="props">
                    <q-td :props="props">
                        <AvatarImagem :imagemId="props.row.ativoImagemId" />
                    </q-td>
                </template>

                <template v-slot:body-cell-ativoCodigo="props">
                    <q-td :props="props">
                        {{ props.row.ativoCodigo }} - {{ props.row.ativoNome }}
                    </q-td>
                </template>

                <template v-slot:body-cell-valorTotal="props">
                    <q-td :props="props" class="q-gutter-x-sm">
                        {{ toReal(props.row.valorTotal) }}
                    </q-td>
                </template>

                <template v-slot:body-cell-custoMedio="props">
                    <q-td :props="props" class="q-gutter-x-sm">
                        {{ toReal(currency(props.row.valorTotal).divide(props.row.quantidade)) }}
                    </q-td>
                </template>

            </q-table>
        </div>

        <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn v-if="$q.platform.is.mobile" fab icon="mdi-plus" color="primary" :to="{ name: 'negociacao-form' }">
            </q-btn>
        </q-page-sticky>
    </q-page>
</template>

<script lang="ts">
import AvatarImagem from 'src/components/AvatarImagem.vue';
import currency from 'currency.js';
import { columnsPosicao } from 'src/model/columns';
import { toRealSymbol } from 'src/model/currency-helper';
import { usePosicaoStore } from 'src/stores/posicao-store';
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
    name: 'PosicoesPage',
    components: {
        AvatarImagem
    },
    setup() {
        const posicaoStore = usePosicaoStore()
        const loading = ref(false)

        onMounted(() => {
            posicaoStore.listar()
        })

        return {
            loading,
            currency,
            posicaoStore,
            columnsPosicao,
            toReal: toRealSymbol,
        }
    },
})
</script>
