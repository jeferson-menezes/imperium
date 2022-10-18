<template>
    <q-input v-model="time" :readonly="true">
        <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-time v-model="time" mask="HH:mm" format24h>
                        <div class="row items-center justify-end">
                            <q-btn v-close-popup label="OK" color="primary" flat />
                        </div>
                    </q-time>
                </q-popup-proxy>
            </q-icon>
        </template>
    </q-input>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({

    name: 'TimePicker',

    props: { modelValue: String },

    setup(props, { emit }) {
        const time = computed({
            get: () => props.modelValue,
            set: (value) => emit('update:modelValue', value)
        })

        return { time }
    },
})
</script>
