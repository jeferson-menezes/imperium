<template>
    <q-card>

        <q-item>
            <q-item-section avatar>
                <q-avatar>
                    <q-icon name="mdi-history" :size="'lg'" color="purple"></q-icon>
                </q-avatar>
            </q-item-section>

            <q-item-section>
                <q-item-label class="text-h5">Histórico de receitas</q-item-label>
            </q-item-section>
        </q-item>

        <q-card-section ref="scrollTargetRef" style="max-height: 535px; overflow: auto;">
            <q-infinite-scroll :debounce="1000" :disable="scrollDisable" :initial-index="0" @load="onLoadRef"
                :offset="100" :scroll-target="scrollTargetRef">
                <q-timeline color="secondary" layout="comfortable" side="right">
                    <q-timeline-entry :color="'green'"
                        :subtitle="formatDate(item.data + ' ' + item.hora, 'DD MMM YYYY HH:mm')"
                        v-for="item in historiaStore.historiasPage?.content" :key="item.id">
                        <div>
                            {{item.descricao}}
                        </div>
                    </q-timeline-entry>
                </q-timeline>
                <template v-slot:loading>
                    <div class="row justify-center q-my-md">
                        <q-spinner-dots color="primary" size="40px" />
                    </div>
                </template>
            </q-infinite-scroll>
        </q-card-section>

    </q-card>

</template>

<script lang="ts">
import { toRealSymbol } from 'src/model/currency-helper';
import { formatDate } from 'src/model/date-helper';
import { NaturezaHistoria } from 'src/model/historia';
import { useHistoriaStore } from 'src/stores/historia-store';
import { defineComponent, onBeforeMount, ref } from 'vue';

export default defineComponent({
    name: 'ReceitasTimeline',
    setup() {
        const historiaStore = useHistoriaStore()
        const scrollTargetRef = ref(undefined)
        const scrollDisable = ref(false)

        const params = (page: number) => ({
            page,
            size: 6,
            natureza: NaturezaHistoria.RECEITA
        })

        const onLoadRef = async (index: number, done: () => void) => {
            await historiaStore.loadPage(params(index))
                .finally(() => {
                    done()
                    if ((index + 1) === historiaStore.historiasPage.totalPages) {
                        scrollDisable.value = true
                    }
                })
        }

        onBeforeMount(() => {
            historiaStore.listarPage(params(0))
        })

        return {
            onLoadRef,
            formatDate,
            historiaStore,
            scrollDisable,
            scrollTargetRef,
            toReal: toRealSymbol,

        }
    }
})
</script>
