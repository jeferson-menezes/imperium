<template>
  <v-app>
    <v-navigation-drawer v-if="authStore.hasToken" v-model="drawer" app>
      <v-list>
        <v-list-item
          v-for="(item, index) in routerLinks"
          :key="index"
          :to="item.path"
        >
          <v-list-item-icon>
            <v-icon>{{ item.meta.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.meta.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar v-if="authStore.hasToken" color="transparent" elevation="1" app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Imperium</v-toolbar-title>
      <loading-progress></loading-progress>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main style="background: #fafafa">
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer v-if="authStore.hasToken" app>
      <v-row align="center" justify="space-around">
        Jeferson Menezes - 2022 - Version: 2.0.0
      </v-row>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useAuthStore } from "./views/auth/store";

export default defineComponent({
  name: "App",

  setup() {
    const authStore = useAuthStore();

    return { authStore };
  },
  components: {},

  data: () => ({ drawer: false }),
  computed: {
    routerLinks() {
      return this.$router.options.routes.filter((r) => r.meta?.show);
    },
  },
  methods: {
    isLogged() {
      return true;
    },
  },
});
</script>
