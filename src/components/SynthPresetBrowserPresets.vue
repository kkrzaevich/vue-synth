<script setup lang="ts">
import { supabase } from '@/supabase'
import { ref, onMounted, computed, watch } from 'vue'
import { usePresetStore } from '@/stores/presets'
import { useSettingsStore } from '@/stores/settings'
import { useUserStore } from '@/stores/users'
import { storeToRefs } from 'pinia'

const presetStore = usePresetStore()
const userStore = useUserStore()

const props = defineProps<{
  userId: string | undefined
  currentAuthor: string | null
}>()

const { currentPreset } = storeToRefs(presetStore)

const { user } = storeToRefs(userStore)

const currentAuthorPresets = computed(() => {
  if (!props.currentAuthor) return []
  return [...presetStore.getPresetsByAuthor(props.currentAuthor)]
})

const isWatchingOwnPresets = computed(() => {
  if (!props.currentAuthor) return false
  if (props.currentAuthor === user.value?.username) return true
  else return false
})

async function deletePreset(presetId: number) {
  const { error } = await presetStore.deletePreset(presetId)
  if (error) {
    throw new Error(error.message)
  }
  presetStore.getPresetsFromDb()
}
</script>

<template>
  <v-card class="presets">
    <TransitionGroup tag="div" name="fade" class="transition-container">
      <div class="preset-transition-item" v-for="preset in currentAuthorPresets" :key="preset.name">
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

  .main-button {
    font-size: 1rem;
    border-radius: 0px;
    letter-spacing: inherit;
    font-family: inherit;
    width: 240px;
    z-index: 0;
  }

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
</style>
