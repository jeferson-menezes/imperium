<template>
    <q-page padding>
        <div class="q-my-md">
            <q-carousel v-model="slide" transition-prev="scale" transition-next="scale" swipeable animated
                control-color="white" navigation padding arrows height="300px"
                class="bg-primary text-white shadow-1 rounded-borders">
                <q-carousel-slide name="style" class="column no-wrap">
                    <q-icon name="style" size="56px" />
                    <div class="q-mt-md">
                        <div class="text-h6">
                            {{ toReal(contaStore.totalNaSoma) }}
                        </div>
                        <div class="text-caption">Incluidas nas somas</div>
                    </div>
                    <div class="q-mt-md">
                        <div class="text-h6">
                            {{ toReal(contaStore.totalSemSoma) }}
                        </div>
                        <div class="text-caption">Soma das demais contas</div>
                    </div>
                </q-carousel-slide>

                <q-carousel-slide name="tv" class="column no-wrap flex-center">
                    <q-icon name="live_tv" size="56px" />
                    <div class="q-mt-md text-center">
                        {{ lorem }}
                    </div>
                </q-carousel-slide>

                <q-carousel-slide name="layers" class="column no-wrap flex-center">
                    <q-icon name="layers" size="56px" />
                    <div class="q-mt-md text-center">
                        {{ lorem }}
                    </div>
                </q-carousel-slide>

                <q-carousel-slide name="map" class="column no-wrap flex-center">
                    <q-icon name="terrain" size="56px" />
                    <div class="q-mt-md text-center">
                        {{ lorem }}
                    </div>
                </q-carousel-slide>
            </q-carousel>
        </div>
        <div class="row justify-center">
            <q-table class="col-12" title="Lista de provetos" row-key="id" :loading="loading" :columns="columnsConta"
                :rows="contaStore.contas" :rows-per-page-options="[10, 20, 30, 0]">

                <template v-slot:top>
                    <div class=" text-h6">Contas
                    </div>
                    <q-space></q-space>
                    <q-btn v-if="$q.platform.is.desktop" label="novo" icon="mdi-plus" color="primary"
                        :to="{ name: 'conta-form' }" />
                </template>

                <template v-slot:body-cell-tipoContaIcone="props">
                    <q-td :props="props" class="q-gutter-x-sm">
                        <q-icon :color="props.row.tipoContaCor" :name="'mdi-' + props.row.tipoContaIcone" size="3em" />
                    </q-td>
                </template>

                <template v-slot:body-cell-saldo="props">
                    <q-td :props="props" class="q-gutter-x-sm">
                        <q-chip outline square color="blue" text-color="white" :label="toReal(props.row.saldo)" />
                    </q-td>
                </template>
                <template v-slot:body-cell-ativo="props">
                    <q-td :props="props" class="q-gutter-x-sm">
                        <q-badge :color="props.row.ativo ? 'green' : 'red'" rounded class="q-mr-sm" />
                    </q-td>
                </template>

                <template v-slot:body-cell-acoes="props">
                    <q-td :props="props" class="q-gutter-x-sm">

                        <q-btn icon="mdi-chart-timeline" color="purple" dense :to="{
                            name: 'conta-detalhe',
                            params: { id: props.row.id }
                        }">
                            <q-tooltip> Detalhes </q-tooltip>
                        </q-btn>

                        <q-btn icon="mdi-pencil-outline" color="info" dense :to="{
                            name: 'conta-form',
                            params: { id: props.row.id }
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

        <div class="row q-col-gutter-sm q-my-md">
            <div class="col-xs-12 col-sm-6">
                <TransferenciasList />
            </div>
            <div class="col-xs-12 col-sm-6">
                <HistoricoTimeline />
            </div>
        </div>

        <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn v-if="$q.platform.is.mobile" fab icon="mdi-plus" color="primary" :to="{ name: 'conta-form' }">
            </q-btn>
        </q-page-sticky>
    </q-page>
</template>

<script lang="ts">
import { columnsConta } from "src/model/columns";
import { toRealSymbol } from "src/model/currency-helper";
import { useContaStore } from "src/stores/conta-store";
import { defineComponent, onMounted, ref } from "vue";
import HistoricoTimeline from './HistoricoTimeline.vue';
import TransferenciasList from './TransferenciasList.vue';

export default defineComponent({
    name: "ContasPage",
    components: { TransferenciasList, HistoricoTimeline },
    setup() {
        const loading = ref(false);
        const contaStore = useContaStore();

        const listaContas = async () => {
            loading.value = true;
            await contaStore.listar().finally(() => (loading.value = false));
        };

        onMounted(() => listaContas());

        return {
            loading,
            contaStore,
            columnsConta,
            toReal: toRealSymbol,
            slide: ref("style"),
            lorem: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo.",
        };
    },
});
</script>
