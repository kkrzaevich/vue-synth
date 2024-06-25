<script setup lang="ts">
import SynthKeyboardOctave from './SynthKeyboardOctave.vue'

const keyboard = [
  {
    octaveClass: 'octave-1',
    keyData: [
      { keyStyle: 'key-white c-key', keyButton: '' },
      { keyStyle: 'key-black csh-key', keyButton: '' },
      { keyStyle: 'key-white d-key', keyButton: '' },
      { keyStyle: 'key-black dsh-key', keyButton: '' },
      { keyStyle: 'key-white e-key', keyButton: '' },
      { keyStyle: 'key-white f-key', keyButton: '' },
      { keyStyle: 'key-black fsh-key', keyButton: '' },
      { keyStyle: 'key-white g-key', keyButton: '' },
      { keyStyle: 'key-black gsh-key', keyButton: '' },
      { keyStyle: 'key-white a-key', keyButton: '' },
      { keyStyle: 'key-black ash-key', keyButton: '' },
      { keyStyle: 'key-white b-key', keyButton: '' }
    ]
  },
  {
    octaveClass: 'octave-2',
    keyData: [
      { keyStyle: 'key-white c-key', keyButton: 'Z' },
      { keyStyle: 'key-black csh-key', keyButton: 'S' },
      { keyStyle: 'key-white d-key', keyButton: 'X' },
      { keyStyle: 'key-black dsh-key', keyButton: 'D' },
      { keyStyle: 'key-white e-key', keyButton: 'C' },
      { keyStyle: 'key-white f-key', keyButton: 'V' },
      { keyStyle: 'key-black fsh-key', keyButton: 'G' },
      { keyStyle: 'key-white g-key', keyButton: 'B' },
      { keyStyle: 'key-black gsh-key', keyButton: 'H' },
      { keyStyle: 'key-white a-key', keyButton: 'N' },
      { keyStyle: 'key-black ash-key', keyButton: 'J' },
      { keyStyle: 'key-white b-key', keyButton: 'M' }
    ]
  },
  {
    octaveClass: 'octave-3',
    keyData: [
      { keyStyle: 'key-white c-key', keyButton: 'Q' },
      { keyStyle: 'key-black csh-key', keyButton: '2' },
      { keyStyle: 'key-white d-key', keyButton: 'W' },
      { keyStyle: 'key-black dsh-key', keyButton: '3' },
      { keyStyle: 'key-white e-key', keyButton: 'E' },
      { keyStyle: 'key-white f-key', keyButton: 'R' },
      { keyStyle: 'key-black fsh-key', keyButton: '5' },
      { keyStyle: 'key-white g-key', keyButton: 'T' },
      { keyStyle: 'key-black gsh-key', keyButton: '6' },
      { keyStyle: 'key-white a-key', keyButton: 'Y' },
      { keyStyle: 'key-black ash-key', keyButton: '7' },
      { keyStyle: 'key-white b-key', keyButton: 'U' }
    ]
  },
  {
    octaveClass: 'octave-4',
    keyData: [
      { keyStyle: 'key-white c-key', keyButton: 'I' },
      { keyStyle: 'key-black csh-key', keyButton: '9' },
      { keyStyle: 'key-white d-key', keyButton: 'O' },
      { keyStyle: 'key-black dsh-key', keyButton: '0' },
      { keyStyle: 'key-white e-key', keyButton: 'P' },
      { keyStyle: 'key-white f-key', keyButton: '' },
      { keyStyle: 'key-black fsh-key', keyButton: '' },
      { keyStyle: 'key-white g-key', keyButton: '' },
      { keyStyle: 'key-black gsh-key', keyButton: '' },
      { keyStyle: 'key-white a-key', keyButton: '' },
      { keyStyle: 'key-black ash-key', keyButton: '' },
      { keyStyle: 'key-white b-key', keyButton: '' }
    ]
  }
]
</script>

<template>
  <div class="keyboard">
    <SynthKeyboardOctave v-for="octave in keyboard" :key="octave.octaveClass" :octave="octave" />
  </div>
</template>

<style scoped lang="scss">
.keyboard {
  grid-row-start: 3;
  grid-row-end: 4;
  grid-column-start: 2;
  grid-column-end: 5;
  margin: auto;
}

/* Для широких экранов */

@media (min-width: 1300px) {
  .keyboard {
    display: flex;
    border: 2px solid black;
    border-radius: 3px;
    background-color: #f8f0df;
  }
}

/* Для чуть менее широких экранов */

@media (max-width: 1299px) {
  .keyboard {
    display: flex;
    border: 2px solid black;
    border-radius: 3px;
    background-color: #f8f0df;
  }
}

/* Для планшетов */

@media (max-width: 1149px) {
  .keyboard {
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: auto;
    border: none;
    border-radius: 0px;
    background-color: white;
  }
}
</style>
