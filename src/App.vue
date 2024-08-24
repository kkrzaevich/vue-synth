<script setup lang="ts">
import { getNoteIdFromKeyCode } from '@/hooks/getNoteIdFromKeyCode'
import { onMounted, provide, ref, watch } from 'vue'
import SynthPresets from './components/SynthPresets.vue'
import SynthKeyboard from './components/SynthKeyboard.vue'
import SynthControls from './components/SynthControls.vue'
import SynthNavbar from './components/SynthNavbar.vue'
import SynthPresetBrowser from './components/SynthPresetBrowser.vue'
import { useKeyboardStore } from '@/stores/keyboard'
import { supabase } from '@/supabase'

const { changeKeyboardInput, resetInputs } = useKeyboardStore()

const keysPressed = ref<string[]>([])

const presetBrowserVisible = ref(false)

const blockKeys = ref(false)

function toggleBlockKeys() {
  blockKeys.value = !blockKeys.value
  console.log(blockKeys.value)
}

function keyPress(event: any) {
  if (blockKeys.value) return
  const noteId = getNoteIdFromKeyCode(event.keyCode)
  if (!keysPressed.value.includes(event.keyCode) && noteId) {
    keysPressed.value.push(event.keyCode)
    changeKeyboardInput(noteId, true)
  }
}

function keyRelease(event: any) {
  if (blockKeys.value) return
  const index = keysPressed.value.indexOf(event.keyCode)
  keysPressed.value.splice(index, 1)
  const noteId = getNoteIdFromKeyCode(event.keyCode)
  if (noteId) {
    changeKeyboardInput(noteId, false)
  }
}

watch(blockKeys, (value) => {
  if (!value) blockKeys.value = false
})

addEventListener('blur', (event) => {
  resetInputs()
})
</script>

<template>
  <main @keydown="keyPress" @keyup="keyRelease">
    <v-card class="synth" variant="elevated" elevation="10">
      <SynthPresets
        @presetBrowserVisible="
          () => {
            presetBrowserVisible = !presetBrowserVisible
          }
        "
      />
      <SynthPresetBrowser
        v-if="presetBrowserVisible"
        class="preset-browser"
        @focusTextArea="toggleBlockKeys"
      />
      <SynthControls />
      <SynthKeyboard />
    </v-card>
    <SynthNavbar />
  </main>
</template>

<style scoped lang="scss">
main {
  font-family: 'Noto Sans', sans-serif;
  color: black;
  background-color: white;
  margin: 0;
  display: flex;
  flex-direction: column;
  width: 100vw;
  justify-content: center;
  align-items: center;
}

.synth {
  display: grid;
  grid-template-rows: auto;
  /* grid-template-columns: 80px 380px 380px 380px 80px;
  width: 1300px; */
  border-radius: 0px;
  width: 100%;

  margin-top: 20px;
  margin-bottom: 20px;
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
