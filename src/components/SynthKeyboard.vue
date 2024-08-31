<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onBeforeMount, provide, ref } from 'vue'
import SynthKeyboardOctave from './SynthKeyboardOctave.vue'
import { useKeyboardStore } from '@/stores/keyboard'

const { setSounds, createContext } = useKeyboardStore()

const keyboardStore = useKeyboardStore()

const { keyboard, context } = storeToRefs(keyboardStore)

const pointerdownGlobal = ref(false)

provide('pointEvents', {
  pointerdownGlobal
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
        }
      "
      @pointerup="
        () => {
          pointerdownGlobal = false
        }
      "
    />
  </div>
</template>

<style scoped lang="scss">
.keyboard {
  justify-self: center;
  grid-row-start: 4;
  grid-row-end: 5;
  grid-column-start: 2;
  grid-column-end: 5;
  display: grid;
  grid-auto-flow: column;
  gap: 30px 0px;
}
</style>
