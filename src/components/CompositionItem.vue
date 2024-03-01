<script setup>
import { ErrorMessage } from 'vee-validate'
import { ref } from 'vue'

const showForm = ref(false)

const in_submission = ref(false)
const show_alert = ref(false)
const alert_variant = ref('bg-blue-500')
const alert_message = ref('')

const props = defineProps({
  song: {
    type: Object,
    required: true
  }
})

const songSchema = {
  modified_name: 'required',
  genre: 'alphaSpaces'
}

function edit() {
  console.log('song Edited')
}
</script>
<template>
  <div class="border border-gray-200 p-3 mb-4 rounded">
    <div v-show="!showForm">
      <h4 class="inline-block text-2xl truncate max-w-[70%] font-bold">{{ song.modified_name }}</h4>
      <button class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right">
        <i class="fa fa-times"></i>
      </button>
      <button
        @click.prevent="showForm = !showForm"
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
      >
        <i class="fa fa-pencil-alt"></i>
      </button>
    </div>
    <div v-show="showForm">
      <div
        class="text-white text-center font-bold p-4 mb-4 rounded"
        :class="alert_variant"
        v-show="show_alert"
      >
        {{ alert_message }}
      </div>
      <VeeForm :validation-schema="songSchema" :initial-values="song" @submit="edit">
        <div class="mb-3">
          <label class="inline-block mb-2">Song Title</label>
          <VeeField
            name="modified_name"
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Song Title"
          />
          <ErrorMessage class="text-red-600" name="modified_name" />
        </div>
        <div class="mb-3">
          <label class="inline-block mb-2">Genre</label>
          <VeeField
            name="genre"
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Genre"
            :value="song.genre"
          />
          <ErrorMessage class="text-red-600" name="genre" />
        </div>
        <button type="submit" class="py-1.5 px-3 rounded text-white bg-green-600">Submit</button>
        <button
          type="button"
          @click.prevent="showForm = false"
          class="py-1.5 px-3 rounded text-white bg-gray-600"
        >
          Go Back
        </button>
      </VeeForm>
    </div>
  </div>
</template>
