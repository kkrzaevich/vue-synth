<script setup lang="ts"></script>

<template>
  <div class="presets">
    <div class="arrow-left">
      <button id="arrow-left">
        <i class="pi pi-arrow-left"></i>
      </button>
    </div>
    <div class="preset">
      <p id="preset-field">Preset name</p>
    </div>
    <div class="arrow-right">
      <button id="arrow-right">
        <i class="pi pi-arrow-right"></i>
      </button>
    </div>
  </div>
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
}

.presets button {
  background-color: transparent;
  border: none;
  font-size: 1rem;
  color: black;
  transition: color 0.2s;
}

.presets button:hover {
  color: rgb(55, 147, 255);
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
