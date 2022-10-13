<template>
    <q-page padding>
        <div class="row justify-center">
            <div class="col-12 text-center">
                <p class="text-h6">
                    {{ isUpdate ? "Atualizar" : "Cadastrar" }} conta
                </p>
            </div>

            <q-form class="col-md-6 col-sm-10 col-xs-11 q-gutter-y-md" ref="formRef" @submit.prevent="submit">

                <q-radio keep-color v-model="form.natureza" val="DESPESA" label="DESPESA" color="red" />
                <q-radio keep-color v-model="form.natureza" val="RECEITA" label="RECEITA" color="green" />

                <q-input label="Nome" v-model="form.nome" lazy-rules :rules="rules.nome"></q-input>

                <q-input label="Descrição" v-model="form.descricao" lazy-rules :rules="rules.descricao"></q-input>

                <ColorsPicker v-model="form.cor" />
                <q-btn :label="isUpdate ? 'Atualizar' : 'Cadastrar'" :loading="loading" color="primary"
                    class="full-width" type="submit" outline rounded></q-btn>

                <q-btn label="Cancelar" class="full-width" color="primary" type="button" rounded flat
                    :to="{ name: 'contas' }" />
            </q-form>
        </div>
    </q-page>
</template>

<script lang="ts">
import { log } from 'console';
import { Categoria, Natureza } from 'src/model/categoria'
import { computed, defineComponent, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import ColorsPicker from "./ColorsPicker.vue";

export default defineComponent({
    components: {
        ColorsPicker
    },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const loading = ref(false);
        const formRef = ref(null);

        const rules = {
            cor: [],
            icone: [],
            natureza: [],
            descricao: [],
            nome: [],
        }

        const form = ref<Categoria>({
            id: 0,
            ativo: true,
            cor: "",
            icone: '',
            natureza: Natureza.DESPESA,
            descricao: "",
            nome: "",
        })
        const submit = async () => {
            console.log(form.value);
        }
        const isUpdate = computed(() => route.params.id);
        return { rules, form, loading, formRef, submit, isUpdate }
    },
})
</script>
