import { ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/supabase'
import type { userCredentials, userData } from '@/types/types'

export const useUserStore = defineStore('users', () => {
  const user = ref<null | userData>(null)
  const errorMessage = ref('')
  const loading = ref(false)
  const loadingUser = ref(false)

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  }

  const handleLogin = async (email: string, password: string) => {
    if (!validateEmail(email)) {
      return (errorMessage.value = 'Email is invalid')
    }

    if (!password.length) {
      return (errorMessage.value = 'Password cannot be empty')
    }

    loading.value = true

    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      loading.value = false
      errorMessage.value = error.message
    }

    if (data.user) {
      const { data: existingUser } = await supabase
        .from('users')
        .select()
        .eq('email', data.user.email)
        .single()

      user.value = {
        id: existingUser.id,
        email: existingUser.email,
        username: existingUser.username
      }
    }

    loading.value = false
  }

  const handleSignup = async (credentials: userCredentials) => {
    const { email, password, username } = credentials

    if (password.length < 6) {
      return (errorMessage.value = 'Password length is too short')
    }

    if (username.length < 3) {
      return (errorMessage.value = 'Username length is too short')
    }

    if (!validateEmail(email)) {
      return (errorMessage.value = 'Email is invalid')
    }

    loading.value = true

    errorMessage.value = ''

    const { data: userWithUsername } = await supabase
      .from('users')
      .select()
      .eq('username', username)
      .single()

    if (userWithUsername) {
      loading.value = false
      return (errorMessage.value = 'User with this name alerady exists')
    }

    const { data: authData, error } = await supabase.auth.signUp({
      email,
      password
    })

    if (error) {
      loading.value = false
      return (errorMessage.value = error.message)
    }

    await supabase.from('users').insert({
      username: username,
      email: email
    })

    const { data: newUser } = await supabase.from('users').select().eq('email', email).single()

    user.value = {
      id: newUser.id,
      email: newUser.email,
      username: newUser.username
    }

    loading.value = false
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    user.value = null
  }

  const getUser = async () => {
    loadingUser.value = true
    const { data } = await supabase.auth.getUser()

    if (!data.user) {
      user.value = null
      loadingUser.value = false
      return
    }

    const { data: userWithEmail } = await supabase
      .from('users')
      .select()
      .eq('email', data.user.email)
      .single()

    user.value = {
      id: userWithEmail.id,
      email: userWithEmail.email,
      username: userWithEmail.username
    }

    loadingUser.value = false
  }

  const clearErrorMessage = () => {
    errorMessage.value = ''
  }

  return {
    user,
    errorMessage,
    handleLogin,
    handleSignup,
    handleLogout,
    getUser,
    clearErrorMessage,
    loading,
    loadingUser
  }
})
