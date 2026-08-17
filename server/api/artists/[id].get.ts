import { serverSupabaseClient } from "#supabase/server";
import {
  ArtistNotFoundError,
  getArtistDetails,
} from "@server/services/artists.service";
import { uuidSchema } from "@utils/validation/schemas/common";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  if (!id || !uuidSchema.safeParse(id).success) {
    throw createError({ statusCode: 400, statusMessage: "Invalid artist ID" });
  }

  try {
    const supabase = await serverSupabaseClient(event);
    return await getArtistDetails(supabase, id);
  } catch (error) {
    if (error instanceof ArtistNotFoundError) {
      throw createError({
        statusCode: 404,
        statusMessage: "Artist not found",
        data: { message: error.message },
      });
    }
    console.error("Failed to fetch artist:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch artist",
      data: { message: "Failed to fetch artist" },
    });
  }
});
