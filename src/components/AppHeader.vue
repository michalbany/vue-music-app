<script setup>
import { useModalStore } from '@/stores/modal'
import { useUserStore } from '@/stores/user'
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';

// Použití Pinia store
const modalStore = useModalStore()
const userStore = useUserStore()

const { locale } = useI18n(); // for language change

const route = useRoute()
const router = useRouter()

const currentLocale = computed(() => {
  return locale.value === "cs" ? "Čeština" : "English"
})

// Metoda pro přepínání stavu modalu
function toggleAuthModal() {
  modalStore.isOpen = !modalStore.isOpen
}

function signout(){
  userStore.signout()

  if (route.meta.requiresAuth) {
    router.push({ name: "home" })
  }
}

function changeLocale() {
  locale.value = locale.value === "cs" ? "en" : "cs"
}
</script>

<template>
  <!-- Header -->
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <RouterLink
        class="text-white font-bold uppercase text-2xl mr-4"
        :to="{ name: 'home' }"
        exact-active-class=""
        >Music</RouterLink
      >

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
          <li>
            <RouterLink class="px-2 text-white" :to="{ name: 'about' }">About</RouterLink>
          </li>
          <li v-if="!userStore.userLoggedIn">
            <a class="px-2 text-white" href="#" @click.prevent="toggleAuthModal"
              >Login / Register</a
            >
          </li>
          <template v-else>
            <li>
              <RouterLink class="px-2 text-white" :to="{ name: 'manage' }">Manage</RouterLink>
            </li>
            <li>
              <a class="px-2 text-white" href="#" @click.prevent="signout">logout</a>
            </li>
          </template>
        </ul>
        <ul class="ml-auto">
          <li>
            <a class="px-2 text-white" href="#" @click.prevent="changeLocale">
              {{ currentLocale }}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>
