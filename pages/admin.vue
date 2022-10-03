<script setup>
import { ROLE_ADMIN } from "~~/constants";

definePageMeta({
  role: [ROLE_ADMIN],
  middleware: ["auth"],
  pageTransition: { name: 'slide-fade' }
});

const states = reactive({
  title: '',
  description: '',
  category: '',
  videoId: '',
  availability: '',
});

const onSave = () => {
  console.log('SAVE:', states);
}
</script>

<template>
  <div class="container">
    <div class="max-w-md mx-auto p-8 mt-10 rounded-lg shadow-md bg-white">
      <h1 class="text-2xl font-bold mb-10">Admin</h1>
      <form class="space-y-5" @submit.prevent="onSave">
        <div class="field">
          <label for="title">Title:</label>
          <input id="title" class="input" type="text" v-model="states.title" />
        </div>
        <div class="field">
          <label for="description">Description:</label>
          <textarea id="description" class="input" v-model="states.description" />
        </div>
        <div class="field">
          <label for="category">Category:</label>
          <input id="category" class="input" type="text" v-model="states.category" />
        </div>
        <div class="field">
          <label for="videoId">Video Id:</label>
          <input id="videoId" class="input" type="text" v-model="states.videoId" />
        </div>

        <div class="field">
          <label for="availability">Availability:</label>
          <select id="availability" class="input" type="text" v-model="states.availability">
            <option>User</option>
            <option>Admin</option>
          </select>
        </div>

        <div>
          <button class="button is-primary w-full">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style>
.form-control {
  @apply flex flex-col;
}
</style>
