<script setup>
const isLoading = ref(false);
const errorMessage = ref("");

const form = reactive({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
});

const store = useProfileStore();

const onSignUp = async () => {
  console.log("form", form);
  try {
    isLoading.value = true;
    await store.signUp(form);
  } catch (error) {
    errorMessage.value = error.message;
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="max-w-md mx-auto mt-10 p-8 bg-white rounded-2xl shadow-lg">
    <h1 class="text-2xl font-bold mb-6">Sign Up</h1>
    <form class="space-y-6" @submit.prevent="onSignUp">
      <div class="field">
        <label for="firstname">First Name:</label>
        <input
          id="firstname"
          class="input"
          type="text"
          v-model="form.firstName"
        />
      </div>
      <div class="field">
        <label for="lastname">Last Name:</label>
        <input
          id="lastname"
          class="input"
          type="text"
          v-model="form.lastName"
        />
      </div>
      <div class="field">
        <label for="email">E-mail:</label>
        <input id="email" class="input" type="email" v-model="form.email" />
      </div>
      <div class="field">
        <label for="password">Password:</label>
        <input
          id="password"
          class="input"
          type="password"
          v-model="form.password"
        />
      </div>
      <div
        v-if="errorMessage"
        class="bg-rose-400 text-white py-3 px-5 rounded-lg"
      >
        {{ errorMessage }}
      </div>
      <div>
        <button type="submit" class="button is-primary">Sign Up</button>
        {{ isLoading }}
      </div>
    </form>
  </div>
</template>
