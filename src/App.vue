<script setup lang="ts">
import { onMounted } from 'vue'
import { createAudioNodes } from './hooks/music'
import SynthPresets from './components/SynthPresets.vue'
import SynthKeyboard from './components/SynthKeyboard.vue'
import SynthControls from './components/SynthControls.vue'

onMounted(() => {
  const { context, delayNode, delayFeedback, delayGain } = createAudioNodes()

  const oscillator = context.createOscillator()
  // Присвоить ему тип и частоту
  oscillator.type = 'sine'
  oscillator.frequency.setValueAtTime(440, 0)
  // Задать гейн = 0
  // gain.gain.value = 0
  // Включить осциллятор
  oscillator.start(0)
  let mainGainNode = null
  mainGainNode = context.createGain()
  mainGainNode.connect(context.destination)
  mainGainNode.gain.value = 1
  // Присоединить к гейну
  oscillator.connect(mainGainNode)
})
</script>

<template>
  <main>
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
