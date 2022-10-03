export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser();

  if (!user.value) return navigateTo("/sign-in");
  // if (!Object.values(to.meta.role).includes(user.value?.user_metadata.role))
  //   return navigateTo("/sign-in");
});
