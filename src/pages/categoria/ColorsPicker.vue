<template>
    <q-btn label="Open" color="primary" outline rounded @click="dialogRef?.show"></q-btn>

    <q-dialog ref="dialogRef" @hide="onDialogHide">
        <q-card class="q-dialog-plugin">

            <h1>Ola mundo</h1>
            <q-card-actions align="right">
                <q-btn color="primary" label="OK" @click="onOKClick" />
                <q-btn color="primary" label="Cancel" @click="onCancelClick" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useDialogPluginComponent } from 'quasar'

export default defineComponent({

    name: 'ColorsPicker',
    props: {
        modelValue: String
    },

    setup(props, { emit }) {
        const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

        return {
            dialogRef,
            onDialogHide,
            onOKClick() {
                emit('update:modelValue', "Amarelo")
                onDialogOK()
            },
            onCancelClick: onDialogCancel
        }
    },
})
</script>
