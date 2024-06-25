<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  name: { type: String; required: true }
  min: { type: Number; required: true }
  max: { type: Number; required: true }
  step: { type: Number | String; required: true }
  annotation: { type: String; required: true }
  values?: { type: Function }
}>()
</script>

<template>
  <p>{{ annotation }}</p>
  <input type="range" :id="oscType" name="oscType" :min="min" value="0" :max="max" :step="step" />
  <label for="oscType" :id="`oscType${Label}`">{{ values ? values() : value }}</label>
</template>

<style scoped lang="scss">
input[type='range'] {
  filter: grayscale(100%);
  transition: filter 0.2s ease-in-out;
}

input[type='range']:hover {
  filter: none;
}

/* Для планшетов */

@media (max-width: 1149px) {
  в label {
    display: block;
  }
}
</style>
