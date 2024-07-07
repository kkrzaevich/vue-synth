<script setup lang="ts">
import type { Octave } from '@/types/types'
import SynthKeyboardOctaveKey from './SynthKeyboardOctaveKey.vue'

import { defineProps } from 'vue'

const props = defineProps<{
  octave: Octave
  context: AudioContext | null
}>()
</script>

<template>
  <div class="octave" :class="octave.octaveClass">
    <SynthKeyboardOctaveKey
      v-for="(key, index) in octave.keyData"
      :keyStyle="key.keyStyle"
      :key="index"
      :button="key.keyButton"
      :sound="key.sound"
      :context="context"
    />
  </div>
</template>

<style scoped lang="scss">
.octave {
  display: grid;
  grid-template-rows: 80px 50px;
  border-radius: 3px;
  grid-template-columns:
  /* from C to E */
    30px 10px 10px 20px 10px 10px 30px
    /* from F to B */
    30px 10px 10px 20px 10px 10px 20px 10px 10px 30px;
}

@media (max-width: 1149px) {
  .octave-1 {
    grid-row-start: 1;
    grid-row-end: 2;
    grid-column-start: 1;
    grid-column-end: 2;
  }

  .octave-2 {
    grid-row-start: 1;
    grid-row-end: 2;
    grid-column-start: 2;
    grid-column-end: 3;
  }

  .octave-3 {
    grid-row-start: 2;
    grid-row-end: 3;
    grid-column-start: 1;
    grid-column-end: 2;

    margin-top: 30px;
  }

  .octave-4 {
    grid-row-start: 2;
    grid-row-end: 3;
    grid-column-start: 2;
    grid-column-end: 3;

    margin-top: 30px;
  }
}
</style>
