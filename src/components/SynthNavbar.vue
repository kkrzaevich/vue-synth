<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SynthNavbarLogin from './SynthNavbarLogin.vue'
import SynthNavbarSignUp from './SynthNavbarSignUp.vue'
import { useUserStore } from '@/stores/users'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()

const { user, loadingUser } = storeToRefs(userStore)

const loginDialog = ref(false)
const signupDialog = ref(false)

async function logout() {
  await userStore.handleLogout()
}

onMounted(async () => {
  userStore.getUser()
})
</script>

<template>
  <Transition mode="out-in" appear>
    <v-progress-circular
      v-if="loadingUser"
      class="load-circle"
      color="black"
      indeterminate
    ></v-progress-circular>
    <main class="navbar" v-else>
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
  </Transition>
</template>

<style scoped lang="scss">
.load-circle {
  padding-top: 10px;
  height: 36px;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

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
