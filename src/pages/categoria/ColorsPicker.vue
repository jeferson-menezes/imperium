<template>

    <q-input readonly label="Cor" v-model="cor" lazy-rules>
        <template v-slot:after>
            <q-btn round dense flat icon="palette" @click="dialogRef?.show" />
        </template>
    </q-input>

    <q-dialog ref="dialogRef" @hide="onDialogHide">
        <q-card class="q-dialog-plugin">

            <q-card-section>
                <q-select v-model="paleta" map-options emit-value option-value="id" option-label="name"
                    @update:model-value="selectPaleta" :options="colorsStore.paletas" label="Paleta de cores">
                    <template v-slot:option="scope">
                        <q-item v-bind="scope.itemProps">
                            <q-item-section avatar>
                                <q-icon :color="scope.opt.name" :name="'mdi-palette'" />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>
                                    {{ scope.opt.name }}
                                </q-item-label>
                            </q-item-section>
                        </q-item>
                    </template>
                </q-select>
            </q-card-section>

            <q-card-section>
                <q-btn @click="onOKClick(c.name)" flat round v-for="c in colorsStore.colors" :key="c.id" :color="c.name"
                    :icon="'palette'" />
            </q-card-section>

            <q-card-actions align="right">
                <q-btn color="primary" label="Cancel" @click="onCancelClick" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script lang="ts" >
import { useDialogPluginComponent } from 'quasar'
import { useColorsStore } from 'src/stores/colors-store'
import { computed, defineComponent, onMounted, ref } from 'vue'

export default defineComponent({

    name: 'ColorsPicker',
    props: { modelValue: String },
    setup(props, { emit }) {
        const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
        const colorsStore = useColorsStore();

        const cor = computed({
            get: () => props.modelValue,
            set: (value) => emit('update:modelValue', value)
        })
        const paleta = ref("")

        const selectPaleta = (paletteId: number) => {
            colorsStore.listarColors({ paletteId })
        }

        onMounted(() => colorsStore.listarPaletas())

        return {
            cor,
            paleta,
            dialogRef,
            onDialogHide,
            selectPaleta,
            onOKClick(name: string) {
                cor.value = name
                onDialogOK()
            },
            colorsStore,
            onCancelClick: onDialogCancel
        }
    },
})
</script>
