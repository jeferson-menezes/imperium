<template>
    <q-splitter v-model="splitterModel" :horizontal="$q.platform.is.mobile">
        <template v-slot:before>
            <q-tabs no-caps inline-label outside-arrows mobile-arrows align="left" :breakpoint="500" v-model="tab"
                :vertical="$q.platform.is.desktop" class="text-teal">
                <q-route-tab :to="{ name: 'ativos' }" name="ativos" icon="mdi-chart-areaspline" label="Ativo" />

                <q-route-tab :to="{ name: 'setores' }" name="setores" icon="mdi-graph" label="Setores" />

                <q-route-tab :to="{ name: 'categorias' }" name="categorias" icon="mdi-shape" label="Categorias" />

                <q-route-tab :to="{ name: 'evento-list' }" name="evento" icon="mdi-calendar-heart" label="Evento" />

            </q-tabs>
        </template>

        <template v-slot:after>
            <div class="text-h5 q-ma-md">
                {{ $route.meta.title }}
            </div>

            <router-view></router-view>
        </template>
    </q-splitter>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    name: 'ConfiguracaoPage',
    setup() {
        return {
            tab: ref("produto"),
            splitterModel: ref(20),
        };
    },
});
</script>
