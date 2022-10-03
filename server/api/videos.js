import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const { from, to } = useQuery(event);
  console.log(from, to);
  const supabase = serverSupabaseClient(event);

  const { data, count } = await supabase
    .from("videos")
    .select("*", { count: "exact" })
    .range(from, to);
  return { videos: data, total: count };
});
