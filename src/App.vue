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

  <RouterView v-slot="{ Component }">
    <Transition name="fade" mode="out-in">
      <component :is="Component"></component>
    </Transition>
  </RouterView>

  <!-- Player -->
  <AppPlayer />

  <AppAuth />
</template>

<style>
.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: all .5s ease;
}

.fade-leave-to {
  transition: all .5s ease;
  opacity: 0;
}
</style>
