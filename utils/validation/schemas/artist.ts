import { z } from "zod";

export const artistFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, { message: "Artist name is required" })
      .max(100, { message: "Artist name is too long" }),
    bio: z
      .string()
      .trim()
      .min(1, { message: "Artist bio is required" })
      .max(2000, { message: "Artist bio is too long" }),
  })
  .strict();

export type ArtistForm = z.infer<typeof artistFormSchema>;
