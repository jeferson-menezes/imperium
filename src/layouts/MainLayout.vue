<template>
    <q-layout view="lHh Lpr lFf">
        <q-header elevated>
            <q-toolbar>
                <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

                <q-toolbar-title> Imperium </q-toolbar-title>

                <q-btn-dropdown flat color="white" icon="person">
                    <q-list>
                        <q-item clickable :to="{ name: 'categorias' }">
                            <q-item-section avatar>
                                <q-avatar icon="mdi-cog" color="primary" text-color="white" />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>Configuração</q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-separator />
                        <q-item clickable v-close-popup @click="logout">
                            <q-item-section avatar>
                                <q-avatar icon="mdi-exit-to-app" text-color="primary" />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>Logout</q-item-label>
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-btn-dropdown>
            </q-toolbar>
        </q-header>

        <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
            <q-list>
                <q-item-label header></q-item-label>

                <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
            </q-list>
        </q-drawer>

        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import { useAuthStore } from "src/stores/auth-store";
import { useRouter } from "vue-router";

const linksList = [
    {
        title: "Home",
        caption: "acompanhamento mensal",
        icon: "mdi-home",
        routerName: "home",
    },
    {
        title: "Contas",
        caption: "acompanhamento de Contas",
        icon: "mdi-bank",
        routerName: "contas",
    },
    // {
    //     title: "Categorias",
    //     caption: "configuração de categorias",
    //     icon: "mdi-shape",
    //     routerName: "categorias",
    // },
    {
        title: "Despesas",
        caption: "registro de despesas",
        icon: "mdi-cart",
        routerName: "despesas",
    },
    {
        title: "Receitas",
        caption: "registro de receitas",
        icon: "payments",
        routerName: "receitas",
    },
    {
        title: "Proventos",
        caption: "proventos recebidos",
        icon: "mdi-cash-plus",
        routerName: "proventos",
    },
    {
        title: "Posições",
        caption: "carteira de ativos",
        icon: "mdi-wallet",
        routerName: "posicoes",
    },
];

export default defineComponent({
    name: "MainLayout",

    components: {
        EssentialLink,
    },

    setup() {
        const leftDrawerOpen = ref(false);
        const authStore = useAuthStore()
        const router = useRouter()

        const logout = () => {
            authStore.actionLogout()
            router.replace({ name: 'login' })
        }

        return {
            logout,
            essentialLinks: linksList,
            leftDrawerOpen,
            toggleLeftDrawer() {
                leftDrawerOpen.value = !leftDrawerOpen.value;
            },
        };
    },
});
</script>
