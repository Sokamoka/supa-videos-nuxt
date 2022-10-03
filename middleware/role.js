export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser();

  if (!Object.values(to.meta.role).includes(user.value?.user_metadata.role))
    return navigateTo("/");
});
