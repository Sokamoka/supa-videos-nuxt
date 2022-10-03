<script setup>
definePageMeta({
  middleware: ["auth"],
  pageTransition: { name: "slide-fade", mode: "out-in" },
});

const route = useRoute();

const { data } = await useFetch("/api/video", {
  params: {
    id: route?.params?.id,
  },
  headers: useRequestHeaders(["cookie"]),
});

const onChange = (payload) => {
  console.log('CHANGE', payload);
}
</script>
<template>
  <div>
    <ManageVideoForm :model="data" is-edit @change="onChange" />
  </div>
</template>
