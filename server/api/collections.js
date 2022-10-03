import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseClient(event);

  const { data } = await supabase.from("videos").select();
  return data;
});
