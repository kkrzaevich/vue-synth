import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { presetTable } from '@/data/presetData'
import { useSettingsStore } from '@/stores/settings'

export const usePresetStore = defineStore('presets', () => {
  const settingStore = useSettingsStore()

  const currentPresetIndex = ref(0)

  const currentPreset = computed(() => {
    return presetTable[currentPresetIndex.value]
  })

  function prevPreset() {
    currentPresetIndex.value = currentPresetIndex.value - 1
    if (currentPresetIndex.value < 0) {
      currentPresetIndex.value = presetTable.length - 1
    }
  }
  function nextPreset() {
    currentPresetIndex.value = currentPresetIndex.value + 1
    if (currentPresetIndex.value === presetTable.length) {
      currentPresetIndex.value = 0
    }
  }
  watch(
    currentPresetIndex,
    () => {
      settingStore.setSettings(currentPreset.value.settings)
    },
    { immediate: true }
  )

  return { currentPresetIndex, currentPreset, prevPreset, nextPreset }
})
