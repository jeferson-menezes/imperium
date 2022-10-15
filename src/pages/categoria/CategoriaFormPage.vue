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

                <IconsPicker v-model="form.icone" />

                <q-checkbox left-label v-model="form.ativo" label="Ativo" />

                <q-btn :label="isUpdate ? 'Atualizar' : 'Cadastrar'" :loading="loading" color="primary"
                    class="full-width" type="submit" outline rounded></q-btn>

                <q-btn label="Cancelar" class="full-width" color="primary" type="button" rounded flat
                    :to="{ name: 'contas' }" />
            </q-form>
        </div>
    </q-page>
</template>

<script lang="ts">
import { Categoria, Natureza } from 'src/model/categoria'
import { ErrorResponse } from 'src/model/error';
import { required } from 'src/model/rules';
import { useCategoriaStore } from 'src/stores/categoria-store';
import { computed, defineComponent, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import useNotify from '../composable/useNotify';
import ColorsPicker from "./ColorsPicker.vue";
import IconsPicker from './IconsPicker.vue'

export default defineComponent({
    components: {
        ColorsPicker,
        IconsPicker
    },
    setup() {
        const categoriaStore = useCategoriaStore()
        const route = useRoute();
        const router = useRouter();
        const loading = ref(false);
        const formRef = ref(null);

        const rules = {
            cor: [],
            natureza: [required("A natureza é obrigatória")],
            descricao: [required("A descrição é obrigatória")],
            nome: [required("O nome é obrigatório")],
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

        const { notifySuccess, notifyError } = useNotify();
        const isUpdate = computed(() => route.params.id);

        const submit = async () => {
            try {
                loading.value = true
                if (isUpdate.value) {
                    await categoriaStore.atualizar(form.value.id, form.value)
                } else {
                    await categoriaStore.adicionar(form.value)
                }

                notifySuccess(isUpdate.value ? "Atualizado" : "Cadastrado" + "com sucesso");
                router.push({ name: "categorias" });
            } catch (error) {
                const err = error as ErrorResponse
                notifyError(err.message);
            } finally {
                loading.value = false
            }
        }

        onMounted(async () => {
            if (isUpdate.value) {
                form.value = await categoriaStore.detalhar(isUpdate.value as string)
            }
        })

        return { rules, form, loading, formRef, submit, isUpdate }
    },
})
</script>
