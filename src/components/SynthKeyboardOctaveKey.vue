<script setup lang="ts">
import { defineProps, ref, watch, inject } from 'vue'
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
  active: boolean
  context: AudioContext | null
}>()

const { changeMouseInput } = useKeyboardStore()

// @ts-ignore
const { pointerdownGlobal } = inject('pointEvents')

const pointerover = ref<boolean | null>(null)

const pointerout = ref<boolean | null>(null)

watch(pointerover, () => {
  if (pointerdownGlobal.value && pointerover.value) {
    changeMouseInput(props.button.id, true)
  }
})

// watch(pointerdown, () => {
//   if (pointerdown.value && pointerover.value) {
//     addNote(props.button.id)
//   }
// })

watch(pointerout, () => {
  if (pointerdownGlobal.value && pointerout.value) {
    changeMouseInput(props.button.id, false)
  }
})
</script>

<template>
  <v-btn
    :class="`key ${keyStyle} ${active ? 'active' : ''}`"
    @pointerover="
      () => {
        pointerover = true
        pointerout = false
      }
    "
    @pointerout="
      () => {
        pointerout = true
        pointerover = false
      }
    "
    @pointerdown="
      () => {
        changeMouseInput(props.button.id, true)
      }
    "
    @pointerup="
      () => {
        changeMouseInput(props.button.id, false)
      }
    "
  >
    {{ button?.name }}
  </v-btn>
</template>

<style scoped lang="scss">
.key-white {
  border-radius: 0px;
  text-align: center;
  z-index: 1;
  grid-row: 1;
  grid-row-start: 1;
  grid-row-end: 3;
  background-color: white;
  color: black;
  font-family: 'Noto Sans', sans-serif;
  transition: background-color 0.2s;
  min-width: unset;
  padding: unset;
  width: 100%;
  height: 100%;
}

.key-black {
  border-radius: 0px;
  text-align: center;
  z-index: 2;
  grid-row: 1;
  background-color: rgb(102, 102, 102);
  grid-row-start: 1;
  grid-row-end: 2;
  color: black;
  font-family: 'Noto Sans', sans-serif;
  transition: background-color 0.2s;
  min-width: unset;
  padding: unset;
  width: 100%;
  height: 100%;
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

.active {
  background-color: #ff597b;
}
</style>
