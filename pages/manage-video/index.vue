<script setup>
const LIMIT = 2;

const route = useRoute();

definePageMeta({
  middleware: ["auth"],
  key: "manage-video",
  pageTransition: { name: "slide-fade", mode: "out-in" },
  keepalive: false,
});

const currentPage = computed(() => parseInt(route.query?.page ?? 1, 10));

const { from, to } = usePagination(currentPage, LIMIT, 'videos');

const { data, pending, error } = await useAsyncData(
  "videos",
  () =>
    $fetch("/api/videos", {
      headers: useRequestHeaders(["cookie"]),
      params: {
        from: from.value,
        to: to.value,
      },
    }),
  {
    immediate: false,
    transform: (data) => {
      const converted = data?.videos.map((item) => ({
        ...item,
        createdAt: useDateFormat(item.created_at, 'YYYY-MM-DD HH:mm:ss'),
      }));
      return { videos: converted, total: data.total };
    },
  }
);

const totalPage = computed(() => Math.round((data.value?.total ?? 1) / LIMIT));
</script>
<template>
  <div class="my-10">
    <div class="mb-5 flex justify-between">
      <h1 class="text-2xl font-bold">Manage Videos</h1>
      <div>{{ pending }}</div>
      <NuxtLink to="/manage-video/add" class="button is-primary">New</NuxtLink>
    </div>
    <div v-if="error">{{ error }}</div>
    <ul class="space-y-3">
      <li
        v-for="item in data?.videos"
        :key="item.id"
        class="flex space-x-4 p-5 bg-white rounded-md shadow-sm"
      >
        <div class="flex-1">{{ item.title }}</div>
        <div class="flex-1">{{ item.createdAt }}</div>
        <NuxtLink :to="`/manage-video/edit-${item.id}`">Edit</NuxtLink>
        <a href="#">Delete</a>
      </li>
    </ul>

    <div class="flex space-x-3 my-5">
      <nuxt-link
        v-for="i in totalPage"
        :key="i"
        :to="{
          path: '/manage-video',
          query: {
            page: i,
          },
        }"
        :class="[
          'px-4 py-2 font-bold text-slate-500 bg-slate-200 rounded-full',
          { 'text-blue-500': i === currentPage },
        ]"
      >
        {{ i }}
      </nuxt-link>
    </div>
  </div>
</template>
