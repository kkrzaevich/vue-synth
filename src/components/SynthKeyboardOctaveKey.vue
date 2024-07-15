<script setup lang="ts">
import { defineProps, reactive, watch, inject } from 'vue'
import type { NoteId } from '@/types/types'
import type { Sound } from '@/types/sound'
import { useKeyboardStore } from '@/stores/keyboard'

const props = defineProps<{
  keyStyle: string
  sound: Sound | null
  button: {
    id: NoteId
    name: string
    code: number | null
  }
  context: AudioContext | null
}>()

const { addNote, removeNote } = useKeyboardStore()

const playEvents = reactive({ pointerdown: false, pointerover: false })

const stopEvents = reactive({ pointerup: false, pointerout: false })

watch(playEvents, () => {
  if (playEvents.pointerdown && playEvents.pointerover) {
    addNote(props.button.id)
  }
})

watch(stopEvents, () => {
  if (stopEvents.pointerup || stopEvents.pointerout) {
    removeNote(props.button.id)
  }
})
</script>

<template>
  <button
    :class="`key ${keyStyle}`"
    @pointerdown="
      () => {
        playEvents.pointerdown = true
        stopEvents.pointerup = false
      }
    "
    @pointerover="
      () => {
        playEvents.pointerover = true
        stopEvents.pointerout = false
      }
    "
    @pointerup="
      () => {
        stopEvents.pointerup = true
        playEvents.pointerdown = false
      }
    "
    @pointerout="
      () => {
        stopEvents.pointerout = true
        playEvents.pointerover = false
      }
    "
  >
    {{ button?.name }}
  </button>
</template>

<style scoped lang="scss">
.key-white {
  border-radius: 3px;
  border: 1px solid black;
  text-align: center;
  z-index: 1;
  grid-row: 1;
  grid-row-start: 1;
  grid-row-end: 3;
  background-color: white;
  color: black;
  font-family: 'Noto Sans', sans-serif;
  transition: background-color 0.2s;
}

.key-black {
  border-radius: 3px;
  border: 1px solid black;
  text-align: center;
  z-index: 2;
  grid-row: 1;
  background-color: rgb(102, 102, 102);
  grid-row-start: 1;
  grid-row-end: 2;
  color: black;
  font-family: 'Noto Sans', sans-serif;
  transition: background-color 0.2s;
}

.c-key {
  grid-column-start: 1;
  grid-column-end: 3;
}

.csh-key {
  grid-column-start: 2;
  grid-column-end: 4;
}

.d-key {
  grid-column-start: 3;
  grid-column-end: 6;
}

.dsh-key {
  grid-column-start: 5;
  grid-column-end: 7;
}

.e-key {
  grid-column-start: 6;
  grid-column-end: 8;
}

.f-key {
  grid-column-start: 8;
  grid-column-end: 10;
}

.fsh-key {
  grid-column-start: 9;
  grid-column-end: 11;
}

.g-key {
  grid-column-start: 10;
  grid-column-end: 13;
}

.gsh-key {
  grid-column-start: 12;
  grid-column-end: 14;
}

.a-key {
  grid-column-start: 13;
  grid-column-end: 16;
}

.ash-key {
  grid-column-start: 15;
  grid-column-end: 17;
}

.b-key {
  grid-column-start: 16;
  grid-column-end: 18;
}
</style>
