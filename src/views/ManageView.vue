<script setup>
import CompositionItem from '@/components/CompositionItem.vue'
import FilesUpload from '@/components/FilesUpload.vue'
import { songsCollection, auth } from '@/includes/firebase'
import { ref, onMounted } from 'vue'

const songs = ref([])

// We would probably change this to computed (very meybe)
// Download songs from firebase
onMounted(async () => {
  const snapshot = await songsCollection.where('uid', '==', auth.currentUser.uid).get()
  snapshot.forEach((document) => {
    const song = {
      ...document.data(),
      docID: document.id
    }

    songs.value.push(song)
  })
})
</script>

<template>
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="col-span-1">
        <FilesUpload />
      </div>
      <div class="col-span-2">
        <div class="bg-white rounded border border-gray-200 relative flex flex-col">
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">My Songs</span>
            <i class="fa fa-compact-disc float-right text-green-400 text-2xl"></i>
          </div>
          <div class="p-6">
            <!-- Composition Items -->
            <CompositionItem :song="song" v-for="song in songs" :key="song.docID" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
