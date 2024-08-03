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
  <div class="control-box">
    <v-slider
      :id="name"
      :name="name"
      :min="min"
      v-model="sliderValue"
      @end="setStoreValue"
      value="0"
      class="slider"
      :max="max"
      :step="step"
      width="80%"
      min-width="80%"
      density="compact"
    >
      <!-- <template v-slot:append>
        {{ values ? sliderValueComputed : Number(sliderValue).toFixed(rounding) }}
      </template> -->
    </v-slider>
    <label for="oscType" class="label">{{
      values ? sliderValueComputed : Number(sliderValue).toFixed(rounding)
    }}</label>
  </div>
</template>

<style scoped lang="scss">
/* Для планшетов */

.label {
  text-align: left;
}

@media (max-width: 909px) {
  label {
    display: block;
  }

  .control-box {
    display: grid;
    grid-auto-flow: row;
    grid-template-rows: 1fr 1fr;
    padding-bottom: 10px;
  }

  .slider {
    max-height: 30px;
  }
}

@media (min-width: 910px) {
  .control-box {
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: 1fr 80px;
  }
}
</style>
