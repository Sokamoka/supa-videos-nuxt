<script setup>
const store = useProfileStore();

const onSignOut = () => {
  store.signOut();
};
</script>
<template>
  <div class="p-5 bg-white shadow-md">
    <div class="container mx-auto flex justify-between">
      <div>
        <NuxtLink to="/" class="text-xl font-bold px-2 py-1"> Supa Videos </NuxtLink>
      </div>
      <div class="flex items-center space-x-4">
        <NuxtLink to="/manage-video" class="px-2 py-1"> Manage Videos </NuxtLink>
        <NuxtLink to="/manage-users" class="px-2 py-1"> Manage Users </NuxtLink>
        <NuxtLink v-if="!store.isLoggedIn" to="/sign-in"> Sign In </NuxtLink>
        <NuxtLink v-if="!store.isLoggedIn" to="/sign-up"> Sign Up </NuxtLink>
        <a v-if="store.isLoggedIn" href="#" @click.prevent="onSignOut">Sign Out</a>
        <div>{{ store.userProfile?.first_name }}</div>
      </div>
    </div>
  </div>
</template>
