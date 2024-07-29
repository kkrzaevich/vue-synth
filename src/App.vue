<script setup lang="ts">
import { getNoteIdFromKeyCode } from '@/hooks/getNoteIdFromKeyCode'
import { onMounted, provide, ref } from 'vue'
import SynthPresets from './components/SynthPresets.vue'
import SynthKeyboard from './components/SynthKeyboard.vue'
import SynthControls from './components/SynthControls.vue'
import { useKeyboardStore } from '@/stores/keyboard'

const { addNote, removeNote } = useKeyboardStore()

const keysPressed = ref<string[]>([])

function keyPress(event: any) {
  const noteId = getNoteIdFromKeyCode(event.keyCode)
  if (!keysPressed.value.includes(event.keyCode) && noteId) {
    keysPressed.value.push(event.keyCode)
    addNote(noteId)
  }
}

function keyRelease(event: any) {
  const index = keysPressed.value.indexOf(event.keyCode)
  keysPressed.value.splice(index, 1)
  const noteId = getNoteIdFromKeyCode(event.keyCode)
  console.log('released key', noteId)
  if (noteId) {
    removeNote(noteId)
  }
}
</script>

<template>
  <main @keydown="keyPress" @keyup="keyRelease">
    <div class="synth">
      <SynthPresets />
      <SynthControls />
      <SynthKeyboard />
    </div>
  </main>
</template>

<style scoped lang="scss">
main {
  font-family: 'Noto Sans', sans-serif;
  color: black;
  background-color: white;
  margin: 0;
}

.synth {
  display: grid;
  grid-template-rows: auto;
  /* grid-template-columns: 80px 380px 380px 380px 80px;
  width: 1300px; */

  border: 2px solid black;
  border-radius: 6px;

  background-color: white;

  margin: auto;

  box-shadow: 0px 0px 200px 0px rgb(252, 252, 252);
}

/* Для широких экранов */

@media (min-width: 1300px) {
  .synth {
    grid-template-columns: 80px 380px 380px 380px 80px;
    width: 1300px;
  }
}

/* Для чуть менее широких экранов */

@media (max-width: 1299px) {
  .synth {
    grid-template-columns: 5px 380px 380px 380px 5px;
    width: 1150px;
  }
}

/* Для планшетов */

@media (max-width: 1149px) {
  .synth {
    grid-template-columns: 5px 300px 300px 300px 5px;
    width: 910px;
  }
}

@media (max-width: 909px) {
  .synth {
    grid-template-columns: 10px 185px 185px 185px 10px;
    width: 585px;
  }
}
</style>
