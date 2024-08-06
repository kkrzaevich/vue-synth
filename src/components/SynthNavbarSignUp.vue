<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/users'

const { handleSignup } = useUserStore()

const showModal = defineModel<boolean>()

function closeModal() {
  showModal.value = false
}

async function submit() {
  await handleSignup({
    email: email.value,
    password: password.value,
    username: username.value
  })

  showModal.value = false
}

// Login dialogue

const email = ref('')
const emailRules = ref([
  (value: string) => {
    if (value) return true

    return 'E-mail is requred.'
  },
  (value: string) => {
    if (/.+@.+\..+/.test(value)) return true

    return 'E-mail must be valid.'
  }
])

const username = ref('')
const usernameRules = ref([
  (value: string) => {
    if (value.length > 3) return true

    return 'Username must be at least 3 characters.'
  }
])

const password = ref('')
const passwordRules = ref([
  (value: string) => {
    if (value.length > 6) return true

    return 'Password must be at least 3 characters.'
  }
])
const confirmPassword = ref('')
const confirmPasswordRules = ref([
  (value: string) => {
    if (value.length > 6) return true

    return 'Password must be at least 3 characters.'
  },
  (value: string) => {
    if (value === password.value) return true

    return 'Passwords must match.'
  }
])
</script>

<template>
  <main>
    <v-dialog v-model="showModal" width="auto">
      <v-card
        max-width="400"
        min-width="400"
        prepend-icon="mdi-update"
        title="Sign Up"
        class="card"
      >
        <v-form @submit.prevent="submit" autocomplete="off">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            autocomplete="off"
          ></v-text-field>
          <v-text-field
            v-model="username"
            :rules="usernameRules"
            label="Username"
            autocomplete="off"
          ></v-text-field>
          <v-text-field
            type="password"
            v-model="password"
            :rules="passwordRules"
            label="Password"
            autocomplete="new-password"
          ></v-text-field>
          <v-text-field
            type="password"
            v-model="confirmPassword"
            :rules="confirmPasswordRules"
            label="Confirm password"
            autocomplete="new-password"
          ></v-text-field>
          <v-btn class="mt-2" type="submit" block>Submit</v-btn>
          <v-btn class="mt-2" @click="closeModal" block>Cancel</v-btn>
        </v-form>
      </v-card>
    </v-dialog>
  </main>
</template>

<style scoped lang="scss">
.card {
  padding: 1rem;
}

.navbar {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-direction: row;
  padding: 10px;

  button {
    font-size: 1rem;
  }
}
</style>
