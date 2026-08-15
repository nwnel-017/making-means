The app can be wired to artists without changing orders or authentication. The main work is replacing the collection data flow and separating artist portraits from artwork images.

## What will break or remain incorrect

<!-- ### 1. Generated database types do not include artists

[database.ts](/Users/natenelson/Projects/making-means/types/supabase/database.ts) still contains:

- `collections`
- `artworks.collection_id`
- `artworks.cover_image`

It does not contain `artists` or `artworks.artist_id`.

These types must be regenerated after applying the new migration. -->

### 2. Artwork creation still requires a collection

The artwork creation flow currently:

- Fetches collections.
- Shows a Collection dropdown.
- Sends a field named `collection`.
- Validates that a collection was provided.
- Inserts it as `collection_id`.
- Sends the collection-cover checkbox.

This affects:

- [addArtwork.vue](/Users/natenelson/Projects/making-means/app/pages/admin/newContent/addArtwork.vue)
- [useArtworks.ts](/Users/natenelson/Projects/making-means/app/composables/useArtworks.ts)
- [artworkForm.ts](/Users/natenelson/Projects/making-means/server/utils/form/artworkForm.ts)
- [artwork.ts](/Users/natenelson/Projects/making-means/utils/validation/schemas/artwork.ts)
- [artwork.post.ts](/Users/natenelson/Projects/making-means/server/api/artworks/artwork.post.ts)
- [artworks.service.ts](/Users/natenelson/Projects/making-means/server/services/artworks.service.ts)
- [artworks.ts](/Users/natenelson/Projects/making-means/types/artworks/artworks.ts)

They must use `artist`/`artist_id` instead.

### 3. Artwork editing still depends on collections

The edit form reads `collection_id`, requires it during validation, and sends `collection`. It also still displays the collection-cover checkbox.

It currently does not provide a dropdown for changing the relationship. When converted, the edit form should fetch artists and allow the admin to select or change the artwork’s artist.

### 4. There is no artist management workflow

The existing collection management needs artist equivalents:

- Artist service
- Artist API endpoints
- Artist composable
- Artist types and validation
- Add Artist page
- Admin Artists page
- Edit Artist page
- Portrait upload, replacement, and deletion

The collection form only accepts a name. An artist form must handle a name, bio, and portrait.

### 5. Public collection pages no longer represent the site

These routes are collection-specific:

```text
/collections/collections
/collections/:id
```

They currently show collection cards and artworks belonging to one collection.

The new public structure needs:

- An Artists page showing portraits and bios.
- An Exhibition & Sales page showing purchasable artworks.

The old collection detail page should not automatically become an artist detail page unless you want individual artist pages.

### 6. Collection APIs and services must be replaced

Everything under:

```text
server/api/collections/
server/services/collections.service.ts
app/composables/useCollections.ts
```

must become artist-oriented.

The artist list service should use `artists.image_path`. It should not continue deriving the image from the newest artwork, as the collection service currently does.

Artwork queries using:

```ts
.eq("collection_id", collectionId)
```

must either use `artist_id` or be removed if there will be no individual artist pages.

### 7. Navigation still links to collections

The public navigation links “Original Artworks” to the collection pages. The admin navigation also links to “Collections.”

These need to become:

- Public: “Exhibition & Sales” and “Artists”
- Admin: “Artists”

The remaining Jamie Nelson–specific navigation and SEO text also needs replacement, but that can be handled as a separate content pass.

### 8. `cover_image` has lost its meaning

The artwork form currently says “Set as collection cover image,” although the collection listing actually selects the latest artwork rather than consistently using this flag.

With artists:

- Artist portraits should come from `artists.image_path`.
- `artworks.cover_image` should stop being used.
- The separate `cover_images` table and Home carousel are a different feature and do not have to be removed.

### 9. The migration is transitional

The migration intentionally leaves `artist_id` nullable and preserves all collection fields. That keeps the current application working, but it is not the final schema.

Once the application creates artist-linked artworks, a later migration should:

- Make `artist_id` required.
- Remove `collection_id`.
- Remove the artwork `cover_image` flag.
- Eventually remove `collections`.

That later migration requires separate authorization because it removes schema elements.

### 10. Admin role setup is required

The new artist RLS policies require:

```json
{
  "app_metadata": {
    "role": "admin"
  }
}
```

The admin Supabase user must receive that role. Matching `NUXT_PUBLIC_ADMIN_EMAIL` alone will not satisfy the database policies.

## Recommended implementation order

1. Apply the additive artist migration.
2. Assign the Supabase admin user the `admin` role.
3. Regenerate database types.
4. Build artist service and API endpoints.
5. Build artist types, validation, and composable.
6. Build Add, Edit, List, and Delete Artist admin screens.
7. Replace the artwork collection selector with an artist selector.
8. Update artwork create and edit processing to save `artist_id`.
9. Build the public Artists page.
10. Convert the public artwork area into Exhibition & Sales.
11. Update navigation and collection-specific wording.
12. Verify artist, artwork, storage, and purchase flows.
13. Only afterward create the cleanup migration.

## Simple decisions needed

### Decision 1: Artist pages

Do you want:

- One Artists page containing every portrait and bio, or
- An Artists list where each artist opens a separate detail page?

**Recommendation:** one page. It matches your original description and is simpler.

### Decision 2: Exhibition layout

Should Exhibition & Sales:

- Show all artworks in one gallery, or
- Group artworks under each artist?

**Recommendation:** one gallery, with the artist’s name displayed on each artwork. This keeps the art central while preserving attribution.

### Decision 3: Required artist fields

Should name, bio, and portrait all be required?

**Recommendation:** yes. The public design requires all three, and requiring them avoids incomplete artist profiles.

### Decision 4: Deleting artists

If an artist has artworks, should deletion:

- Be blocked, or
- Also delete their artworks?

**Recommendation:** block deletion. This is already supported by `ON DELETE RESTRICT` and protects artwork and order history.

### Decision 5: Portrait replacement

When an admin uploads a replacement portrait, should the old file be deleted?

**Recommendation:** yes, but only after the new image uploads successfully.

### Decision 6: Artist ordering

Should artists appear alphabetically or in the order they were added?

**Recommendation:** alphabetically for now. It avoids adding another database field.

No files were changed during this audit.
