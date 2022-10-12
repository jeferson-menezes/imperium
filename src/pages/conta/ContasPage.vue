<template>
    <q-page padding>
        <div class="q-pa-md">
            <div class="q-gutter-md">
                <q-carousel
                    v-model="slide"
                    transition-prev="scale"
                    transition-next="scale"
                    swipeable
                    animated
                    control-color="white"
                    navigation
                    padding
                    arrows
                    height="300px"
                    class="bg-primary text-white shadow-1 rounded-borders"
                >
                    <q-carousel-slide
                        name="style"
                        class="column no-wrap flex-center"
                    >
                        <q-icon name="style" size="56px" />
                        <div class="q-mt-md text-center">
                            {{ lorem }}
                        </div>
                    </q-carousel-slide>
                    <q-carousel-slide
                        name="tv"
                        class="column no-wrap flex-center"
                    >
                        <q-icon name="live_tv" size="56px" />
                        <div class="q-mt-md text-center">
                            {{ lorem }}
                        </div>
                    </q-carousel-slide>
                    <q-carousel-slide
                        name="layers"
                        class="column no-wrap flex-center"
                    >
                        <q-icon name="layers" size="56px" />
                        <div class="q-mt-md text-center">
                            {{ lorem }}
                        </div>
                    </q-carousel-slide>
                    <q-carousel-slide
                        name="map"
                        class="column no-wrap flex-center"
                    >
                        <q-icon name="terrain" size="56px" />
                        <div class="q-mt-md text-center">
                            {{ lorem }}
                        </div>
                    </q-carousel-slide>
                </q-carousel>
            </div>
        </div>
        <div class="row justify-center">
            <q-table
                class="col-12"
                title="Lista de provetos"
                :loading="loading"
                :columns="columnsConta"
                :rows="contaStore.contas"
                row-key="id"
            >
                <template v-slot:top>
                    <div class="text-h6">Proventos</div>
                    <q-space></q-space>
                    <q-btn
                        v-if="$q.platform.is.desktop"
                        label="novo"
                        icon="mdi-plus"
                        color="primary"
                        :to="{ name: 'conta-form' }"
                    />
                </template>
                <template v-slot:body-cell-tipoContaIcone="props">
                    <q-td :props="props" class="q-gutter-x-sm">
                        <q-icon
                            :color="props.row.tipoContaCor"
                            :name="props.row.tipoContaIcone"
                            size="3em"
                        />
                    </q-td>
                </template>

                <template v-slot:body-cell-acoes="props">
                    <q-td :props="props" class="q-gutter-x-sm">
                        <q-btn
                            icon="mdi-pencil-outline"
                            color="info"
                            dense
                            :to="{
                                name: 'conta-form',
                                params: { id: props.row.id },
                            }"
                        >
                            <q-tooltip> Editar </q-tooltip>
                        </q-btn>
                        <q-btn icon="mdi-delete-outline" color="negative" dense>
                            <q-tooltip> Deletar </q-tooltip>
                        </q-btn>
                    </q-td>
                </template>
            </q-table>
        </div>

        <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn
                v-if="$q.platform.is.mobile"
                fab
                icon="mdi-plus"
                color="primary"
                :to="{ name: 'conta-form' }"
            ></q-btn>
        </q-page-sticky>
    </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useContaStore } from "src/stores/conta-store";
import { columnsConta } from "src/model/columns";

export default defineComponent({
    name: "ContasPage",

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
            slide: ref("style"),
            lorem: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo.",
        };
    },
});
</script>
