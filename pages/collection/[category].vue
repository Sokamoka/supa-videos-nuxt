<script setup>
const route = useRoute();
console.log({ route: route.params });

const { data } = await useFetch("/api/collection", {
  params: {
    category: route?.params?.category,
  },
  headers: useRequestHeaders(["cookie"]),
});
</script>

<template>
  <div>
    <div>Collection: {{ route?.path }}</div>
    <ul>
      <li v-for="item in data">
        <NuxtLink :to="`/watch/${item.id}`">
          {{ item.title }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
