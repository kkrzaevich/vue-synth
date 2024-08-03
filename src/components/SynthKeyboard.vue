<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onBeforeMount, provide, ref } from 'vue'
import SynthKeyboardOctave from './SynthKeyboardOctave.vue'
import { useKeyboardStore } from '@/stores/keyboard'

const { setSounds, createContext } = useKeyboardStore()

const keyboardStore = useKeyboardStore()

const { keyboard, context } = storeToRefs(keyboardStore)

const pointerdownGlobal = ref(false)

const pointerupGlobal = ref(false)

provide('pointEvents', {
  pointerdownGlobal,
  pointerupGlobal
})

onBeforeMount(() => {
  setSounds()
})
</script>

<template>
  <div class="keyboard" @click.prevent.once="createContext">
    <SynthKeyboardOctave
      v-for="octave in keyboard"
      :key="octave.octaveClass"
      :octave="octave"
      :context="context"
      @pointerdown="
        () => {
          pointerdownGlobal = true
          pointerupGlobal = false
        }
      "
      @pointerup="
        () => {
          pointerupGlobal = true
          pointerdownGlobal = false
        }
      "
    />
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
