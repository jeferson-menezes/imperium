<template>
    <q-avatar v-if="imageData">
        <q-img :src="imageData">
            <template v-slot:loading>
                <div class="text-yellow">
                    <q-spinner-ios size="xs" />
                </div>
            </template>
        </q-img>
    </q-avatar>
    <q-circular-progress v-else show-value font-size="16px" class="text-red q-ma-md" :value="progress" size="50px"
        :thickness="0.05" color="red" track-color="grey-3">
        <q-avatar size="xl" color="grey" text-color="white">
            <q-icon size="md" name="mdi-image-off" />
        </q-avatar>
    </q-circular-progress>
</template>

<script lang="ts">
import { useImagemStore } from 'src/stores/imagem-store';
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({

    name: 'AvatarImagem',

    props: {
        imagemId: {
            type: Number
        }
    },
    setup(props) {
        const imageData = ref("")
        const loading = ref(false);
        const imagemStore = useImagemStore()
        const progress = ref(0)
        onMounted(async () => {
            if (props.imagemId) {
                const data = await imagemStore.download(props.imagemId, (event) => {
                    progress.value = Math.round(event.loaded * 100 / event.total);
                })
                imageData.value = window.URL.createObjectURL(new Blob([data]));
            }
        })

        return { loading, imageData, progress }
    },
})
</script>
