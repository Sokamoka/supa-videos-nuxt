<script setup>
const email = ref("");
const password = ref("");
const isLoading = ref(false);
const errorMessage = ref("");

const store = useProfileStore();

const onSignIn = async () => {
  isLoading.value = true;
  try {
    await store.signIn({
      email,
      password,
    });
    navigateTo("/");
  } catch (error) {
    errorMessage.value = error.message;
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="max-w-sm mx-auto mt-10 p-8 bg-white rounded-2xl shadow-lg">
    <h1 class="text-2xl font-bold mb-6">Sign In</h1>
    <form class="space-y-6" @submit.prevent="onSignIn">
      <div class="field">
        <label for="email">E-mail:</label>
        <input id="email" class="input" type="email" v-model="email" />
      </div>
      <div class="field">
        <label for="password">Password:</label>
        <input id="password" class="input" type="password" v-model="password" />
      </div>
      <div v-if="errorMessage" class="bg-rose-400 text-white py-3 px-5 rounded-lg">
        {{ errorMessage }}
      </div>
      <div>
        <button type="submit" class="button is-primary">Sign In</button>
        {{ isLoading }}
      </div>
    </form>
  </div>
</template>
