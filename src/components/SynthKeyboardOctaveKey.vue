<script setup lang="ts">
import { defineProps, reactive, watch } from 'vue'
import type { Sound } from '@/types/sound'
import { useSettingsStore } from '@/stores/settings'
const settingStore = useSettingsStore()

const props = defineProps<{
  keyStyle: string
  sound: Sound | null
  button?: { name: string; code: string | null }
  context: AudioContext | null
}>()

const playEvents = reactive({ pointerdown: false, pointerover: false })

const stopEvents = reactive({ pointerup: false, pointerout: false })

watch(playEvents, () => {
  if (playEvents.pointerdown && playEvents.pointerover) {
    play()
  }
})

watch(stopEvents, () => {
  if (stopEvents.pointerup && stopEvents.pointerout) {
    stop()
  }
})

function play() {
  if (props.context && props.sound) {
    props.sound.play(props.context)
  }
}

function stop() {
  if (props.context && props.sound) {
    props.sound.stop()
  }
}

function keyPress(event: any) {
  console.log('event', event.keyCode)
  console.log('prop', props.button?.code)
  if (event.keyCode === props.button?.code) {
    console.log('here we are')
    play()
  }
}

function keyRelease(event: any) {
  // console.log(event.keyCode)
  if (event.keyCode === props.button?.code) {
    console.log('here we stop')
    stop()
  }
}
</script>

<template>
  <button
    :class="`key ${keyStyle}`"
    @keydown="keyPress"
    @keyup="keyRelease"
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
