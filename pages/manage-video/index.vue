<script setup>
const LIMIT = 2;

const route = useRoute();

definePageMeta({
  middleware: ["auth"],
  key: "manage-video",
  pageTransition: { name: "slide-fade", mode: "out-in" },
});

const currentPage = computed(() => parseInt(route.query?.page ?? 1, 10));

const { from, to } = usePagination(currentPage, LIMIT);

const { data, pending, error, refresh } = await useAsyncData("videos", () =>
  $fetch("/api/videos", {
    headers: useRequestHeaders(["cookie"]),
    params: {
      from: from.value,
      to: to.value,
    },
  })
);

onMounted(refresh);

watch(from, refresh);

const totalPage = computed(() => Math.round(data.value?.total / LIMIT));
</script>
<template>
  <div class="my-10">
    <div class="mb-5 flex justify-between">
      <h1 class="text-2xl font-bold">Manage Videos</h1>
      <div>{{ pending }}</div>
      <NuxtLink to="/manage-video/add" class="button is-primary">New</NuxtLink>
    </div>
    <div v-if="error">{{ error }}</div>
    {{ currentPage }}
    From: {{ from }} To: {{ to }}
    <ul class="space-y-3">
      <li
        v-for="item in data.videos"
        :key="item.id"
        class="flex space-x-4 p-5 bg-white rounded-md shadow-sm"
      >
        <div class="flex-1">{{ item.title }}</div>
        <NuxtLink :to="`/manage-video/edit-${item.id}`">Edit</NuxtLink>
        <a href="#">Delete</a>
      </li>
    </ul>

    <div class="flex space-x-2">
      <nuxt-link
        v-for="i in totalPage"
        :key="i"
        :to="{
          path: '/manage-video',
          query: {
            page: i,
          },
        }"
        :class="{ 'text-blue-500': i === currentPage }"
      >
        {{ i }}
      </nuxt-link>
    </div>
  </div>
</template>
