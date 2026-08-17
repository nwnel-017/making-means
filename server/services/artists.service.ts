import type { SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import type { Database } from "#types/supabase/database";
import type { ArtistData } from "#types/artists/artist";
import type { UploadInput } from "./storage.service";
import { deleteFile, uploadFile } from "./storage.service";

const ARTIST_IMAGE_BUCKET = "artist_images";

export class ArtistHasArtworksError extends Error {}
export class ArtistNotFoundError extends Error {}

function publicImageUrl(
  supabase: SupabaseClient<Database>,
  imagePath: string | null,
) {
  if (!imagePath) return "";
  return supabase.storage.from(ARTIST_IMAGE_BUCKET).getPublicUrl(imagePath).data
    .publicUrl;
}

function uniquePortrait(image: UploadInput): UploadInput {
  const extensionByType: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/gif": "gif",
    "image/webp": "webp",
  };
  const extension = extensionByType[image.contentType || ""] || "img";
  return { ...image, filename: `${randomUUID()}.${extension}` };
}

async function getArtists(supabase: SupabaseClient<Database>) {
  const { data, error } = await supabase
    .from("artists")
    .select("id, name, bio, image_path")
    .order("name", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch artists: ${error.message}`);
  }

  return data.map((artist) => ({
    ...artist,
    bio: artist.bio || "",
    image_path: publicImageUrl(supabase, artist.image_path),
  }));
}

async function getArtistDetails(
  supabase: SupabaseClient<Database>,
  id: string,
) {
  const { data, error } = await supabase
    .from("artists")
    .select("id, name, bio, image_path")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(`Failed to fetch artist: ${error.message}`);
  if (!data) throw new ArtistNotFoundError("Artist not found");

  return {
    ...data,
    bio: data.bio || "",
    image_path: publicImageUrl(supabase, data.image_path),
  };
}

async function createArtist(
  supabase: SupabaseClient<Database>,
  artist: ArtistData,
  portrait: UploadInput,
) {
  const uploaded = await uploadFile(
    supabase,
    uniquePortrait(portrait),
    ARTIST_IMAGE_BUCKET,
  );
  const imagePath = uploaded.path;

  const { data, error } = await supabase
    .from("artists")
    .insert({ name: artist.name, bio: artist.bio, image_path: imagePath })
    .select("id")
    .single();

  if (error || !data) {
    await deleteFile(supabase, imagePath, ARTIST_IMAGE_BUCKET).catch(() => {});
    throw new Error(`Failed to create artist: ${error?.message || "Unknown error"}`);
  }

  return data;
}

async function updateArtist(
  supabase: SupabaseClient<Database>,
  id: string,
  artist: ArtistData,
  portrait?: UploadInput,
) {
  const { data: existing, error: existingError } = await supabase
    .from("artists")
    .select("image_path")
    .eq("id", id)
    .maybeSingle();

  if (existingError) {
    throw new Error(`Failed to fetch artist: ${existingError.message}`);
  }
  if (!existing) throw new ArtistNotFoundError("Artist not found");

  let newImagePath: string | undefined;
  if (portrait) {
    const uploaded = await uploadFile(
      supabase,
      uniquePortrait(portrait),
      ARTIST_IMAGE_BUCKET,
    );
    newImagePath = uploaded.path;
  }

  const { error } = await supabase
    .from("artists")
    .update({
      name: artist.name,
      bio: artist.bio,
      ...(newImagePath ? { image_path: newImagePath } : {}),
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    if (newImagePath) {
      await deleteFile(supabase, newImagePath, ARTIST_IMAGE_BUCKET).catch(
        () => {},
      );
    }
    throw new Error(`Failed to update artist: ${error.message}`);
  }

  if (newImagePath && existing.image_path) {
    await deleteFile(
      supabase,
      existing.image_path,
      ARTIST_IMAGE_BUCKET,
    ).catch((error) => console.error("Failed to remove old portrait:", error));
  }
}

async function deleteArtist(
  supabase: SupabaseClient<Database>,
  id: string,
) {
  const { count, error: artworkError } = await supabase
    .from("artworks")
    .select("id", { count: "exact", head: true })
    .eq("artist_id", id);

  if (artworkError) throw new Error("Failed to check artist artworks");
  if (count) {
    throw new ArtistHasArtworksError(
      "Artist cannot be deleted while artworks are assigned",
    );
  }

  const { data: existing, error: existingError } = await supabase
    .from("artists")
    .select("image_path")
    .eq("id", id)
    .maybeSingle();

  if (existingError) {
    throw new Error(`Failed to fetch artist: ${existingError.message}`);
  }
  if (!existing) throw new ArtistNotFoundError("Artist not found");

  const { error } = await supabase.from("artists").delete().eq("id", id);
  if (error) {
    if (error.code === "23503") {
      throw new ArtistHasArtworksError(
        "Artist cannot be deleted while artworks are assigned",
      );
    }
    throw new Error(`Failed to delete artist: ${error.message}`);
  }

  if (existing.image_path) {
    await deleteFile(
      supabase,
      existing.image_path,
      ARTIST_IMAGE_BUCKET,
    ).catch((error) => console.error("Failed to remove artist portrait:", error));
  }
}

export {
  createArtist,
  deleteArtist,
  getArtistDetails,
  getArtists,
  updateArtist,
};
