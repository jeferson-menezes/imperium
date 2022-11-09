<template>
    <q-avatar v-if="imageData">
        <q-img :src="imageData">
            <template v-slot:loading>
                <div class="text-yellow">
                    <q-spinner-ios />
                    <div class="q-mt-md">Loading...</div>
                </div>
            </template>
        </q-img>
    </q-avatar>
    <q-avatar v-else color="grey" text-color="white" icon="mdi-image-off" />
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

        onMounted(async () => {
            console.log(props.imagemId);

            if (props.imagemId) {
                console.log("cai");

                const { data } = await imagemStore.download(props.imagemId)
                console.log(data);
                imageData.value = window.URL.createObjectURL(new Blob([data]));
            }
        })

        return { loading, imageData }
    },
})
</script>
