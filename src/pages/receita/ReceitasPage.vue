<template>
    <q-page padding>
        <div class="row justify-center">
            <q-table class="col-12" title="Lista de categorias" hide-bottom row-key="id" :loading="loading"
                :columns="columnsReceita" :rows="receitaStore.receitasPage?.content" :rows-per-page-options="[0]">

                <template v-slot:top>
                    <div class="row col-sm-8 col-xs-12 start content-start">

                        <div class="col q-mr-xs">
                            <q-input rounded standout dense debounce="600" v-model="filter" placeholder="Search"
                                @update:model-value="filterChange">
                                <template v-slot:append>
                                    <q-icon name="search" />
                                </template>
                            </q-input>
                        </div>
                        <div class="col q-mr-xs">
                            <q-select rounded standout dense @update:model-value="contaChange" map-options emit-value
                                option-value="id" option-label="nome" v-model="contaId" :options="contaStore.contas"
                                label="Conta">

                                <template v-slot:append>
                                    <q-icon v-if="contaId" name="close"
                                        @click.stop.prevent="(contaId = undefined) || contaChange(undefined)"
                                        class="cursor-pointer" />
                                </template>

                                <template v-slot:option="scope">
                                    <q-item v-bind="scope.itemProps">
                                        <q-item-section avatar>
                                            <q-icon :name="'mdi-' + scope.opt.tipoContaIcone" />
                                        </q-item-section>
                                        <q-item-section>
                                            <q-item-label>
                                                {{ scope.opt.nome }}
                                            </q-item-label>
                                            <q-item-label caption>
                                                {{ scope.opt.descricao }}
                                            </q-item-label>
                                        </q-item-section>
                                    </q-item>
                                </template>
                            </q-select>
                        </div>

                        <div class="col">
                            <q-select rounded standout dense @update:model-value="categoriaChange" map-options
                                emit-value option-value="id" option-label="nome" v-model="categoriaId"
                                :options="categoriaStore.filtrarPorNatureza('RECEITA')" label="Categoria">

                                <template v-slot:append>
                                    <q-icon v-if="categoriaId" name="close"
                                        @click.stop.prevent="(categoriaId = undefined) || categoriaChange(undefined)"
                                        class="cursor-pointer" />
                                </template>

                                <template v-slot:option="scope">
                                    <q-item v-bind="scope.itemProps">
                                        <q-item-section avatar>
                                            <q-icon :color="scope.opt.cor" :name="'mdi-' + scope.opt.icone" />
                                        </q-item-section>
                                        <q-item-section>
                                            <q-item-label>
                                                {{ scope.opt.nome }}
                                            </q-item-label>
                                            <q-item-label caption>
                                                {{ scope.opt.descricao }}
                                            </q-item-label>
                                        </q-item-section>
                                    </q-item>
                                </template>
                            </q-select>

                        </div>
                    </div>
                    <q-space></q-space>
                    <q-btn v-if="$q.platform.is.desktop" label="novo" icon="mdi-plus" color="primary"
                        :to="{ name: 'receita-form' }" />

                </template>

                <template v-slot:body-cell-valor="props">
                    <q-td :props="props" class="q-gutter-x-sm">
                        <q-chip outline square color="green" text-color="white" :label="toReal(props.row.valor)" />
                    </q-td>
                </template>

                <template v-slot:body-cell-data="props">
                    <q-td :props="props" class="q-gutter-x-sm">
                        {{ formatDate(props.row.data, 'DD MMM YYYY') }}
                    </q-td>
                </template>

                <template v-slot:body-cell-acoes="props">
                    <q-td :props="props" class="q-gutter-x-sm">
                        <q-btn icon="mdi-pencil-outline" color="info" dense :to="{
                            name: 'receita-form',
                            params: { id: props.row.id },
                        }">
                            <q-tooltip> Editar </q-tooltip>
                        </q-btn>
                        <q-btn icon="mdi-delete-outline" color="negative" dense @click="excluir(props.row)">
                            <q-tooltip> Deletar </q-tooltip>
                        </q-btn>
                    </q-td>
                </template>

                <template v-slot:bottom-row>
                    <q-tr>
                        <q-td colspan="100%">
                            <div class="q-pa-md flex flex-center">
                                <q-pagination @click="listar" v-model="page" :max="receitaStore.receitasPage.totalPages"
                                    :max-pages="6" :boundary-numbers="false" gutter="sm" />
                            </div>
                        </q-td>
                    </q-tr>
                </template>
            </q-table>
        </div>

        <div class="row justify-start">
            <div class="col-sm-6 col-12 q-my-md q-mr-sm">
                <ReceitasTimeline />
            </div>
            <div class="col q-my-md q-mr-sm">

            </div>
        </div>

        <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn v-if="$q.platform.is.mobile" fab icon="mdi-plus" color="primary" :to="{ name: 'receita-form' }">
            </q-btn>
        </q-page-sticky>
    </q-page>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { columnsReceita } from 'src/model/columns';
