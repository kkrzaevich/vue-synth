import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { useSettingsStore } from '@/stores/settings'
import { supabase } from '@/supabase'
import { presetTable as defaultPresets } from '@/data/presetData'
import { Preset, type Settings } from '@/types/types'

export const usePresetStore = defineStore('presets', () => {
  const settingStore = useSettingsStore()

  const presetTable = ref<any[]>([])

  presetTable.value = [...defaultPresets]

  async function getPresetsFromDb() {
    const res = await supabase.from('presets').select(`
      id, 
      name,
      author, 
      attack, release, sustain, decay, oscType, volume, transposition, filterFreq, stereoWidth, delayVolume, delayTime, delayFeedback`)
    const { data, error } = await res
    if (error) throw error
    const presetArray: Preset[] = []
    data.forEach((entry) => {
      presetArray.push(
        new Preset(entry.id, entry.name, entry.author, {
          attack: entry.attack,
          release: entry.release,
          sustain: entry.sustain,
          decay: entry.decay,
          oscType: entry.oscType,
          volume: entry.volume,
          transposition: entry.transposition,
          filterFreq: entry.filterFreq,
          stereoWidth: entry.stereoWidth,
          delayVolume: entry.delayVolume,
          delayTime: entry.delayTime,
          delayFeedback: entry.delayFeedback
        })
      )
    })
    presetTable.value = [...presetArray]
  }

  async function addNewPreset(name: string, username: string, userId: string, settings: Settings) {
    return await supabase.from('presets').insert({
      name: name,
      author: username,
      attack: settings.attack,
      release: settings.release,
      sustain: settings.sustain,
      decay: settings.decay,
      oscType: settings.oscType,
      volume: settings.volume,
      transposition: settings.transposition,
      filterFreq: settings.filterFreq,
      stereoWidth: settings.stereoWidth,
      delayVolume: settings.delayVolume,
      delayTime: settings.delayTime,
      delayFeedback: settings.delayFeedback,
      user_id: userId
    })
  }

  async function deletePreset(presetId: number) {
    return await supabase.from('presets').delete().eq('id', presetId)
  }

  function getUniqueAuthors() {
    const uniqueAuthors: string[] = []
    presetTable.value.forEach((entry) => {
      if (!uniqueAuthors.includes(entry.author)) {
        uniqueAuthors.push(entry.author)
      }
    })
    return uniqueAuthors
  }

  function getPresetsByAuthor(author: string) {
    const presetsByAuthor: Preset[] = presetTable.value.filter((entry) => {
      return entry.author === author
    })
    return presetsByAuthor
  }

  const currentPresetIndex = ref(0)

  const currentPreset = computed(() => {
    return presetTable.value[currentPresetIndex.value]
  })

  function prevPreset() {
    currentPresetIndex.value = currentPresetIndex.value - 1
    if (currentPresetIndex.value < 0) {
      currentPresetIndex.value = presetTable.value.length - 1
    }
  }
  function nextPreset() {
    currentPresetIndex.value = currentPresetIndex.value + 1
    if (currentPresetIndex.value === presetTable.value.length) {
      currentPresetIndex.value = 0
    }
  }
  function selectPresetFromBrowser(id: number) {
    // get index of preset by id
    currentPresetIndex.value = presetTable.value.map((entry) => entry.id).indexOf(id)
    // set current index to the one you found
  }
  watch(
    currentPresetIndex,
    () => {
      settingStore.setSettings(currentPreset.value.settings)
    },
    { immediate: true }
  )

  return {
    currentPresetIndex,
    currentPreset,
    prevPreset,
    nextPreset,
    getPresetsFromDb,
    presetTable,
    getUniqueAuthors,
    getPresetsByAuthor,
    selectPresetFromBrowser,
    addNewPreset,
    deletePreset
  }
})
