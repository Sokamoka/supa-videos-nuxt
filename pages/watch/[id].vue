<script setup>
definePageMeta({
  middleware: ["auth"],
});

const route = useRoute();
console.log({ route: route.params });

const { data } = await useFetch("/api/watch", {
  params: {
    id: route?.params?.id,
  },
  headers: useRequestHeaders(["cookie"]),
});
</script>

<template>
  <div>
    <div>Player: {{ route?.path }}</div>
    {{ data }}
  </div>
</template>
