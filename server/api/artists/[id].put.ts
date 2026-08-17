import { serverSupabaseClient } from "#supabase/server";
import {
  ArtistNotFoundError,
  updateArtist,
} from "@server/services/artists.service";
import { requireAdmin } from "@server/utils/auth/requireAdmin";
import { extractArtistFormData } from "@server/utils/form/artistForm";
import type { UploadInput } from "@server/services/storage.service";
import { artistFormSchema } from "@utils/validation/schemas/artist";
import { uuidSchema } from "@utils/validation/schemas/common";
import { validateImageFile } from "@utils/validation/image";

export default defineEventHandler(async (event) => {
  await requireAdmin(event);
  const id = getRouterParam(event, "id");
  if (!id || !uuidSchema.safeParse(id).success) {
    throw createError({ statusCode: 400, statusMessage: "Invalid artist ID" });
  }

  const form = await readMultipartFormData(event);
  if (!form) {
    throw createError({ statusCode: 400, statusMessage: "No form data received" });
  }

  const validated = artistFormSchema.safeParse(extractArtistFormData(form));
  if (!validated.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid artist form",
      data: { message: validated.error.issues[0]?.message },
    });
  }

  const portraitField = form.find((field) => field.name === "portrait");
  let portrait: UploadInput | undefined;
  if (portraitField) {
    portrait = {
      filename: portraitField.filename || "portrait",
      buffer: portraitField.data,
      size: portraitField.data.length,
      contentType: portraitField.type || "application/octet-stream",
    };
    if (!(await validateImageFile(portrait))) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid portrait",
        data: { message: "Portrait must be a JPEG, PNG, GIF, or WebP under 5MB" },
      });
    }
  }

  try {
    const supabase = await serverSupabaseClient(event);
    await updateArtist(supabase, id, validated.data, portrait);
    return { success: true, message: "Artist updated successfully" };
  } catch (error) {
    if (error instanceof ArtistNotFoundError) {
      throw createError({
        statusCode: 404,
        statusMessage: "Artist not found",
        data: { message: error.message },
      });
    }
    console.error("Failed to update artist:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to update artist",
      data: { message: "Failed to update artist" },
    });
  }
});
