CREATE TABLE public.artists (
  id         uuid                     DEFAULT gen_random_uuid() NOT NULL,
  name       text                     NOT NULL,
  bio        text,
  image_path text,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL,
  CONSTRAINT artists_pkey PRIMARY KEY (id)
);

ALTER TABLE public.artists
  ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON public.artists TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.artists TO authenticated;
GRANT ALL ON public.artists TO service_role;

CREATE POLICY "Public can view artists" ON public.artists
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert artists" ON public.artists
  FOR INSERT
  WITH CHECK (
    (SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );

CREATE POLICY "Authenticated users can update artists" ON public.artists
  FOR UPDATE
  USING (
    (SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  )
  WITH CHECK (
    (SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );

CREATE POLICY "Authenticated users can delete artists" ON public.artists
  FOR DELETE
  USING (
    (SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );

ALTER TABLE public.artworks
  ADD COLUMN artist_id uuid;

ALTER TABLE public.artworks
  ADD CONSTRAINT artworks_artist_id_fkey
  FOREIGN KEY (artist_id)
  REFERENCES public.artists(id)
  ON DELETE RESTRICT;

CREATE INDEX artworks_artist_id_idx
  ON public.artworks(artist_id);

INSERT INTO storage.buckets (id, name, public)
VALUES ('artist_images', 'artist_images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public can view artist images" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'artist_images');

CREATE POLICY "Authenticated users can insert artist images" ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'artist_images'
    AND (SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );

CREATE POLICY "Authenticated users can update artist images" ON storage.objects
  FOR UPDATE
  USING (
    bucket_id = 'artist_images'
    AND (SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  )
  WITH CHECK (
    bucket_id = 'artist_images'
    AND (SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );

CREATE POLICY "Authenticated users can delete artist images" ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'artist_images'
    AND (SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );
