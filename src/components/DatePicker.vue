<template>
    <q-input :label="label" v-model="date" :readonly="true">
        <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="date" mask="DD/MM/YYYY">
                        <div class="row items-center justify-end">
                            <q-btn v-close-popup label="OK" color="primary" flat />
                        </div>
                    </q-date>
                </q-popup-proxy>
            </q-icon>
        </template>
    </q-input>
</template>

<script lang="ts">
import { DateHelpper } from 'src/model/date-helper';
import { computed, defineComponent } from 'vue'

export default defineComponent({

    name: 'DatePicker',

    props: {
        modelValue: String,
        label: {
            type: String,
            default: 'Data'
        }
    },

    setup(props, { emit }) {
        const date = computed({
            get: () => DateHelpper.usToBr(props.modelValue as string),
            set: (value) => emit('update:modelValue', DateHelpper.brToUs(value as string))
        })

        return { date }
    },
})
</script>
