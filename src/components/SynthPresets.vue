<script setup lang="ts">
import { type Preset } from '@/types/types'
import { ref, onMounted, computed, watch } from 'vue'
import { presetTable } from '@/data/presetData'
import { usePresetStore } from '@/stores/presets'

const presetStore = usePresetStore()

const items = ref(['a', 'b', 'c', 'd'])
</script>

<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card class="presets" :elevation="isHovering ? 8 : 0" v-bind="props">
      <div class="arrow-left">
        <button id="arrow-left" @click="presetStore.prevPreset">
          <v-icon icon="mdi-less-than" size="medium"></v-icon>
        </button>
      </div>
      <div class="preset">
        <div class="text-center">
          <v-menu>
            <template v-slot:activator="{ props }">
              <button id="preset-field" v-bind="props">
                {{ presetStore.currentPreset.name }}
              </button>
            </template>

            <v-list>
              <v-list-item v-for="(item, index) in items" :key="index">
                <v-list-item-title>{{ item }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>
      <div class="arrow-right">
        <button id="arrow-right" @click="presetStore.nextPreset">
          <v-icon icon="mdi-greater-than" size="medium"></v-icon>
        </button>
      </div> </v-card
  ></v-hover>
</template>

<style scoped lang="scss">
.presets {
  grid-row-start: 1;
  grid-row-end: 2;
  /* grid-column-start: 3;
  grid-column-end: 4; */

  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 1fr 3fr 1fr;

  text-align: center;

  padding-top: 0.75rem;
  padding-bottom: 0.75rem;

  margin-top: 0.75rem;
  margin-bottom: 1.5rem;

  border-radius: 0px;
}

.presets button {
  background-color: transparent;
  border: none;
  font-size: 1rem;
  color: black;
  transition: color 0.2s;
}

.presets button:hover {
  color: #ff597b;
}

.presets button:active {
  filter: contrast(200%);
}

.arrow-left {
  grid-row-start: 1;
  grid-row-end: 2;
  grid-column-start: 1;
  grid-column-end: 2;

  margin-top: auto;
  margin-bottom: auto;
}

.preset-field {
  grid-row-start: 1;
  grid-row-end: 2;
  grid-column-start: 2;
  grid-column-end: 3;
}

.arrow-right {
  grid-row-start: 1;
  grid-row-end: 2;
  grid-column-start: 3;
  grid-column-end: 4;

  margin-top: auto;
  margin-bottom: auto;
}

/* Для широких экранов */

@media (min-width: 1300px) {
  .presets {
    grid-column-start: 3;
    grid-column-end: 4;
  }
}

/* Для чуть менее широких экранов */

@media (max-width: 1299px) {
  .presets {
    grid-column-start: 3;
    grid-column-end: 4;
  }
}

/* Для планшетов */

@media (max-width: 1149px) {
  .presets {
    grid-column-start: 2;
    grid-column-end: 5;
  }
}

/* Для телефонов */

@media (max-width: 909px) {
  .presets {
    grid-column-start: 2;
    grid-column-end: 5;
  }
}
</style>
