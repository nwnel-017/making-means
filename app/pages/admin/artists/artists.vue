<script lang="ts" setup>
import { toast } from "vue-sonner";

definePageMeta({ layout: "dashboard", middleware: "admin" });
useSeoMeta({ title: "Admin Artists", robots: "noindex, nofollow" });

const { getArtists, removeArtist } = useArtists();
const { startLoading, stopLoading } = useLoading();
const { data: artists, pending, error } = await getArtists();

async function deleteSelectedArtist(id: string, name: string) {
  if (!window.confirm(`Delete ${name}?`)) return;

  try {
    startLoading();
    await removeArtist(id);
    artists.value = artists.value?.filter((artist) => artist.id !== id) || [];
    toast.success("Artist deleted successfully");
  } catch (error: unknown) {
    toast.error(getApiErrorMessage(error, "Failed to delete artist"));
  } finally {
    stopLoading();
  }
}
</script>

<template>
  <div class="verticalContent padded marginTop">
    <div class="textBlock horizontalContent spaceBetween largeWidth">
      <h1>Artists</h1>
      <Button @click="navigateTo('/admin/newContent/addArtist')">Add</Button>
    </div>
    <div v-if="pending">Loading...</div>
    <div v-else-if="error">Artists could not be loaded.</div>
    <div v-else-if="!artists?.length">No artists have been added.</div>
    <div v-else class="artistsGridInternal">
      <div v-for="artist in artists" :key="artist.id" class="artistContainer">
        <NuxtImg :src="artist.image_path" :alt="`${artist.name} portrait`" />
        <div class="artistDetails">
          <h2>{{ artist.name }}</h2>
          <p>{{ artist.bio }}</p>
          <div class="horizontalContent">
            <Button
              variant="primary"
              @click="navigateTo(`/admin/editContent/artists/${artist.id}`)"
              >Edit</Button
            >
            <Button
              variant="danger"
              @click="deleteSelectedArtist(artist.id, artist.name)"
              >Remove</Button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.artistsGridInternal {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1.5rem;
  width: 100%;
}

.artistContainer {
  display: flex;
  gap: 1rem;
}

.artistContainer img {
  width: 10rem;
  height: 10rem;
  object-fit: cover;
  border-radius: 8px;
}

.artistDetails p {
  white-space: pre-wrap;
}

@media (min-width: 768px) {
  .artistsGridInternal {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
