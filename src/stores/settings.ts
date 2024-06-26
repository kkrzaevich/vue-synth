import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { type Settings, type oscType } from '@/types/types'
import { getOscType, getOscSliderValue } from '@/hooks/getOscType'

export const useSettingsStore = defineStore('settings', () => {
  const attack = ref(0.001)
  const release = ref(0.1)
  const sustain = ref(1)
  const decay = ref(1)
  const oscType = ref<oscType>('sine')
  const volume = ref(0.1)
  const transposition = ref(-1)
  const filterFreq = ref(500)
  const stereoWidth = ref(0)
  const delayVolume = ref(0)
  const delayTime = ref(0)
  const delayFeedback = ref(0)

  const volumeAttackStepsNum = computed(() => {
    if (attack.value < 0.1) {
      return 1
    } else {
      return 10
    }
  })

  const attackTimeStep = computed(() => {
    return (attack.value * 1000) / volumeAttackStepsNum.value
  })

  const volumeReleaseStepsNum = computed(() => {
    if (release.value < 0.1) {
      return 1
    } else {
      return 10
    }
  })

  const releaseTimeStep = computed(() => {
    return (release.value * 1000) / volumeReleaseStepsNum.value
  })

  const volumeDecayStepsNum = computed(() => {
    if (decay.value < 0.1) {
      return 1
    } else {
      return 10
    }
  })

  const decayTimeStep = computed(() => {
    return (decay.value * 1000) / volumeDecayStepsNum.value
  })

  const decayLoudness = computed(() => {
    return sustain.value * volume.value
  })

  const volumeStepDecay = computed(() => {
    return (volume.value - decayLoudness.value) / volumeDecayStepsNum.value
  })

  function setSettings(settings: Settings) {
    attack.value = settings.attack
    release.value = settings.release
    sustain.value = settings.sustain
    decay.value = settings.decay
    oscType.value = settings.oscType
    volume.value = settings.volume
    transposition.value = settings.transposition
    filterFreq.value = settings.filterFreq
    stereoWidth.value = settings.stereoWidth
    delayVolume.value = settings.delayVolume
    delayTime.value = settings.delayTime
    delayFeedback.value = settings.delayFeedback
  }

  function setSetting(key: string, value: number) {
    if (key === 'attack') {
      attack.value = value
    } else if (key === 'release') {
      release.value = value
    } else if (key === 'sustain') {
      sustain.value = value
    } else if (key === 'decay') {
      decay.value = value
    } else if (key === 'oscType') {
      oscType.value = getOscType(value)
    } else if (key === 'volume') {
      volume.value = value
    } else if (key === 'transposition') {
      transposition.value = value
    } else if (key === 'filterFreq') {
      filterFreq.value = value
    } else if (key === 'stereoWidth') {
      stereoWidth.value = value
    } else if (key === 'delayVolume') {
      delayVolume.value = value
    } else if (key === 'delayTime') {
      delayTime.value = value
    } else if (key === 'delayFeedback') {
      delayFeedback.value = value
    }
  }

  function getSetting(key: string): number {
    if (key === 'attack') {
      return attack.value
    } else if (key === 'release') {
      return release.value
    } else if (key === 'sustain') {
      return sustain.value
    } else if (key === 'decay') {
      return decay.value
    } else if (key === 'oscType') {
      return getOscSliderValue(oscType.value)
    } else if (key === 'volume') {
      return volume.value
    } else if (key === 'transposition') {
      return transposition.value
    } else if (key === 'filterFreq') {
      return filterFreq.value
    } else if (key === 'stereoWidth') {
      return stereoWidth.value
    } else if (key === 'delayVolume') {
      return delayVolume.value
    } else if (key === 'delayTime') {
      return delayTime.value
    } else if (key === 'delayFeedback') {
      return delayFeedback.value
    } else {
      return 0
    }
  }

  return {
    attack,
    release,
    sustain,
    decay,
    oscType,
    volume,
    transposition,
    filterFreq,
    stereoWidth,
    delayVolume,
    delayTime,
    delayFeedback,
    volumeAttackStepsNum,
    attackTimeStep,
    volumeReleaseStepsNum,
    releaseTimeStep,
    volumeDecayStepsNum,
    decayTimeStep,
    decayLoudness,
    volumeStepDecay,
    setSetting,
    setSettings,
    getSetting
  }
})
