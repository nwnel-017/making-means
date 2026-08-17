UPDATE auth.users
  SET raw_app_meta_data =
    COALESCE(raw_app_meta_data, '{}'::jsonb)
    || '{"role": "admin"}'::jsonb
  WHERE LOWER(email) = LOWER('jamiestambolie@gmail.com');