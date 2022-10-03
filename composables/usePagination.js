export const usePagination = (page, limit, key) => {
  const from = ref(0);
  const to = ref(0);

  const update = () => refreshNuxtData(key);

  watch(
    page,
    (page) => {
      from.value = ((page || 1) - 1) * limit;
      to.value = from.value + limit - 1;
      update();
    },
    {
      immediate: true,
    }
  );

  onMounted(update);

  return { from, to };
};
