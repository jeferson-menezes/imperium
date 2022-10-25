<template>
    <q-page padding>

        <q-carousel v-model="slide" transition-prev="scale" transition-next="scale" swipeable animated
            control-color="white" navigation padding arrows height="250px"
            class="bg-primary text-white shadow-1 rounded-borders">

            <q-carousel-slide name="style" class="column no-wrap">
                <div class="row items-center q-gutter-md">
                    <q-icon :color="conta.tipoContaCor" :name="'mdi-' + conta.tipoContaIcone" size="56px" />
                    <div class="text-h6">
                        {{ conta.tipoContaNome }}
                    </div>
                </div>
                <div class="q-mt-md">
                    <div class="text-caption">Saldo</div>
                    <div class="text-h6">
                        {{ toReal(conta.saldo) }}
                    </div>
                </div>
                <div class="q-mt-md">
                    <div class="text-caption">{{ conta.descricao }}</div>
                </div>
            </q-carousel-slide>

            <q-carousel-slide name="tv" class="column no-wrap flex-center">
                <q-icon name="live_tv" size="56px" />
                <div class="q-mt-md text-center">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia dolore sit earum expedita culpa enim
                    accusantium porro ad soluta nostrum nobis eveniet laudantium, sunt quaerat optio veniam corporis
                    ipsa
                    facilis?
                </div>
            </q-carousel-slide>

        </q-carousel>

        <div class="row q-col-gutter-sm q-my-md">
            <div class="col-xs-12 col-sm-6">
                <ContaTimeline :contaId="$route.params.id" />
            </div>
            <div class="col-xs-12 col-sm-6">
                <!-- <HistoricoTimeline /> -->
            </div>
        </div>
    </q-page>
</template>

<script lang="ts">
import { Conta } from 'src/model/conta'
import { toRealSymbol } from 'src/model/currency-helper'
import { useContaStore } from 'src/stores/conta-store'
import { computed, defineComponent, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import ContaTimeline from './ContaTimeline.vue'

export default defineComponent({
    name: 'ContaDetalhePage',
    components: { ContaTimeline },
    setup() {
        const route = useRoute()
        const contaStore = useContaStore()
        const contaId = computed(() => route.params.id);
        const conta = ref({} as Conta)

        const detalharConta = async () => {
            conta.value = await contaStore.detalhar(contaId.value as string)
        }

        onMounted(() => {
            detalharConta()
        })

        return {
            conta,
            slide: ref("style"),
            toReal: toRealSymbol
        }
    },
})
</script>
