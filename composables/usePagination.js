export const usePagination = (page, limit) => {
  const from = ref(0);
  const to = ref(0);

  watch(
    page,
    (page) => {
      from.value = ((page || 1) - 1) * limit;
      to.value = from.value + limit - 1;
    },
    {
      immediate: true,
    }
  );

  return { from, to };
};
