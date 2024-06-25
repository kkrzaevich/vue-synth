<script setup lang="ts">
import SynthControlSlider from './SynthControlSlider.vue'
</script>

<template>
  <div class="controls">
    <div class="base-controls">
      <SynthControlSlider
        name="oscType"
        :min="0"
        :max="99"
        :step="33"
        annotation="Oscillator type"
      />
      <SynthControlSlider
        name="filter"
        :min="0"
        :max="20000"
        :step="1"
        annotation="Filter cutoff"
      />
      <SynthControlSlider name="stereo" :min="0" :max="2" step="any" annotation="Stereo width" />
      <SynthControlSlider name="transpose" :min="-2" :max="2" :step="1" annotation="Transpose" />
    </div>
    <div class="ADSR">
      <SynthControlSlider name="attack" :min="0.001" :max="5" :step="0.1" annotation="Attack" />
      <SynthControlSlider name="decay" :min="0" :max="5" :step="0.1" annotation="Decay" />
      <SynthControlSlider name="sustain" :min="0" :max="1" :step="0.1" annotation="Sustain" />
      <SynthControlSlider name="release" :min="0.015" :max="5" :step="0.1" annotation="Release" />
    </div>
    <div class="delay">
      <SynthControlSlider
        name="delayVolume"
        :min="0"
        :max="0.99"
        :step="0.01"
        annotation="Delay volume"
      />
      <SynthControlSlider
        name="delayTime"
        :min="0.03"
        :max="2"
        :step="0.01"
        annotation="Delay time"
      />
      <SynthControlSlider
        name="delayFeedback"
        :min="0"
        :max="0.99"
        :step="0.01"
        annotation="Delay feedback"
      />
      <SynthControlSlider
        name="masterVolume"
        :min="0"
        :max="1"
        :step="0.01"
        annotation="Master volume"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.controls {
  grid-row-start: 2;
  grid-row-end: 3;
  grid-column-start: 2;
  grid-column-end: 5;

  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 1fr 3fr 3fr 3fr 1fr;

  margin-bottom: 30px;
}

.base-controls {
  grid-column-start: 2;
  grid-column-end: 3;
}

.ADSR {
  grid-column-start: 3;
  grid-column-end: 4;
}

.delay {
  grid-column-start: 4;
  grid-column-end: 5;
}
</style>
