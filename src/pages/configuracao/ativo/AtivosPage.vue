<template>
    <q-page padding>
        <div class="row justify-center">
            <q-table class="col-12" title="Lista de ativos" :loading="loading" :columns="columnsAtivo"
                :rows="ativoStore.ativos" row-key="id">

                <template v-slot:top>
                    <div class="text-h6">Lista de ativos</div>
                    <q-space></q-space>
                    <q-btn v-if="$q.platform.is.desktop" label="novo" icon="mdi-plus" color="primary"
                        :to="{ name: 'ativo-form' }" />
                </template>

                <template v-slot:body-cell-imagem="props">
                    <q-td :props="props">
                        <AvatarImagem :imagemId="props.row.imagemId" />
                    </q-td>
                </template>

                <template v-slot:body-cell-renda="props">
                    <q-td :props="props">
                        {{ rendaTexto(props.row.renda) }}
                    </q-td>
                </template>

                <template v-slot:body-cell-acoes="props">
                    <q-td :props="props" class="q-gutter-x-sm">

                        <q-btn icon="mdi-pencil-outline" color="info" dense :to="{
                            name: 'ativo-form',
                            params: { id: props.row.id },
                        }">
                            <q-tooltip> Editar ativo</q-tooltip>
                        </q-btn>

                        <q-btn icon="mdi-image-edit-outline" color="secondary" dense :to="{
                            name: 'ativo-imagem-form',
                            params: { id: props.row.id },
                            query: { ativoNome: props.row.nome },
                        }">
                            <q-tooltip> Editar imagem </q-tooltip>
                        </q-btn>

                        <q-btn icon="mdi-delete-outline" color="negative" dense>
                            <q-tooltip> Deletar </q-tooltip>
                        </q-btn>
                    </q-td>
                </template>

            </q-table>
        </div>
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn v-if="$q.platform.is.mobile" fab icon="mdi-plus" color="primary" :to="{ name: 'ativo-form' }">
            </q-btn>
        </q-page-sticky>
    </q-page>
</template>

<script>
import AvatarImagem from 'src/components/AvatarImagem.vue';
import { rendaTexto } from 'src/model/ativo';
import { columnsAtivo } from "src/model/columns";
import { useAtivoStore } from "src/stores/ativo-store";
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
    name: "AtivosPage",

    components: {
        AvatarImagem
    },
    setup() {
        // const $q = useQuasar();
        const ativoStore = useAtivoStore()
        const loading = ref(false);

        // const { notifyError, notifySuccess } = useNotify();

        onMounted(() => ativoStore.listar())

        return {
            columnsAtivo, ativoStore, loading, rendaTexto: (v) => rendaTexto[v]
        };
    },
});
</script>
