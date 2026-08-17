<script lang="ts" setup>
definePageMeta({ layout: "default" });

useSeoMeta({
  title: "Exhibition & Sales",
  description:
    "Explore original artworks currently available through Making Means.",
  ogTitle: "Exhibition & Sales | Making Means",
  ogDescription:
    "Explore original artworks currently available through Making Means.",
});

const { getExhibitionArtworks } = useArtworks();
const { data: artworks, pending, error } = await getExhibitionArtworks();
</script>

<template>
  <main class="verticalContent fullWidth">
    <div v-if="pending" class="textBlock"><h2>Loading artworks...</h2></div>
    <div v-else-if="error" class="textBlock">
      <h2>Artworks could not be loaded.</h2>
    </div>
    <div v-else-if="!artworks?.length" class="textBlock">
      <h1>Exhibition &amp; Sales</h1>
      <p>No artworks are currently available.</p>
    </div>
    <ArtworkGallery
      v-else
      :artworks="artworks"
      title="Exhibition & Sales"
      description="Original artworks currently available for purchase."
      show-artist
      show-price
    />
  </main>
</template>
