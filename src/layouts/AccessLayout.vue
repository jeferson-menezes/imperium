<template>
    <q-layout view="lHh Lpr lFf">
        <q-header elevated>
            <q-toolbar>
                <q-toolbar-title> Imperium </q-toolbar-title>
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
