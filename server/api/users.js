import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const { from, to } = useQuery(event);
  const supabase = serverSupabaseClient(event);

  const { data, count } = await supabase
    .from("users")
    .select("*", { count: "exact" })
    .range(from, to);
  return { users: data, total: count };
});
