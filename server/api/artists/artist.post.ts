import { serverSupabaseClient } from "#supabase/server";
import { createArtist } from "@server/services/artists.service";
import { requireAdmin } from "@server/utils/auth/requireAdmin";
import { extractArtistFormData } from "@server/utils/form/artistForm";
import type { UploadInput } from "@server/services/storage.service";
import { artistFormSchema } from "@utils/validation/schemas/artist";
import { validateImageFile } from "@utils/validation/image";

export default defineEventHandler(async (event) => {
  await requireAdmin(event);
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
  if (!portraitField) {
    throw createError({
      statusCode: 400,
      statusMessage: "Portrait is required",
      data: { message: "Portrait is required" },
    });
  }

  const portrait: UploadInput = {
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

  try {
    const supabase = await serverSupabaseClient(event);
    const artist = await createArtist(supabase, validated.data, portrait);
    return { success: true, message: "Artist created successfully", artist };
  } catch (error) {
    console.error("Failed to create artist:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to create artist",
      data: { message: "Failed to create artist" },
    });
  }
});
