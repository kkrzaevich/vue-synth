<script setup lang="ts">
import SynthControlSlider from './SynthControlSlider.vue'
import { getOscType } from '@/hooks/getOscType'
</script>

<template>
  <div class="controls">
    <!-- <div class="base-controls"> -->
    <SynthControlSlider
      name="oscType"
      :min="0"
      :max="99"
      :step="33"
      :values="getOscType"
      annotation="Oscillator type"
    />
    <SynthControlSlider
      name="filterFreq"
      :min="0"
      :max="20000"
      :step="1"
      annotation="Filter cutoff"
    />
    <SynthControlSlider
      name="stereoWidth"
      :min="0"
      :max="2"
      :rounding="2"
      step="any"
      annotation="Stereo width"
    />
    <SynthControlSlider name="transposition" :min="-2" :max="2" :step="1" annotation="Transpose" />
    <!-- </div>
    <div class="ADSR"> -->
    <SynthControlSlider
      name="attack"
      :min="0.001"
      :max="5"
      :step="0.1"
      :rounding="2"
      annotation="Attack"
    />
    <SynthControlSlider
      name="decay"
      :min="0"
      :max="5"
      :step="0.1"
      :rounding="2"
      annotation="Decay"
    />
    <SynthControlSlider
      name="sustain"
      :min="0"
      :max="1"
      :step="0.1"
      :rounding="2"
      annotation="Sustain"
    />
    <SynthControlSlider
      name="release"
      :min="0.015"
      :max="5"
      :step="0.1"
      :rounding="2"
      annotation="Release"
    />
    <!-- </div>
    <div class="delay"> -->
    <SynthControlSlider
      name="delayVolume"
      :min="0"
      :max="0.99"
      :step="0.01"
      :rounding="2"
      annotation="Delay volume"
    />
    <SynthControlSlider
      name="delayTime"
      :min="0.03"
      :max="2"
      :step="0.01"
      :rounding="2"
      annotation="Delay time"
    />
    <SynthControlSlider
      name="delayFeedback"
      :min="0"
      :max="0.99"
      :step="0.01"
      :rounding="2"
      annotation="Delay feedback"
    />
    <SynthControlSlider
      name="volume"
      :min="0"
      :max="1"
      :step="0.01"
      :rounding="2"
      annotation="Master volume"
    />
    <!-- </div> -->
  </div>
</template>

<style scoped lang="scss">
.controls {
  grid-row-start: 3;
  grid-row-end: 4;
  grid-column-start: 2;
  grid-column-end: 5;

  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 3fr 3fr 3fr;

  margin-bottom: 30px;
  padding: 0px 10%;
  margin-top: 1.5rem;
}

/* .base-controls {
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
} */

@media (max-width: 630px) {
  .controls {
    grid-template-columns: 3fr 3fr;
  }
}
</style>
