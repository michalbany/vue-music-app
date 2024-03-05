<script setup>
import AppHeader from '@/components/AppHeader.vue'
import AppAuth from '@/components/AppAuth.vue'
import AppPlayer from '@/components/Player.vue'
import { useUserStore } from './stores/user'
import { auth } from './includes/firebase'
import { watchEffect } from 'vue'

const userStore = useUserStore()

watchEffect(() => {
  if (auth.currentUser) {
    userStore.userLoggedIn = true
  }
})
</script>

<template>
  <AppHeader />

  <RouterView />

  <!-- Player -->
  <AppPlayer />

  <AppAuth />
</template>
