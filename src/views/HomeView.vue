<script setup>
import { ref, onBeforeUnmount, onMounted } from 'vue'
import { songsCollection } from '@/includes/firebase'
import SongItem from '@/components/SongItem.vue'
import vIconSecondary from '@/directives/icon-secondary'
import { useI18n } from 'vue-i18n'

const songs = ref([])
const maxPerpage = 10
const pendingRequest = ref(false)
const { t } = useI18n()

onMounted(async () => {
  getSongs()

  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})

function handleScroll() {
  const { scrollTop, offsetHeight } = document.documentElement
  const { innerHeight } = window
  const bottomOfWindow = Math.round(scrollTop) + innerHeight === offsetHeight

  if (bottomOfWindow) {
    getSongs()
  }
}

// infinite loading
async function getSongs() {
  if (pendingRequest.value) {
    return
  }
  pendingRequest.value = true
  let snapshots

  if (songs.value.length) {
    const lastDoc = await songsCollection.doc(songs.value[songs.value.length - 1].docID).get()
    snapshots = await songsCollection
      .orderBy('modified_name')
      .startAfter(lastDoc)
      .limit(maxPerpage)
      .get()
  } else {
    snapshots = await songsCollection.orderBy('modified_name').limit(maxPerpage).get()
  }

  snapshots.forEach((document) => {
    songs.value.push({
      ...document.data(),
      docID: document.id
    })
  })

  pendingRequest.value = false
}
</script>

<template>
  <main>
    <!-- Introduction -->
    <section class="mb-8 py-20 text-white text-center relative">
      <div
        class="absolute inset-0 w-full h-full bg-contain introduction-bg"
        style="background-image: url(assets/img/header.png)"
      ></div>
      <div class="container mx-auto">
        <div class="text-white main-header-content">
          <h1 class="font-bold text-5xl mb-5">{{ t('home.listen') }}</h1>
          <p class="w-full md:w-8/12 mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus et dolor mollis,
            congue augue non, venenatis elit. Nunc justo eros, suscipit ac aliquet imperdiet,
            venenatis et sapien. Duis sed magna pulvinar, fringilla lorem eget, ullamcorper urna.
          </p>
        </div>
      </div>

      <img
        class="relative block mx-auto mt-5 -mb-20 w-auto max-w-full"
        src="/assets/img/introduction-music.png"
      />
    </section>

    <!-- Main Content -->
    <section class="container mx-auto">
      <div class="bg-white rounded border border-gray-200 relative flex flex-col">
        <div
          class="px-6 pt-6 pb-5 font-bold border-b border-gray-200"
          v-icon-secondary="{ icon: 'headphones-alt', right: true, color: 'green' }"
        >
          <span class="card-title">{{ t('song.songs') }}</span>
          <!-- Icon -->
        </div>
        <!-- Playlist -->
        <ol id="playlist">
          <SongItem v-for="song in songs" :key="song.docID" :song="song" />
        </ol>
        <!-- .. end Playlist -->
      </div>
    </section>
  </main>
</template>
