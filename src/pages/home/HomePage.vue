<template>
    <q-page padding>

        <div class="row column-xs q-gutter-md">
            <div class="col col-xs-12 text-right">
                <MonthPicker @change="listar" v-model="hoje">
                </MonthPicker>
            </div>
        </div>

        <div class="row justify-center items-center content-center">
            <div class="col-sm-6 col-md-3 col-12 q-pa-sm">
                <q-card>
                    <q-item>
                        <q-item-section avatar>
                            <q-avatar>
                                <q-icon color="green" name="payments" size="2em" />
                            </q-avatar>
                        </q-item-section>

                        <q-item-section>
                            <q-item-label class="text-h6">Receita</q-item-label>
                            <q-item-label caption>
                                <div class="row">
                                    <div class="col text-subtitle2">Total: {{ toReal(receitaStore.somaReceitas) }}</div>
                                    <div class="col text-subtitle2">Entradas: {{ receitaStore.totalReceitas }}</div>
                                </div>
                            </q-item-label>
                        </q-item-section>
                    </q-item>
                    <AreaChart :color="colorReceita" :data="receitaStore.valores" />
                </q-card>
            </div>
            <div class="col-sm-6 col-md-3 col-12 q-pa-sm">
                <q-card>
                    <q-item>
                        <q-item-section avatar>
                            <q-avatar>
                                <q-icon color="teal" name="balance" size="2em" />
                            </q-avatar>
                        </q-item-section>

                        <q-item-section>
                            <q-item-label class="text-h6">Balanço</q-item-label>
                            <q-item-label caption>
                                <div class="row">
                                    <div class="col text-subtitle2">
                                        Total:{{ toReal(receitaStore.somaReceitas.subtract(despesaStore.somaDespesas))
                                        }}
                                    </div>
                                    <div class="col"></div>
                                </div>
                            </q-item-label>
                        </q-item-section>
                    </q-item>

                    <AreaChart :color="colorReceita" :data="[]" />
                </q-card>
            </div>
            <div class="col-sm-6 col-md-3 col-12 q-pa-sm">
                <q-card>
                    <q-item>
                        <q-item-section avatar>
                            <q-avatar>
                                <q-icon color="orange" name="mdi-card" size="2em" />
                            </q-avatar>
                        </q-item-section>

                        <q-item-section>
                            <q-item-label class="text-h6">Cartão</q-item-label>
                            <q-item-label caption>
                                <div class="row">
                                    <div class="col text-subtitle2">
                                        Total:{{ toReal(0) }}
                                    </div>
                                    <div class="col"></div>
                                </div>
                            </q-item-label>
                        </q-item-section>
                    </q-item>

                    <AreaChart :color="colorReceita" :data="[]" />
                </q-card>
            </div>

            <div class="col-sm-6 col-md-3 col-12 q-pa-sm">
                <q-card>
                    <q-item>
                        <q-item-section avatar>
                            <q-avatar>
                                <q-icon color="red" name="mdi-cart" size="2em" />
                            </q-avatar>
                        </q-item-section>

                        <q-item-section>
                            <q-item-label class="text-h6">Despesas</q-item-label>
                            <q-item-label caption>
                                <div class="row">
                                    <div class="col text-subtitle2">Total: {{ toReal(despesaStore.somaDespesas) }}</div>
                                    <div class="col text-subtitle2">Saidas: {{ despesaStore.totalDespesas }}</div>
                                </div>
                            </q-item-label>
                        </q-item-section>
                    </q-item>
                    <AreaChart :color="colorDespesa" :data="despesaStore.valores" />
                </q-card>
            </div>
        </div>

        <div class="row justify-between items-center content-center">
            <div class="col-md-6 col-12 q-pa-sm">
                <q-card>
                    <q-card-section class="text-h6">
                        Despesas por categorias
                    </q-card-section>
                    <DonutChart :data="despesaStore.agruparCategorias" />
                </q-card>
            </div>
            <div class="col-md-6 col-12 q-pa-sm">
                <q-card>
                    <q-card-section class="text-h6">
                        Receitas por categorias
                    </q-card-section>
                    <DonutChart :data="receitaStore.agruparCategorias" />
                </q-card>
            </div>
        </div>

        <div class="row justify-between items-center content-center ">
            <div class="col-md-6 col-12 q-pa-sm">
                <q-card>
                    <q-card-section class="text-h6">
                        Despesas por categorias
                    </q-card-section>
                    <ColumnChart :data="despesaStore.agruparCategorias" />
                </q-card>
            </div>
            <div class="col-md-6 col-12 q-pa-sm">
                <q-card>
                    <q-card-section class="text-h6">
                        Receitas por categorias
                    </q-card-section>
                    <ColumnChart :data="receitaStore.agruparCategorias" />
                </q-card>
            </div>
        </div>
    </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import MonthPicker from 'src/components/MonthPicker.vue'
import { useDespesaStore } from "src/stores/despesa-store";
import { useReceitaStore } from "src/stores/receita-store";
import { toRealSymbol } from "src/model/currency-helper";
import AreaChart from './AreaChart.vue'
import DonutChart from './DonutChart.vue'
import ColumnChart from './ColumnChart.vue'
export default defineComponent({
    name: "HomePage",

    components: {
        MonthPicker,
        AreaChart,
        DonutChart,
        ColumnChart
    },

    setup() {
        const despesaStore = useDespesaStore()
        const receitaStore = useReceitaStore()
        const hoje = ref(new Date().toLocaleString().substring(3, 10))
        const colorDespesa = '#f72047'
        const colorReceita = '#20f740'

        const listar = () => {
            const mes = hoje.value.split('/').reverse().join('-')
            despesaStore.listar({ mes })
            receitaStore.listar({ mes })
        }

        onMounted(() => listar())

        return {
            hoje,
            listar,

            colorDespesa,
            colorReceita,
            despesaStore,
            receitaStore,
            toReal: toRealSymbol
        }
    }
});
</script>
