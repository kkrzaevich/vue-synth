<script setup lang="ts">
import type { Keyboard } from '@/types/types'
import { storeToRefs } from 'pinia'
import { defineNoteFrequency } from '@/hooks/defineNoteFrequency'
import { watch, onBeforeMount, ref } from 'vue'
import SynthKeyboardOctave from './SynthKeyboardOctave.vue'
import { useSettingsStore } from '@/stores/settings'
import { Sound } from '@/types/sound'
const settingStore = useSettingsStore()

const settings = settingStore.getSettings()

const { stereoWidth, transposition } = storeToRefs(settingStore)

const context = ref<null | AudioContext>(null)

const keyboard = ref<Keyboard>([
  {
    octaveClass: 'octave-1',
    keyData: [
      { keyStyle: 'key-white c-key', keyButton: { name: '', code: null }, note: 'C', sound: null },
      {
        keyStyle: 'key-black csh-key',
        keyButton: { name: '', code: null },
        note: 'C#',
        sound: null
      },
      { keyStyle: 'key-white d-key', keyButton: { name: '', code: null }, note: 'D', sound: null },
      {
        keyStyle: 'key-black dsh-key',
        keyButton: { name: '', code: null },
        note: 'D#',
        sound: null
      },
      { keyStyle: 'key-white e-key', keyButton: { name: '', code: null }, note: 'E', sound: null },
      { keyStyle: 'key-white f-key', keyButton: { name: '', code: null }, note: 'F', sound: null },
      {
        keyStyle: 'key-black fsh-key',
        keyButton: { name: '', code: null },
        note: 'F#',
        sound: null
      },
      { keyStyle: 'key-white g-key', keyButton: { name: '', code: null }, note: 'G', sound: null },
      {
        keyStyle: 'key-black gsh-key',
        keyButton: { name: '', code: null },
        note: 'G#',
        sound: null
      },
      { keyStyle: 'key-white a-key', keyButton: { name: '', code: null }, note: 'A', sound: null },
      {
        keyStyle: 'key-black ash-key',
        keyButton: { name: '', code: null },
        note: 'A#',
        sound: null
      },
      { keyStyle: 'key-white b-key', keyButton: { name: '', code: null }, note: 'B', sound: null }
    ]
  },
  {
    octaveClass: 'octave-2',
    keyData: [
      { keyStyle: 'key-white c-key', keyButton: { name: 'Z', code: 90 }, note: 'C', sound: null },
      {
        keyStyle: 'key-black csh-key',
        keyButton: { name: 'S', code: 83 },
        note: 'C#',
        sound: null
      },
      { keyStyle: 'key-white d-key', keyButton: { name: 'X', code: 88 }, note: 'D', sound: null },
      {
        keyStyle: 'key-black dsh-key',
        keyButton: { name: 'D', code: 68 },
        note: 'D#',
        sound: null
      },
      { keyStyle: 'key-white e-key', keyButton: { name: 'C', code: 67 }, note: 'E', sound: null },
      { keyStyle: 'key-white f-key', keyButton: { name: 'V', code: 86 }, note: 'F', sound: null },
      {
        keyStyle: 'key-black fsh-key',
        keyButton: { name: 'G', code: 71 },
        note: 'F#',
        sound: null
      },
      { keyStyle: 'key-white g-key', keyButton: { name: 'B', code: 66 }, note: 'G', sound: null },
      {
        keyStyle: 'key-black gsh-key',
        keyButton: { name: 'H', code: 72 },
        note: 'G#',
        sound: null
      },
      { keyStyle: 'key-white a-key', keyButton: { name: 'N', code: 78 }, note: 'A', sound: null },
      {
        keyStyle: 'key-black ash-key',
        keyButton: { name: 'J', code: 74 },
        note: 'A#',
        sound: null
      },
      { keyStyle: 'key-white b-key', keyButton: { name: 'M', code: 77 }, note: 'B', sound: null }
    ]
  },
  {
    octaveClass: 'octave-3',
    keyData: [
      { keyStyle: 'key-white c-key', keyButton: { name: 'Q', code: 81 }, note: 'C', sound: null },
      {
        keyStyle: 'key-black csh-key',
        keyButton: { name: '2', code: 50 },
        note: 'C#',
        sound: null
      },
      { keyStyle: 'key-white d-key', keyButton: { name: 'W', code: 87 }, note: 'D', sound: null },
      {
        keyStyle: 'key-black dsh-key',
        keyButton: { name: '3', code: 51 },
        note: 'D#',
        sound: null
      },
      { keyStyle: 'key-white e-key', keyButton: { name: 'E', code: 69 }, note: 'E', sound: null },
      { keyStyle: 'key-white f-key', keyButton: { name: 'R', code: 82 }, note: 'F', sound: null },
      {
        keyStyle: 'key-black fsh-key',
        keyButton: { name: '5', code: 53 },
        note: 'F#',
        sound: null
      },
      { keyStyle: 'key-white g-key', keyButton: { name: 'T', code: 84 }, note: 'G', sound: null },
      {
        keyStyle: 'key-black gsh-key',
        keyButton: { name: '6', code: 54 },
        note: 'G#',
        sound: null
      },
      { keyStyle: 'key-white a-key', keyButton: { name: 'Y', code: 89 }, note: 'A', sound: null },
      {
        keyStyle: 'key-black ash-key',
        keyButton: { name: '7', code: 55 },
        note: 'A#',
        sound: null
      },
      { keyStyle: 'key-white b-key', keyButton: { name: 'U', code: 85 }, note: 'B', sound: null }
    ]
  },
  {
    octaveClass: 'octave-4',
    keyData: [
      { keyStyle: 'key-white c-key', keyButton: { name: 'I', code: 73 }, note: 'C', sound: null },
      {
        keyStyle: 'key-black csh-key',
        keyButton: { name: '9', code: 57 },
        note: 'C#',
        sound: null
      },
      { keyStyle: 'key-white d-key', keyButton: { name: 'O', code: 79 }, note: 'D', sound: null },
      {
        keyStyle: 'key-black dsh-key',
        keyButton: { name: '0', code: 48 },
        note: 'D#',
        sound: null
      },
      { keyStyle: 'key-white e-key', keyButton: { name: 'P', code: 80 }, note: 'E', sound: null },
      { keyStyle: 'key-white f-key', keyButton: { name: '', code: null }, note: 'F', sound: null },
      {
        keyStyle: 'key-black fsh-key',
        keyButton: { name: '', code: null },
        note: 'F#',
        sound: null
      },
      { keyStyle: 'key-white g-key', keyButton: { name: '', code: null }, note: 'G', sound: null },
      {
        keyStyle: 'key-black gsh-key',
        keyButton: { name: '', code: null },
        note: 'G#',
        sound: null
      },
      { keyStyle: 'key-white a-key', keyButton: { name: '', code: null }, note: 'A', sound: null },
      {
        keyStyle: 'key-black ash-key',
        keyButton: { name: '', code: null },
        note: 'A#',
        sound: null
      },
      { keyStyle: 'key-white b-key', keyButton: { name: '', code: null }, note: 'B', sound: null }
    ]
  }
])

