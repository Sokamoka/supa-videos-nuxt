<script setup>
import { ROLE_ADMIN } from "~~/constants";

definePageMeta({
  role: [ROLE_ADMIN],
  middleware: ["auth"],
  pageTransition: { name: "slide-fade" },
});

const emit = defineEmits(["change", 'create']);

const props = defineProps({
  model: {
    type: Object,
    default: null,
  },

  isEdit: {
    type: Boolean,
    default: false,
  },
});

const DEFAULT_STATE = {
  title: "",
  description: "",
  category: [],
  video_id: "",
  available: [],
};

const states = reactive(props.model || DEFAULT_STATE);

const onSave = () => {
  if (props.isEdit) return emit("change", states);
  emit("create", states);
};
</script>

<template>
  <div class="container">
    <div class="max-w-md mx-auto p-8 mt-10 rounded-lg shadow-md bg-white">
      <h1 class="text-2xl font-bold">
        {{ isEdit ? "Edit" : "Add" }}
      </h1>
      <p v-if="states.created_at" class="text-sm">
        {{ states.created_at }}
      </p>
      <form class="mt-10 space-y-5" @submit.prevent="onSave">
        <div class="field">
          <label for="title">Title:</label>
          <input id="title" class="input" type="text" v-model="states.title" />
        </div>
        <div class="field">
          <label for="description">Description:</label>
          <textarea
            id="description"
            class="input"
            v-model="states.description"
          />
        </div>
        <div class="field">
          <label for="category">Category:</label>
          <select
            id="category"
            class="input"
            v-model="states.category"
            multiple
          >
            <option value="icehockey">Icehockey</option>
            <option value="handball">Handball</option>
            <option value="football">Football</option>
            <option value="movie">Movie</option>
          </select>
        </div>
        <div class="field">
          <label for="videoId">Video Id:</label>
          <input
            id="videoId"
            class="input"
            type="text"
            v-model="states.video_id"
          />
        </div>

        <div class="field">
          <label for="availability">Availability:</label>
          <select
            id="availability"
            class="input"
            v-model="states.available"
            multiple
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div>
          <button class="button is-primary w-full">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>
