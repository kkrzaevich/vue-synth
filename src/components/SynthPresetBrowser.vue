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
const formIsValid = ref(false)

const { presetTable, currentPreset } = storeToRefs(presetStore)

const { user } = storeToRefs(userStore)

const visible = ref(false)

const addPresetVisible = ref(false)

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

const ownPresets = computed(() => {
  if (!user.value?.username) return []
  return [...presetStore.getPresetsByAuthor(user.value?.username)]
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
  presetStore.getPresetsFromDb()
}

async function deletePreset(presetId: number) {
  const { error } = await presetStore.deletePreset(presetId)
  if (error) {
    throw new Error(error.message)
  }
  presetStore.getPresetsFromDb()
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
      <div class="container">
        <v-card class="authors-container">
          <div class="authors">
            <TransitionGroup tag="div" name="fade" class="transition-container">
              <v-btn
                variant="elevated"
                :color="author === currentAuthor ? '#424242' : ''"
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
            </TransitionGroup>
          </div>
          <Transition name="newPreset">
            <v-btn
              v-if="user"
              color="#424242"
              icon="mdi-plus"
              size="default"
              density="comfortable"
              :class="`add-presets-button ${addPresetVisible ? 'rotated' : ''}`"
              @click="addPresetVisible = !addPresetVisible"
            ></v-btn>
          </Transition>

          <Transition name="newPreset">
            <v-card class="add-preset" v-if="addPresetVisible" elevation="3">
              <v-form class="add-preset-form" @submit.prevent="addNewPreset" v-model="formIsValid">
                <v-btn
                  class="add-preset-button"
                  text="Add preset"
                  :type="formIsValid ? 'submit' : 'button'"
                ></v-btn>
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
          </Transition>
        </v-card>
        <v-card class="presets">
          <TransitionGroup tag="div" name="fade" class="transition-container">
            <div
              class="preset-transition-item"
              v-for="preset in currentAuthorPresets"
              :key="preset.name"
            >
              <div class="preset-button-container">
                <v-hover v-slot="{ isHovering, props }">
                  <v-btn
                    :color="preset.id === currentPreset.id ? '#424242' : ''"
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
            </div>
          </TransitionGroup>
        </v-card>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.transition-container {
  display: flex;
  flex-direction: row;
  gap: 5px;
  flex-wrap: wrap;
  position: relative;
}

.newPreset-enter-active,
.newPreset-leave-active {
  transition: opacity 0.5s ease;
}

.newPreset-enter-from,
.newPreset-leave-to {
  opacity: 0;
}

.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

.fade-leave-active {
  position: absolute;
}

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
  grid-template-columns: 1fr 1fr;

  gap: 15px;

  .main-button {
    font-size: 1rem;
    border-radius: 0px;
    letter-spacing: inherit;
    font-family: inherit;
    width: 240px;
    z-index: 0;
  }

  .authors-container {
    height: 275px;
    max-height: 275px;
    border-radius: 0px;
    position: relative;
    z-index: 0;

    .authors {
      gap: 5px;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;

      padding: 15px;

      overflow-y: auto;
      overflow-x: hidden;
      align-content: flex-start;
      justify-content: flex-start;
      position: relative;
    }

    .add-presets-button {
      position: absolute;
      right: 7.5px;
      bottom: 7.5px;
      z-index: 15;
    }

    .rotated {
      transform: translate(5px, 5px) rotate(45deg);
    }

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
