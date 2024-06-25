<script setup lang="ts">
import SynthControlSlider from './SynthControlSlider.vue'
</script>

<template>
  <div class="controls">
    <div class="base-controls">
      <SynthControlSlider />
      <SynthControlSlider />
      <SynthControlSlider />
      <SynthControlSlider />
      <SynthControlSlider />
      <SynthControlSlider />
      <SynthControlSlider />
      <SynthControlSlider />
      <SynthControlSlider />
      <SynthControlSlider />
      <SynthControlSlider />
      <SynthControlSlider />
    </div>
  </div>
</template>

<style scoped lang="scss">
.presets {
  grid-row-start: 1;
  grid-row-end: 2;
  /* grid-column-start: 3;
  grid-column-end: 4; */

  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 1fr 3fr 1fr;

  text-align: center;
}

.presets button {
  background-color: transparent;
  border: none;
  font-size: 1rem;
  color: black;
  transition: color 0.2s;
}

.presets button:hover {
  color: rgb(55, 147, 255);
}

.presets button:active {
  filter: contrast(200%);
}

.arrow-left {
  grid-row-start: 1;
  grid-row-end: 2;
  grid-column-start: 1;
  grid-column-end: 2;

  margin-top: auto;
  margin-bottom: auto;
}

.preset-field {
  grid-row-start: 1;
  grid-row-end: 2;
  grid-column-start: 2;
  grid-column-end: 3;
}

.arrow-right {
  grid-row-start: 1;
  grid-row-end: 2;
  grid-column-start: 3;
  grid-column-end: 4;

  margin-top: auto;
  margin-bottom: auto;
}
</style>
