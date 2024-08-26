<script setup lang="ts">
import { supabase } from '@/supabase'
import { ref, onMounted, computed, watch } from 'vue'
import { useUserStore } from '@/stores/users'
import { storeToRefs } from 'pinia'

import SynthPresetBrowserAuthors from './SynthPresetBrowserAuthors.vue'
import SynthPresetBrowserNewPreset from './SynthPresetBrowserNewPreset.vue'
import SynthPresetBrowserPresets from './SynthPresetBrowserPresets.vue'

const userStore = useUserStore()

const { user } = storeToRefs(userStore)

const addPresetVisible = ref(false)

const userId = ref<string | undefined>('')

const currentAuthor = ref<string | null>(null)

const getUserId = async () => {
  const user = await supabase.auth.getUser()
  const userData = user.data.user
  return userData?.id
}

watch(user, async () => {
  userId.value = await getUserId()
})

onMounted(async () => {
  userId.value = await getUserId()
})
</script>

<template>
  <div class="preset-browser">
    <div class="the-card">
      <div class="container">
        <v-card class="authors-container">
          <SynthPresetBrowserAuthors
            :currentAuthor="currentAuthor"
            @authorChange="
              (author) => {
                currentAuthor = author
              }
            "
          ></SynthPresetBrowserAuthors>
          <Transition name="newPreset">
            <v-btn
              v-if="user"
              color="#424242"
              icon="mdi-plus"
              size="default"
              density="comfortable"
              :class="`add-presets-button ${addPresetVisible ? 'rotated' : ''}`"
              @click="addPresetVisible = !addPresetVisible"
            ></v-btn>
          </Transition>

          <Transition name="newPreset">
            <SynthPresetBrowserNewPreset
              :userId="userId"
              v-if="addPresetVisible"
              @addPreset="addPresetVisible = false"
              @focusTextArea="$emit('focusTextArea')"
            ></SynthPresetBrowserNewPreset>
          </Transition>
        </v-card>
        <SynthPresetBrowserPresets
          :currentAuthor="currentAuthor"
          :userId="userId"
        ></SynthPresetBrowserPresets>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.newPreset-enter-active,
.newPreset-leave-active {
  transition: opacity 0.5s ease;
}

.newPreset-enter-from,
.newPreset-leave-to {
  opacity: 0;
}

.preset-browser {
  grid-row-start: 2;
  grid-row-end: 3;
  grid-column-start: 2;
  grid-column-end: 5;

  justify-self: stretch;
}

.the-card {
  border-radius: 0px;
  padding: 1rem;
}

.container {
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 1fr 1fr;

  gap: 15px;

  .authors-container {
    height: 275px;
    max-height: 275px;
    border-radius: 0px;
    position: relative;
    z-index: 0;

    .add-presets-button {
      position: absolute;
      right: 7.5px;
      bottom: 7.5px;
      z-index: 15;
    }

    .rotated {
      transform: translate(5px, 5px) rotate(45deg);
    }
  }
}
</style>
