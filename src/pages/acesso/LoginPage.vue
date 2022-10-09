
<script lang="ts">
import { defineComponent, ref } from "vue";
import { useAuthStore } from "src/stores/auth-store";
import { email, required } from "src/model/rules";

export default defineComponent({
    name: "LoginPage",

    setup() {
        const form = ref({ email: "", senha: "" });
        const rules = {
            email: [required("Email é obrigatório"), email("Email é inválido")],
            senha: [required("Senha é obrigatória")],
        };

        const authStore = useAuthStore();

        const login = async () => {
            const res = await authStore.logar(form.value);
            console.log(res);
        };

        return { form, rules, login };
    },
});
</script>

<template>
    <q-page padding>
        <q-form class="row justify-center" @submit.prevent="login">
            <p class="text-h5 text-center col-12">Login</p>
            <div class="col-md-4 col-sm-6 col-xs-10">
                <q-input
                    label="Email"
                    v-model="form.email"
                    lazy-rules
                    :rules="rules.email"
                ></q-input>
                <q-input
                    label="Senha"
                    v-model="form.senha"
                    lazy-rules
                    :rules="rules.senha"
                ></q-input>
                <div class="full-width q-pt-md q-gutter-y-md">
                    <q-btn
                        label="Login"
                        color="primary"
                        class="full-width"
                        type="submit"
                        outline
                        rounded
                    ></q-btn>
                </div>
            </div>
        </q-form>
    </q-page>
</template>
