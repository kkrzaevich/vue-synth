<script setup lang="ts">
import { defineProps, ref, computed, onMounted } from 'vue'
import { useSettingsStore } from '@/stores/settings'
import { usePresetStore } from '@/stores/presets'

const settingStore = useSettingsStore()

const presetStore = usePresetStore()

export interface Props {
  name: string
  min: number
  max: number
  step: number | string
  annotation: string
  rounding?: number
  values?: Function
}

const props = withDefaults(defineProps<Props>(), {
  rounding: 0
})

const sliderValue = ref<number>(0)

function setStoreValue() {
  settingStore.setSetting(props.name, Number(sliderValue.value))
}

const sliderValueComputed = computed<number | null>(() => {
  if (props.values) {
    return props.values(Number(sliderValue.value))
  } else {
    return null
  }
})

presetStore.$subscribe(() => {
  sliderValue.value = settingStore.getSetting(props.name)
})

onMounted(() => {
  sliderValue.value = settingStore.getSetting(props.name)
})
</script>

<template>
  <p>{{ annotation }}</p>
  <v-slider
    :id="name"
    :name="name"
    :min="min"
    v-model="sliderValue"
    @end="setStoreValue"
    value="0"
    :max="max"
    :step="step"
    width="50%"
  />

  <label for="oscType">{{
    values ? sliderValueComputed : Number(sliderValue).toFixed(rounding)
  }}</label>
</template>

<style scoped lang="scss">
/* Для планшетов */

@media (max-width: 1149px) {
  в label {
    display: block;
  }
}
</style>
