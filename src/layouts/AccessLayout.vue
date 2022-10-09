<template>
    <q-layout view="lHh Lpr lFf">
        <q-header elevated>
            <q-toolbar>
                <q-toolbar-title> Toolbar </q-toolbar-title>
                <q-btn flat round dense icon="apps" class="q-mr-xs" />
                <q-btn flat round dense icon="more_vert" />
            </q-toolbar>
        </q-header>
        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "AccessLayout",
    setup() {
        return {};
    },
});
</script>
