import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const query = useQuery(event);
  const supabase = serverSupabaseClient(event);

  let { data } = await supabase
    .from("videos")
    .select()
    .eq("id", query.id)
    .single();
  return data;
});
