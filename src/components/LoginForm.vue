<script setup>
import { ref } from 'vue'

const loginSchema = {
  email: 'required|email',
  password: 'required|min:8|max:100'
}

let login_in_submission = ref(false)
let login_show_alert = ref(false)
let login_alert_variant = ref('')
let login_alert_msg = ref('')

function login(values) {
  login_show_alert.value = true
  login_in_submission.value = true
  login_alert_variant.value = 'bg-blue-500'
  login_alert_msg.value = 'Please wait! We are login you in.'

  login_alert_variant.value = 'bg-green-500'
  login_alert_msg.value = 'Success! You are now logged in.'
}
</script>

<template>
    <div
    class="text-white text-center font-bold p-4 rounded mb-4"
    v-if="login_show_alert"
    :class="login_alert_variant"
  >
    {{ login_alert_msg }}
  </div>
  <VeeForm :validation-schema="loginSchema" @submit="login">
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <VeeField
        name="email"
        type="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <ErrorMessage class="text-red-600" name="email" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <VeeField
        name="password"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Password"
      />
      <ErrorMessage class="text-red-600" name="password" />
    </div>
    <button
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700 disabled:bg-purple-300"
      :disabled="login_in_submission"
    >
      Submit
    </button>
  </VeeForm>
</template>
