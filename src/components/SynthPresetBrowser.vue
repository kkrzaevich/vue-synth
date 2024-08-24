<script setup lang="ts">
import { supabase } from '@/supabase'
import { ref, onMounted, computed, watch } from 'vue'
import { usePresetStore } from '@/stores/presets'
import { useSettingsStore } from '@/stores/settings'
import { useUserStore } from '@/stores/users'
import { storeToRefs } from 'pinia'
import { type userData } from '@/types/types'

const presetStore = usePresetStore()
const userStore = useUserStore()
const settingsStore = useSettingsStore()

const { presetTable } = storeToRefs(presetStore)

const { user } = storeToRefs(userStore)

const visible = ref(false)

const userId = ref<string | undefined>('')

const newPresetName = ref('')

const uniqueAuthors = computed(() => {
  return [...presetStore.getUniqueAuthors()]
})

const currentAuthor = ref<string | null>(null)

const currentAuthorPresets = computed(() => {
  if (!currentAuthor.value) return []
  return [...presetStore.getPresetsByAuthor(currentAuthor.value)]
})

const isWatchingOwnPresets = computed(() => {
  if (!currentAuthor.value) return false
  if (currentAuthor.value === user.value?.username) return true
  else return false
})

const getUserId = async () => {
  const user = await supabase.auth.getUser()
  const userData = user.data.user
  return userData?.id
}

async function addNewPreset() {
  if (newPresetName.value.length < 1) {
    throw new Error('Preset name too short')
  }
  if (!user.value || !userId.value) {
    throw new Error('Please log in')
  }
  const { error } = await presetStore.addNewPreset(
    newPresetName.value,
    user.value?.username,
    userId.value,
    settingsStore.getSettings()
  )
  if (error) {
    throw new Error(error.message)
  }
  console.log('arse add')
  presetStore.getPresetsFromDb()
}

async function deletePreset(presetId: number) {
  const { error } = await presetStore.deletePreset(presetId)
  if (error) {
    throw new Error(error.message)
  }
  console.log('arse delete')
  presetStore.getPresetsFromDb()
}

watch(user, async () => {
  userId.value = await getUserId()
})

onMounted(async () => {
  userId.value = await getUserId()
})
</script>

<template>
  <div class="preset-browser">
    <div class="the-card">
      <div
        class="container"
        :style="currentAuthor ? 'grid-template-columns: 1fr 1fr;' : 'grid-template-columns: 1fr'"
      >
        <v-card class="authors">
          <v-btn
            variant="elevated"
            class="text-none main-button"
            v-for="author in uniqueAuthors"
            :key="author"
            @click="
              () => {
                currentAuthor = author
              }
            "
          >
            {{ author }}
          </v-btn>
        </v-card>
        <v-card v-if="currentAuthor" class="presets">
          <div
            class="preset-button-container"
            v-for="preset in currentAuthorPresets"
            :key="preset.name"
          >
            <v-hover v-slot="{ isHovering, props }">
              <v-btn
                variant="elevated"
                v-bind="props"
                class="text-none main-button"
                @click="presetStore.selectPresetFromBrowser(preset.id)"
              >
                {{ preset.name }}
              </v-btn>
              <v-btn
                v-if="isWatchingOwnPresets"
                v-show="isHovering"
                v-bind="props"
                color="#B7B7B7"
                icon="mdi-close"
                size="x-small"
                density="comfortable"
                class="delete-button"
                @click="deletePreset(preset.id)"
              ></v-btn>
            </v-hover>
          </div>
        </v-card>
      </div>
    </div>
    <div class="add-preset" v-if="user">
      <v-btn text="Add preset" @click="addNewPreset"></v-btn>
      <v-text-field v-model="newPresetName" @update:focused="$emit('focusTextArea')"></v-text-field>
    </div>
  </div>
</template>

<style scoped lang="scss">
.preset-browser {
  grid-row-start: 2;
  grid-row-end: 3;
  grid-column-start: 2;
  grid-column-end: 5;

  justify-self: stretch;
}

.the-card {
  border-radius: 0px;
  padding: 1rem;
}

.container {
  display: grid;
  grid-template-rows: auto;

  gap: 15px;

  .main-button {
    font-size: 1rem;
    border-radius: 0px;
    letter-spacing: inherit;
    font-family: inherit;
    width: 240px;
    z-index: 0;
  }

  .authors {
    gap: 5px;
    border-radius: 0px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    height: 275px;
    max-height: 275px;
    overflow-y: auto;
    overflow-x: hidden;
    align-content: flex-start;
    justify-content: flex-start;
  }

  .presets {
    border-radius: 0px;
    padding: 15px;
    display: flex;
    flex-direction: row;
    gap: 5px;
    flex-wrap: wrap;
    height: 275px;
    max-height: 275px;
    overflow-y: auto;
    overflow-x: hidden;
    align-content: flex-start;
    justify-content: flex-start;

    .preset-button-container {
      position: relative;

      .delete-button {
        position: absolute;
        right: 0px;
        bottom: 0px;
        padding: 0px;
        transform: translate(10%, 10%);
        z-index: 1;
      }
    }
  }
}
</style>
