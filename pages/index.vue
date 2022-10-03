<script setup>
definePageMeta({
  key: "index",
  pageTransition: { name: "slide-fade", mode: "out-in" },
});

const { data } = await useFetch("/api/collections", {
  headers: useRequestHeaders(["cookie"]),
});
</script>

<template>
  <div class="container">
    <div class="flex flex-wrap p-10 gap-3">
      <template v-for="item in data" :key="item.id">
        <NuxtLink
          :to="`/watch/${item.id}`"
          class="bg-white rounded-md w-1/4 shadow-md overflow-hidden"
        >
          <div>
            <img
              src="https://picsum.photos/seed/picsum/300/200"
              class="aspect-video object-cover"
            />
          </div>
          <div class="py-3 px-5">
            {{ item.title }}
          </div>
        </NuxtLink>
      </template>
    </div>
  </div>
</template>
