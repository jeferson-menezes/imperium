<template>
    <q-page padding>
        <div class="row q-gutter-md">
            <div class="col text-right">
                <MonthPicker @change="listar" v-model="hoje">
                </MonthPicker>
            </div>
        </div>
        <div class="row q-gutter-md">
            <div class="col">

                <q-card>
                    <q-item>
                        <q-item-section avatar>
                            <q-avatar>
                                <img src="https://cdn.quasar.dev/img/avatar2.jpg">
                            </q-avatar>
                        </q-item-section>

                        <q-item-section>
                            <q-item-label>Receita</q-item-label>
                            <q-item-label caption>Total: {{ toReal(receitaStore.somaReceitas) }} Entradas: {{
                                    receitaStore.totalReceitas
                            }}</q-item-label>
                        </q-item-section>
                    </q-item>
                </q-card>
            </div>
            <div class="col">

                <q-card>
                    <q-item>
                        <q-item-section avatar>
                            <q-avatar>
                                <img src="https://cdn.quasar.dev/img/avatar2.jpg">
                            </q-avatar>
                        </q-item-section>

                        <q-item-section>
                            <q-item-label>Despesas</q-item-label>
                            <q-item-label caption>
                                Total: {{ toReal(despesaStore.somaDespesas) }} Saidas: {{
                                        despesaStore.totalDespesas
                                }}</q-item-label>
                        </q-item-section>
                    </q-item>
                </q-card>
            </div>
            <div class="col">

                <q-card>
                    <q-item>
                        <q-item-section avatar>
                            <q-avatar>
                                <img src="https://cdn.quasar.dev/img/avatar2.jpg">
                            </q-avatar>
                        </q-item-section>

                        <q-item-section>
                            <q-item-label>Balanço</q-item-label>
                            <q-item-label caption>Total:{{
                                    toReal(receitaStore.somaReceitas.subtract(despesaStore.somaDespesas))
                            }}</q-item-label>
                        </q-item-section>
                    </q-item>

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

export default defineComponent({
    name: "HomePage",

    components: {
        MonthPicker
    },

    setup() {
        const despesaStore = useDespesaStore()
        const receitaStore = useReceitaStore()
        const hoje = ref(new Date().toLocaleString().substring(3, 10))

        const listar = () => {
            const mes = hoje.value.split('/').reverse().join('-')
            despesaStore.listar({ mes })
            receitaStore.listar({ mes })
        }

        onMounted(() => listar())

        return {
            hoje,
            listar,
            despesaStore,
            receitaStore,
            toReal: toRealSymbol
        }
    }
});
</script>
