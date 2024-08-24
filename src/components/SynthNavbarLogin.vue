<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/users'
import { supabase } from '@/supabase'

const { handleLogin } = useUserStore()

const { loading, errorMessage } = storeToRefs(useUserStore())

const showModal = defineModel<boolean>()

function closeModal() {
  showModal.value = false
  errorMessage.value = ''
}

async function submit() {
  const res: any = await handleLogin(email.value, password.value)
  if (res.username) {
    closeModal()
  }
}

const formIsValid = ref(false)

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

const password = ref('')
const passwordRules = ref([
  (value: string) => {
    if (value.length > 6) return true

    return 'Password must be at least 3 characters.'
  }
])
</script>

<template>
  <main>
    <v-dialog v-model="showModal" width="auto" @afterLeave="closeModal">
      <v-card
        max-width="400"
        min-width="400"
        title="Log In"
        class="card"
        rounded="0"
        :loading="loading"
      >
        <v-form @submit.prevent="submit" v-model="formIsValid">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            rounded="0"
          ></v-text-field>

          <v-text-field
            type="password"
            v-model="password"
            :rules="passwordRules"
            label="Password"
            rounded="0"
          ></v-text-field>
          <p class="error-message">{{ errorMessage }}</p>
          <v-btn class="mt-2" :type="formIsValid ? 'submit' : 'button'" block rounded="0"
            >Enter</v-btn
          >
          <v-btn class="mt-2" @click="closeModal" block rounded="0">Cancel</v-btn>
        </v-form>
      </v-card>
    </v-dialog>
  </main>
</template>

<style scoped lang="scss">
.card {
  font-family: 'Noto Sans', sans-serif;

  padding: 1rem;

  .error-message {
    color: rgb(176, 0, 32);
  }

  button {
    text-transform: unset;
    font-size: 1rem;
  }
}
</style>