const panList: number[] = []

for (let i = 0; i < 48; i++) {
  const pan = (2 / 48) * i - 1
  panList.push(pan)
}

function getNotePan(panList: number[], i: number) {
  let pan = panList[i] * settingStore.stereoWidth
  if (pan > 1) {
    pan = 1
  }
  if (pan < -1) {
    pan = -1
  }
  return pan
}

function setSounds() {
  let i = 0
  for (const [index, octave] of keyboard.value.entries()) {
    const transposedOctave = 2 + index + settingStore.transposition
    for (const key of octave.keyData) {
      const frequency = defineNoteFrequency(key.note, transposedOctave)
      key.sound = new Sound(settings, getNotePan(panList, i), frequency)
      i++
    }
  }
}

function changeFrequencies() {
  let i = 0
  for (const [index, octave] of keyboard.value.entries()) {
    const transposedOctave = 2 + index + settingStore.transposition

    for (const key of octave.keyData) {
      const frequency = defineNoteFrequency(key.note, transposedOctave)
      key.sound?.changeFrequency(frequency)
      i++
    }
  }
}

function createContext() {
  context.value = new AudioContext()
}

onBeforeMount(() => {
  setSounds()
})

settingStore.$subscribe(() => {
  for (const octave of keyboard.value) {
    for (const key of octave.keyData) {
      if (key.sound) {
        key.sound.settings = { ...settingStore.getSettings() }
        key.sound.changeSettings()
      }
    }
  }
})

watch(stereoWidth, () => {
  let i = 0
  for (const octave of keyboard.value) {
    for (const key of octave.keyData) {
      if (key.sound) {
        const pan = getNotePan(panList, i)
        key.sound.panSetting = pan
        if (key.sound.stereoPan) {
          key.sound.stereoPan.pan.value = pan
        }
        i++
      }
    }
  }
})

watch(transposition, () => {
  changeFrequencies()
})
</script>

<template>
  <div class="keyboard" @click.prevent.once="createContext">
    <SynthKeyboardOctave
      v-for="octave in keyboard"
      :key="octave.octaveClass"
      :octave="octave"
      :context="context"
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
