<script lang="ts" setup>
import { toast } from "vue-sonner";

definePageMeta({ layout: "dashboard", middleware: "admin" });

const route = useRoute();
const artistId = computed(() => route.params.id as string);
const { getArtist, updateArtist } = useArtists();
const { startLoading, stopLoading } = useLoading();
const { data: artist, pending, error } = await getArtist(artistId.value);

useSeoMeta({
  title: () => artist.value?.name || "Edit Artist",
  robots: "noindex, nofollow",
});

const name = ref("");
const bio = ref("");
const portrait = ref<File | null>(null);

watch(
  artist,
  (value) => {
    if (!value) return;
    name.value = value.name;
    bio.value = value.bio;
  },
  { immediate: true },
);

function selectPortrait(event: Event) {
  portrait.value = (event.target as HTMLInputElement).files?.[0] || null;
}

async function save() {
  if (!name.value.trim() || !bio.value.trim()) {
    toast.error("Name and bio are required");
    return;
  }
  if (
    name.value.trim() === artist.value?.name &&
    bio.value.trim() === artist.value?.bio &&
    !portrait.value
  ) {
    toast.error("No changes have been made");
    return;
  }

  const form = new FormData();
  form.append("name", name.value);
  form.append("bio", bio.value);
  if (portrait.value) form.append("portrait", portrait.value);

  try {
    startLoading();
    await updateArtist(artistId.value, form);
    toast.success("Artist updated successfully");
    await navigateTo("/admin/artists/artists");
  } catch (error: unknown) {
    toast.error(getApiErrorMessage(error, "Failed to update artist"));
  } finally {
    stopLoading();
  }
}
</script>

<template>
  <div class="verticalContent padded marginTop">
    <h1>Edit Artist</h1>
    <div v-if="pending">Loading...</div>
    <div v-else-if="error">Artist could not be loaded.</div>
    <form v-else-if="artist" class="submissionForm" @submit.prevent="save">
      <NuxtImg
        :src="artist.image_path"
        :alt="`${artist.name} portrait`"
        class="portrait"
      />
      <label for="artist-name">Name</label>
      <input id="artist-name" v-model="name" type="text" />
      <label for="artist-bio">Bio</label>
      <textarea id="artist-bio" v-model="bio"></textarea>
      <label for="artist-portrait">Replace Portrait (Optional)</label>
      <input
        id="artist-portrait"
        type="file"
        accept="image/jpeg,image/png,image/gif,image/webp"
        @change="selectPortrait"
      />
      <div class="horizontalContent">
        <Button variant="primary" type="submit">Save Changes</Button>
        <Button
          variant="secondary"
          type="button"
          @click="navigateTo('/admin/artists/artists')"
          >Cancel</Button
        >
      </div>
    </form>
  </div>
</template>

<style scoped>
.portrait {
  width: 14rem;
  height: 14rem;
  object-fit: cover;
  border-radius: 8px;
}

textarea {
  min-height: 10rem;
}
</style>
