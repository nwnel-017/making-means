-- Public content remains readable, but only a user with an admin app_metadata
-- claim may modify content or access private order data directly through Supabase.

DROP POLICY "Only admin can insert artworks" ON public.artworks;
DROP POLICY "Only logged in user can delete artworks" ON public.artworks;
DROP POLICY "Only logged in user can update artworks" ON public.artworks;

CREATE POLICY "Admins can insert artworks" ON public.artworks
  FOR INSERT
  WITH CHECK (
    (SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );

CREATE POLICY "Admins can delete artworks" ON public.artworks
  FOR DELETE
  USING (
    (SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );

CREATE POLICY "Admins can update artworks" ON public.artworks
  FOR UPDATE
  USING (
    (SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  )
  WITH CHECK (
    (SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );

DROP POLICY "Only authenticated users can delete" ON public.collections;
DROP POLICY "Only authenticated users can insert" ON public.collections;
DROP POLICY "Only authenticated users can update" ON public.collections;

CREATE POLICY "Admins can delete collections" ON public.collections
  FOR DELETE
  USING (
    (SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );

CREATE POLICY "Admins can insert collections" ON public.collections
  FOR INSERT
  WITH CHECK (
    (SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );

CREATE POLICY "Admins can update collections" ON public.collections
  FOR UPDATE
  USING (
    (SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  )
  WITH CHECK (
    (SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );

DROP POLICY "Only auth users can delete" ON public.cover_images;
DROP POLICY "Only auth users can insert" ON public.cover_images;
DROP POLICY "Only auth users can update" ON public.cover_images;

CREATE POLICY "Admins can delete cover images" ON public.cover_images
  FOR DELETE
  USING (
    (SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );

CREATE POLICY "Admins can insert cover images" ON public.cover_images
  FOR INSERT
  WITH CHECK (
    (SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );

CREATE POLICY "Admins can update cover images" ON public.cover_images
  FOR UPDATE
  USING (
    (SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  )
  WITH CHECK (
    (SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );

DROP POLICY "Only authenticated users can delete gallery images" ON public.gallery_images;
DROP POLICY "Only authenticated users can insert gallery images" ON public.gallery_images;
DROP POLICY "Only authenticated users can update gallery images" ON public.gallery_images;

CREATE POLICY "Admins can delete gallery images" ON public.gallery_images
  FOR DELETE
  USING (
    (SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );

CREATE POLICY "Admins can insert gallery images" ON public.gallery_images
  FOR INSERT
  WITH CHECK (
    (SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );

CREATE POLICY "Admins can update gallery images" ON public.gallery_images
  FOR UPDATE
  USING (
    (SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  )
  WITH CHECK (
    (SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );

DROP POLICY "Only auth users can  access orders" ON public.orders;
DROP POLICY "Only auth users can delete orders" ON public.orders;
DROP POLICY "Only auth users can update orders" ON public.orders;

CREATE POLICY "Admins can view orders" ON public.orders
  FOR SELECT
  USING (
    (SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );

CREATE POLICY "Admins can delete orders" ON public.orders
  FOR DELETE
  USING (
    (SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );

CREATE POLICY "Admins can update orders" ON public.orders
  FOR UPDATE
  USING (
    (SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  )
  WITH CHECK (
    (SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );

-- Existing Storage policies were not included in the remote schema dump.
-- Restrictive policies add an admin-only guard for writes to the app's known
-- buckets while leaving any unrelated buckets and public reads unchanged.

CREATE POLICY "Require admin for app image uploads" ON storage.objects
  AS RESTRICTIVE
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id NOT IN (
      'artwork_images',
      'gallery_images',
      'cover_images',
      'artist_images'
    )
    OR (SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );

CREATE POLICY "Require admin for app image updates" ON storage.objects
  AS RESTRICTIVE
  FOR UPDATE
  TO authenticated
  USING (
    bucket_id NOT IN (
      'artwork_images',
      'gallery_images',
      'cover_images',
      'artist_images'
    )
    OR (SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  )
  WITH CHECK (
    bucket_id NOT IN (
      'artwork_images',
      'gallery_images',
      'cover_images',
      'artist_images'
    )
    OR (SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );

CREATE POLICY "Require admin for app image deletes" ON storage.objects
  AS RESTRICTIVE
  FOR DELETE
  TO authenticated
  USING (
    bucket_id NOT IN (
      'artwork_images',
      'gallery_images',
      'cover_images',
      'artist_images'
    )
    OR (SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );
