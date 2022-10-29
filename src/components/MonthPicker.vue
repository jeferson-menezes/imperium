<template>
    <div class="q-pb-sm text-subtitle2">
        Mês em vigência: {{ date }}
        <q-btn icon="event" outline round color="primary">
            <q-popup-proxy @before-hide="updateProxy" ref="picker" cover transition-show="scale"
                transition-hide="scale">
                <q-date v-model="date" :emit-immediately="true" @update:model-value="change" mask="MM/YYYY"
                    default-view="Years" minimal>
                </q-date>
            </q-popup-proxy>
        </q-btn>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
    name: 'MonthPicker',
    props: { modelValue: String },

    setup(props, { emit }) {
        const picker = ref()
        const date = computed({
            get: () => props.modelValue,
            set: (value) => emit('update:modelValue', value)
        })

        const updateProxy = () => {
            emit('change')
        }

        const change = (value: string, reason: string) => {
            if (reason === 'month') {
                picker.value?.hide()
            }
        }

        return { date, change, picker, updateProxy }
    },
})
</script>
