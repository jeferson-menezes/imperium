<template>
  <v-container fluid>
    <v-row></v-row>

    <v-row>
      <v-col>
        <v-card class="pa-sm-3 pa-md-7 pa-xs-0">
          <v-card-title class="pr-0">
            <v-icon x-large color="pink accent-2">mdi-bookmark</v-icon>Lista de
            categorias
          </v-card-title>

          <v-card>
            <v-card-title primary-title>
              Categorias
              <v-spacer></v-spacer>

              <v-btn
                fab
                small
                elevation="0"
                v-on:click="$root.$emit('categoria-form::show', '')"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="categorias"
              :items-per-page="5"
              :loading="loadingData"
              loading-text="Carregando..."
            >
              <template v-slot:item.icone="{ item }">
                <v-avatar color="grey lighten-4">
                  <v-icon large v-if="item.ativo" :color="item.cor"
                    >mdi-{{ item.icone }}</v-icon
                  >
                </v-avatar>
              </template>

              <template v-slot:item.natureza="{ item }">
                <div class="text-lowercase">
                  <span
                    :class="{
                      'red--text': item.natureza === 'DESPESA',
                      'green--text': !(item.natureza === 'DESPESA'),
                    }"
                    >&#10687;</span
                  >
                  {{ item.natureza }}
                </div>
              </template>

              <template v-slot:item.ativo="{ item }">
                <v-icon v-if="item.ativo" color="green darken-0"
                  >mdi-eye</v-icon
                >
                <v-icon v-else color="orange darken-2">mdi-eye-off</v-icon>
              </template>

              <template v-slot:item.acoes="{ item }">
                <v-btn fab small elevation="0" @click="excluirCategoria(item)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
                <v-btn
                  fab
                  small
                  elevation="0"
                  @click="$root.$emit('categoria-form::show', item)"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn fab small elevation="0" @click="inativaCategoria(item)">
                  <v-icon v-if="item.ativo">mdi-eye-off</v-icon>
                  <v-icon v-else>mdi-eye</v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useCategoriaStore } from "./store";

export default defineComponent({
  name: "CategoriaComponent",
  data: () => ({
    loadingData: false,
    headers: [
      { text: "", sortable: false, value: "icone" },
      { text: "Nome", sortable: true, value: "nome" },
      { text: "Descricao", sortable: false, value: "descricao" },
      { text: "Natureza", sortable: false, value: "natureza" },
      { text: "Ativa", value: "ativo" },
      { text: "Ações", sortable: false, value: "acoes", align: "center" },
    ],
  }),
  setup() {
    const categoriaStore = useCategoriaStore();

    categoriaStore.actionListarCategorias();

    return {
      categorias: computed(() => categoriaStore.categorias),
    };
  },
});
</script>
