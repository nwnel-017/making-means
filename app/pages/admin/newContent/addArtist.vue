<script lang="ts" setup>
import { toast } from "vue-sonner";

definePageMeta({ layout: "dashboard", middleware: "admin" });
useSeoMeta({ title: "Add Artist", robots: "noindex, nofollow" });

const { addArtist } = useArtists();
const { startLoading, stopLoading } = useLoading();
const name = ref("");
const bio = ref("");
const portrait = ref<File | null>(null);

function selectPortrait(event: Event) {
  portrait.value = (event.target as HTMLInputElement).files?.[0] || null;
}

async function submit() {
  if (!name.value.trim() || !bio.value.trim() || !portrait.value) {
    toast.error("Name, bio, and portrait are required");
    return;
  }

  const form = new FormData();
  form.append("name", name.value);
  form.append("bio", bio.value);
  form.append("portrait", portrait.value);

  try {
    startLoading();
    await addArtist(form);
    toast.success("Artist created successfully");
    await navigateTo("/admin/artists/artists");
  } catch (error: unknown) {
    toast.error(getApiErrorMessage(error, "Failed to create artist"));
  } finally {
    stopLoading();
  }
}
</script>

<template>
  <div class="verticalContent padded marginTop">
    <h1>Add Artist</h1>
    <form class="submissionForm" @submit.prevent="submit">
      <label for="artist-name">Name</label>
      <input id="artist-name" v-model="name" type="text" />
      <label for="artist-bio">Bio</label>
      <textarea id="artist-bio" v-model="bio"></textarea>
      <label for="artist-portrait">Portrait</label>
      <input
        id="artist-portrait"
        type="file"
        accept="image/jpeg,image/png,image/gif,image/webp"
        @change="selectPortrait"
      />
      <Button variant="primary" type="submit">Submit</Button>
    </form>
  </div>
</template>

<style scoped>
textarea {
  min-height: 10rem;
}
</style>
