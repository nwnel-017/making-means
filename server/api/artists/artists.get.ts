import { serverSupabaseClient } from "#supabase/server";
import { getArtists } from "@server/services/artists.service";

export default defineEventHandler(async (event) => {
  try {
    const supabase = await serverSupabaseClient(event);
    return await getArtists(supabase);
  } catch (error) {
    console.error("Failed to fetch artists:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Error",
      data: { message: "Failed to fetch artists" },
    });
  }
});
