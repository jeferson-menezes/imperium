
<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="5" lg="4">
        <v-card class="elevation-1" tile>
          <v-card-header>
            <v-card-header-text>
              <v-card-title>Logue para acessar o sistema</v-card-title>
            </v-card-header-text>
          </v-card-header>

          <v-card-text class="pa-5">
            <v-form ref="form">
              <v-text-field
                v-model="form.email"
                :rules="rules.email"
                label="E-mail"
                prepend-icon="mdi-account"
                type="email"
              ></v-text-field>

              <v-text-field
                v-model="form.senha"
                :rules="rules.senha"
                label="Senha"
                prepend-icon="mdi-lock"
                type="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions class="pa-5">
            <v-spacer></v-spacer>
            <v-btn
              class="ma-2"
              @click="logar()"
              :loading="loading"
              :disabled="loading"
              tile
              color="info"
              >Logar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
/*eslint-disable */
import { defineComponent } from "vue";
import { email, required } from "../../shared/rules";
import { useAuthStore } from "./store";

export default defineComponent({
  name: "Login",

  setup() {
    const auth = useAuthStore();

    return {
      actionLogar: auth.actionLogar,
    };
  },
  data: () => ({
    loading: false,
    form: {
      email: "",
      senha: "",
    },
    rules: {
      email: [required("O e-mail é obrigatorio"), email("E-mail inválido!")],
      senha: [required("A senha é obrigatorio")],
    },
  }),
  methods: {
    async logar() {
      await this.actionLogar(this.form);
      this.$router.push({ name: "home" });
    },
  },
});
</script>