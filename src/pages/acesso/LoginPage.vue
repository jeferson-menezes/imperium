
<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useAuthStore } from "src/stores/auth-store";
import { email, required } from "src/model/rules";
import useNotify from "../composable/useNotify";
import { useRouter } from "vue-router";
import { baseURL } from "src/boot/axios";

export default defineComponent({

    name: "LoginPage",

    setup() {
        const form = ref({ email: "", senha: "" });
        const rules = {
            email: [required("Email é obrigatório"), email("Email é inválido")],
            senha: [required("Senha é obrigatória")],
        };

        const authStore = useAuthStore();
        const { notifyError } = useNotify();
        const router = useRouter();

        const login = async () => {
            try {
                await authStore.logar(form.value);
                router.push({ name: "home" });
            } catch (err) {
                notifyError("Houve um erro para realizar a operação");
            }
        };

        onMounted(() => {
            if (authStore.isLoggedIn) {
                router.push({ name: "home" });
            }
        });

        return { form, rules, login, baseURL };
    },
});
</script>

<template>
    <q-page padding>
        <q-form class="row justify-center" @submit.prevent="login">
            <p class="text-h5 text-center col-12">Login</p>
            <div class="col-md-4 col-sm-6 col-xs-10">
                <q-input type="text" label="Email" v-model="form.email" lazy-rules :rules="rules.email"></q-input>
                <q-input type="password" label="Senha" v-model="form.senha" lazy-rules :rules="rules.senha"></q-input>
                <div class="full-width q-pt-md q-gutter-y-md">
                    <q-btn label="Login" color="primary" class="full-width" type="submit" outline rounded></q-btn>

                    <q-btn label="Ativar link" class="full-width" color="primary" type="button" rounded flat
                        :href="baseURL" target="_blank" />
                </div>
            </div>
        </q-form>
    </q-page>
</template>
