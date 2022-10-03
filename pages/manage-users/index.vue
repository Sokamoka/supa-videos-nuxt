<script setup>
const LIMIT = 2;

const route = useRoute();

definePageMeta({
  middleware: ["auth", "role"],
  key: "manage-users",
  pageTransition: { name: "slide-fade", mode: "out-in" },
  role: "admin",
});

const currentPage = computed(() => parseInt(route.query?.page ?? 1, 10));

const { from, to } = usePagination(currentPage, LIMIT);

const { data, pending, error, refresh } = await useAsyncData(
  "users",
  () =>
    $fetch("/api/users", {
      headers: useRequestHeaders(["cookie"]),
      params: {
        from: from.value,
        to: to.value,
      },
    }),
  {
    immediate: false,
    transform(data) {
      const converted = data?.users.map((item) => ({
        ...item,
        createdAt: useDateFormat(item.created_at, "YYYY-MM-DD HH:mm:ss"),
      }));
      return { users: converted, total: data.total };
    },
  }
);

onMounted(refresh);

watch(from, refresh);

const totalPage = computed(() => Math.round((data.value?.total ?? 1) / LIMIT));
</script>
<template>
  <div class="my-10">
    <div class="mb-5 flex justify-between">
      <h1 class="text-2xl font-bold">Manage Users</h1>
      <div>{{ pending }}</div>
    </div>
    <div v-if="error">{{ error }}</div>
    <ul class="space-y-3">
      <li
        v-for="item in data?.users"
        :key="item.id"
        class="flex space-x-4 p-5 bg-white rounded-md shadow-sm"
      >
        <div class="flex-1">{{ item.first_name }}</div>
        <div class="flex-1">{{ item.last_name }}</div>
        <div class="">{{ item.createdAt }}</div>
        <NuxtLink :to="`/manage-video/edit-${item.id}`">Edit</NuxtLink>
        <a href="#">Delete</a>
      </li>
    </ul>

    <div class="flex space-x-3 my-5">
      <nuxt-link
        v-for="i in totalPage"
        :key="i"
        :to="{
          path: '/manage-users',
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
