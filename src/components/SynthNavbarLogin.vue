<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/users'

const { handleLogin } = useUserStore()

const { loading } = storeToRefs(useUserStore())

const showModal = defineModel<boolean>()

function closeModal() {
  showModal.value = false
}

async function submit() {
  await handleLogin(email.value, password.value)

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
    <v-dialog v-model="showModal" width="auto">
      <v-card
        max-width="400"
        min-width="400"
        prepend-icon="mdi-update"
        title="Log In"
        class="card"
        :loading="loading"
      >
        <v-form @submit.prevent="submit">
          <v-text-field v-model="email" :rules="emailRules" label="E-mail"></v-text-field>

          <v-text-field
            type="password"
            v-model="password"
            :rules="passwordRules"
            label="Password"
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