import { toRealSymbol } from 'src/model/currency-helper';
import { formatDate } from 'src/model/date-helper';
import { ErrorResponse } from 'src/model/error';
import { FilterEhAno, FilterEhData, FilterEhMes, FilterEhTexto, FilterEhValor, FilterVazio, Params } from 'src/model/filtro-chain';
import { Direction } from 'src/model/paginacao';
import { Receita } from 'src/model/receita';
import { useCategoriaStore } from 'src/stores/categoria-store';
import { useContaStore } from 'src/stores/conta-store';
import { useReceitaStore } from 'src/stores/receita-store';
import { defineComponent, onMounted, ref } from 'vue'
import useNotify from '../composable/useNotify';
import ReceitasTimeline from './ReceitasTimeline.vue'

export default defineComponent({
    name: 'ReceitasPage',
    components: {
        ReceitasTimeline
    },
    setup() {
        const $q = useQuasar();
        const { notifySuccess, notifyError } = useNotify();
        const loading = ref(false);
        const receitaStore = useReceitaStore()
        const contaStore = useContaStore()
        const categoriaStore = useCategoriaStore()
        const filter = ref('')
        const page = ref(1)
        const contaId = ref<number | undefined>(undefined)
        const categoriaId = ref<number | undefined>(undefined)
        let query: Params = {}

        const contaChange = (conId: number | undefined) => {
            contaId.value = conId
            page.value = 1
            listar()
        }

        const categoriaChange = (catId: number | undefined) => {
            categoriaId.value = catId
            page.value = 1
            listar()
        }

        const filterChange = () => {
            const pattern = new FilterEhAno(new FilterEhMes(new FilterEhData(new FilterEhValor(new FilterEhTexto(new FilterVazio())))));
            query = pattern.verifica(filter.value)
            page.value = 1
            listar()
        }

        const listar = () => {
            loading.value = true
            receitaStore.listarPage(params())
                .finally(() => (loading.value = false))
        }

        const params = () => {
            return {
                page: page.value - 1,
                size: 10,
                sort: `data,${Direction.DESC}`,
                categoriaId: categoriaId.value,
                contaId: contaId.value,
                ...query
            }
        }
        const excluir = (receita: Receita) => {
            try {
                loading.value = true
                $q.dialog({
                    title: "Confirme",
                    message: `Você realmente quer excluir ${receita.descricao} valor ${toRealSymbol(receita.valor)}`,
                    cancel: true,
                    persistent: true,
                }).onOk(async () => {
                    await receitaStore.deletar(receita.id)
                    notifySuccess("Excluido com sucesso!")
                });
            } catch (error) {
                const err = error as ErrorResponse
                notifyError(err.message);
            } finally {
                loading.value = false;
            }
        }

        onMounted(() => {
            contaStore.listar()
            categoriaStore.listar()
            listar()
        })

        return {
            page,
            filter,
            listar,
            excluir,
            loading,
            contaId,
            formatDate,
            contaStore,
            categoriaId,
            contaChange,
            receitaStore,
            filterChange,
            columnsReceita,
            categoriaStore,
            categoriaChange,
            toReal: toRealSymbol,
        }
    },
})
</script>
