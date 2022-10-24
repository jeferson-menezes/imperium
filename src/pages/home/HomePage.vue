<template>
    <q-page class="row">
        <q-card class="col-8">
            <q-card-section>
                <div class="text-h6">Our Changing Planet</div>
                <div class="text-subtitle2">by John Doe</div>
            </q-card-section>

            <q-card-section ref="scrollTargetRef" style="max-height: 500px; overflow: auto;">
                <q-infinite-scroll :disable="scrollDisable" :initial-index="0" @load="onLoadRef" :offset="30"
                    :scroll-target="scrollTargetRef">
                    <div v-for="(item, index) in itemsRef" :key="index" class="caption">
                        <p>{{index}} - Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </div>
                    <template v-slot:loading>
                        <div class="row justify-center q-my-md">
                            <q-spinner-dots color="primary" size="40px" />
                        </div>
                    </template>
                </q-infinite-scroll>
            </q-card-section>
        </q-card>
    </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    name: "HomePage",

    setup() {
        const itemsRef = ref([{}, {}, {}, {}, {}, {}, {}])
        const scrollTargetRef = ref(undefined)
        const scrollDisable = ref(false)

        const loadMore = () => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return new Promise<any[]>((resolve) => {
                setTimeout(() => {
                    resolve([{}, {}, {}, {}, {}])
                }, 1000);
            });
        }

        const onLoadRef = (index: number, done: () => void) => {
            console.log(index);
            loadMore()
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .then(res => itemsRef.value.push(...res as any[]))
                .finally(() => {
                    if (index > 10) {
                        console.log('log...');

                        scrollDisable.value = true
                    }
                    done()
                })
        }

        return {
            onLoadRef,
            itemsRef,
            scrollTargetRef,
            scrollDisable
        }
    }
});
</script>
