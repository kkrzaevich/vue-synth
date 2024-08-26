<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { usePresetStore } from '@/stores/presets'

const props = defineProps<{
  currentAuthor: string | null
}>()

const presetStore = usePresetStore()

const uniqueAuthors = computed(() => {
  return [...presetStore.getUniqueAuthors()]
})
</script>

<template>
  <div class="authors">
    <TransitionGroup tag="div" name="fade" class="transition-container">
      <v-btn
        variant="elevated"
        :color="author === currentAuthor ? '#424242' : ''"
        class="text-none main-button"
        v-for="author in uniqueAuthors"
        :key="author"
        @click="$emit('authorChange', author)"
      >
        {{ author }}
      </v-btn>
    </TransitionGroup>
  </div>
</template>

<style scoped lang="scss">
.transition-container {
  display: flex;
  flex-direction: row;
  gap: 5px;
  flex-wrap: wrap;
  position: relative;
}

.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

.fade-leave-active {
  position: absolute;
}

.authors {
  gap: 5px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  padding: 15px;

  overflow-y: auto;
  overflow-x: hidden;
  align-content: flex-start;
  justify-content: flex-start;
  position: relative;
}

.main-button {
  font-size: 1rem;
  border-radius: 0px;
  letter-spacing: inherit;
  font-family: inherit;
  width: 240px;
  z-index: 0;
}
</style>
