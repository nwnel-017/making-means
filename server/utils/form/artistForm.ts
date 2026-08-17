import type { MultiPartData } from "h3";
import type { ArtistData } from "~~/types/artists/artist";

export const extractArtistFormData = (form: MultiPartData[]): ArtistData => ({
  name: form.find((field) => field.name === "name")?.data?.toString() || "",
  bio: form.find((field) => field.name === "bio")?.data?.toString() || "",
});
