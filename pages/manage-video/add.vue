<script setup>
definePageMeta({
  middleware: ["auth"],
  pageTransition: { name: "slide-fade", mode: "out-in" },
});

const client = useSupabaseClient();

const onCreate = async (payload) => {
  const { error } = await client.from("videos").insert(payload, {
    returning: "minimal",
  });
};
</script>
<template>
  <div>
    <ManageVideoForm @create="onCreate" />
  </div>
</template>
