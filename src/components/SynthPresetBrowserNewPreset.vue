<script setup lang="ts">
import { supabase } from '@/supabase'
import { ref, onMounted, computed, watch } from 'vue'
import { usePresetStore } from '@/stores/presets'
import { useSettingsStore } from '@/stores/settings'
import { useUserStore } from '@/stores/users'
import { storeToRefs } from 'pinia'

const props = defineProps<{
  userId: string | undefined
}>()

const presetStore = usePresetStore()
const userStore = useUserStore()
const settingsStore = useSettingsStore()
const formIsValid = ref(false)

const { user } = storeToRefs(userStore)

const newPresetName = ref('')

const ownPresets = computed(() => {
  if (!user.value?.username) return []
  return [...presetStore.getPresetsByAuthor(user.value?.username)]
})

const emit = defineEmits(['addPreset', 'focusTextArea'])

async function addNewPreset() {
  if (newPresetName.value.length < 1) {
    throw new Error('Preset name too short')
  }
  if (!user.value || !props.userId) {
    throw new Error('Please log in')
  }
  const { error } = await presetStore.addNewPreset(
    newPresetName.value,
    user.value?.username,
    props.userId,
    settingsStore.getSettings()
  )
  if (error) {
    throw new Error(error.message)
  }
  presetStore.getPresetsFromDb()

  emit('addPreset')
}

function checkIfPresetExists(name: string) {
  if (ownPresets.value.length === 0) return false
  for (const el of ownPresets.value) {
    if (el.name === name) return true
  }
  return false
}

const presetNameRules = ref([
  (value: string) => {
    if (value) return true

    return 'Name is requred.'
  },
  (value: string) => {
    if (value.length < 25) return true

    return 'Maximum length if 25 characters.'
  },
  (value: string) => {
    if (!checkIfPresetExists(value)) return true

    return 'Name already exists.'
  }
])
</script>

<template>
  <v-card class="add-preset" elevation="3">
    <v-form class="add-preset-form" @submit.prevent="addNewPreset" v-model="formIsValid">
      <v-btn text="Add preset" :type="formIsValid ? 'submit' : 'button'"></v-btn>
      <v-text-field
        rounded="0"
        density="compact"
        bg-color="#EDEDED"
        :rules="presetNameRules"
        v-model="newPresetName"
        @update:focused="$emit('focusTextArea')"
      ></v-text-field>
    </v-form>
  </v-card>
</template>

<style scoped lang="scss">
.add-preset {
  width: calc(100% - 24px);
  position: absolute;
  bottom: 0px;
  border-radius: 0px;
  margin: 12px;

  .add-preset-form {
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: top;
    flex-direction: row;
    padding: 15px;

    textarea {
      font-weight: bold;
    }

    button {
      font-size: 1rem;
      border-radius: 0px;
      letter-spacing: inherit;
      font-family: inherit;
    }
  }
}
</style>
