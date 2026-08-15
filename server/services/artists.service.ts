import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "#types/supabase/database";

async function getArtists(supabase: SupabaseClient<Database>) {
  const { data, error } = await supabase
    .from("artists")
    .select("id, name")
    .order("name", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch artists: ${error.message}`);
  }

  return data;
}

export { getArtists };
