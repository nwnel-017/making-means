ALTER TABLE public.artworks
  ALTER COLUMN collection_id DROP DEFAULT,
  ALTER COLUMN collection_id DROP NOT NULL,
  ALTER COLUMN artist_id SET NOT NULL;
