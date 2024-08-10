<script setup lang="ts">
import { ref } from 'vue'
import SynthNavbarLogin from './SynthNavbarLogin.vue'
import SynthNavbarSignUp from './SynthNavbarSignUp.vue'
import { useUserStore } from '@/stores/users'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()

const { user } = storeToRefs(userStore)

const loginDialog = ref(false)
const signupDialog = ref(false)

async function logout() {
  await userStore.handleLogout()
}
</script>

<template>
  <main class="navbar">
    <v-hover v-slot="{ isHovering, props }">
      <v-btn
        v-if="!user"
        class="text-none"
        variant="elevated"
        :elevation="isHovering ? 10 : 0"
        v-bind="props"
        @click="loginDialog = true"
        >Login</v-btn
      >
    </v-hover>
    <v-hover v-slot="{ isHovering, props }"
      ><v-btn
        v-if="!user"
        class="text-none"
        variant="elevated"
        :elevation="isHovering ? 10 : 0"
        v-bind="props"
        @click="signupDialog = true"
        >Sign Up</v-btn
      ></v-hover
    >

    <p v-if="user">Hello, {{ user.username }}!</p>
    <v-btn v-if="user" class="text-none" variant="text" @click="logout()">Sign Out</v-btn>
    <SynthNavbarLogin v-model="loginDialog"></SynthNavbarLogin>
    <SynthNavbarSignUp v-model="signupDialog"></SynthNavbarSignUp>
  </main>
</template>

<style scoped lang="scss">
.navbar {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-direction: row;
  padding: 10px;

  p {
    font-weight: bold;
  }

  button {
    font-size: 1rem;
    border-radius: 0px;
    letter-spacing: inherit;
    font-family: inherit;
  }
}
</style>
