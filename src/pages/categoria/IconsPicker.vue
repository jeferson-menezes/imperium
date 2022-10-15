<template>

    <q-input readonly label="Icon" v-model="icon" lazy-rules>
        <template v-slot:after>
            <q-btn round dense flat icon="grading" @click="dialogRef?.show" />
        </template>
    </q-input>

    <q-dialog ref="dialogRef" @hide="onDialogHide">
        <q-card class="q-dialog-plugin">

            <q-card-section>
                <q-select v-model="tag" map-options emit-value option-value="uid" option-label="name"
                    @update:model-value="selectTag" :options="iconsStore.tags" label="Tags">
                </q-select>
            </q-card-section>

            <q-card-section>
                <q-btn @click="onOKClick(i.name)" flat round v-for="i in iconsStore.icons" :key="i.id"
                    :icon="'mdi-'+i.name" />
            </q-card-section>

            <q-card-actions align="right">
                <q-btn color="primary" label="Cancel" @click="onCancelClick" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script lang="ts" >
import { useDialogPluginComponent } from 'quasar'
import { useIconsStore } from 'src/stores/icons-store'
import { computed, defineComponent, onMounted, ref } from 'vue'

export default defineComponent({

    name: 'IconsPicker',

    props: { modelValue: String },

    setup(props, { emit }) {
        const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
        const iconsStore = useIconsStore();
        const tag = ref("")

        const icon = computed({
            get: () => props.modelValue,
            set: (value) => emit('update:modelValue', value)
        })

        const selectTag = (tagUid: number) => {
            iconsStore.listarIcons({ tagUid })
        }

        onMounted(() => iconsStore.listarTags())

        return {
            tag,
            icon,
            selectTag,
            dialogRef,
            onDialogHide,
            onOKClick(name: string) {
                icon.value = name
                onDialogOK()
            },
            iconsStore,
            onCancelClick: onDialogCancel
        }
    },
})
</script>
