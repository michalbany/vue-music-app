<script setup>
import CompositionItem from '@/components/CompositionItem.vue'
import FilesUpload from '@/components/FilesUpload.vue'
import { songsCollection, auth } from '@/includes/firebase'
import { ref, watchEffect } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'

const songs = ref([])
const unsavedFlag = ref(false)

// We would probably change this to computed (very meybe)
// Download songs from firebase
watchEffect(async () => {
  const snapshot = await songsCollection.where('uid', '==', auth.currentUser.uid).get()
  snapshot.forEach(addSong)
})

function updateSong(i, values) {
  songs.value[i].modified_name = values.modified_name
  songs.value[i].genre = values.genre
}

function removeSong(i) {
  songs.value.splice(i, 1)
}

function addSong(document) {
  const song = {
    ...document.data(),
    docID: document.id
  }
  songs.value.push(song)
}

function updateUnsavedFlag(value) {
  unsavedFlag.value = value
}

onBeforeRouteLeave((from, to, next) => {
  if (!unsavedFlag.value) {
    next()
  } else {
    const leave = confirm('You have unsaved changes. Are you sure you want to leave?')
    next(leave)
  }
})
</script>

<template>
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="col-span-1">
        <FilesUpload :addSong="addSong" />
      </div>
      <div class="col-span-2">
        <div class="bg-white rounded border border-gray-200 relative flex flex-col">
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">{{ $t('manage.my_songs') }}</span>
            <i class="fa fa-compact-disc float-right text-green-400 text-2xl"></i>
          </div>
          <div class="p-6">
            <!-- Composition Items -->
            <CompositionItem
              :song="song"
              v-for="(song, i) in songs"
              :key="song.docID"
              :updateSong="updateSong"
              :index="i"
              :removeSong="removeSong"
              :updateUnsavedFlag="updateUnsavedFlag"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
