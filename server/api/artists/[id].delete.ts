import { serverSupabaseClient } from "#supabase/server";
import {
  ArtistHasArtworksError,
  ArtistNotFoundError,
  deleteArtist,
} from "@server/services/artists.service";
import { requireAdmin } from "@server/utils/auth/requireAdmin";
import { uuidSchema } from "@utils/validation/schemas/common";

export default defineEventHandler(async (event) => {
  await requireAdmin(event);
  const id = getRouterParam(event, "id");
  if (!id || !uuidSchema.safeParse(id).success) {
    throw createError({ statusCode: 400, statusMessage: "Invalid artist ID" });
  }

  try {
    const supabase = await serverSupabaseClient(event);
    await deleteArtist(supabase, id);
    return { success: true, message: "Artist deleted successfully" };
  } catch (error) {
    if (error instanceof ArtistNotFoundError) {
      throw createError({
        statusCode: 404,
        statusMessage: "Artist not found",
        data: { message: error.message },
      });
    }
    if (error instanceof ArtistHasArtworksError) {
      throw createError({
        statusCode: 409,
        statusMessage: "Artist has assigned artworks",
        data: { message: error.message },
      });
    }
    console.error("Failed to delete artist:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to delete artist",
      data: { message: "Failed to delete artist" },
    });
  }
});
