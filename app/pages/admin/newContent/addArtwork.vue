<script lang="ts" setup>
import type { NewArtworkData } from "#types/artworks/artworks.ts";
import type { DropDown } from "#types/dropdown/dropdown";
import { toast } from "vue-sonner";

definePageMeta({
  layout: "dashboard",
  middleware: "admin",
});

useSeoMeta({
  title: "Add Artwork",
  robots: "noindex, nofollow",
});

const { addArtwork } = useArtworks();
const { getArtists } = useArtists();

const image = ref<File | null>(null);

const artwork = reactive<NewArtworkData>({
  title: "",
  description: "",
  price: "",
  dimensions: "",
  artist: "",
  artwork_note: "",
});

const artistName = ref<string>("");

// To Do: research which is better - this way or using async data in artworks/id.vue
const {
  data: artists,
  pending: loadingArtists,
  error: artistError,
} = await getArtists();

const artistItems = computed<DropDown[]>(
  () =>
    artists.value?.map((artist) => ({
      label: artist.name,
      value: artist.id,
    })) ?? [],
);

function selectArtist(artist: DropDown) {
  if (!artist) return;
  artwork.artist = artist.value;
  artistName.value = artist.label;
}

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const selected = target.files?.[0] || null;
  image.value = selected;
};

const submit = async () => {
  // To Do: send ArtworkData object instead of fields
  const response = await addArtwork(
    artwork.title,
    artwork.description,
    image.value,
    artwork.dimensions,
    artwork.price,
    artwork.artist,
    artwork.artwork_note || "",
  );

  if (!response.success) {
    toast.error(response.message);
    return;
  }

  toast.success(response.message);
  artwork.title = "";
  artwork.description = "";
  image.value = null;
  artwork.price = "";
  artwork.dimensions = "";
  artwork.artist = "";
  artistName.value = "";
  artwork.artwork_note = "";

  await navigateTo("/admin/artworks");
};
</script>

<template>
  <div class="verticalContent">
    <h1>Add Artwork here!</h1>
    <form @submit.prevent="submit" class="submissionForm">
      <label for="title">Title</label>
      <input type="text" v-model="artwork.title" />
      <label for="description">Artwork description</label>
      <input type="text" v-model="artwork.description" />
      <label for="price">Price (USD)</label>
      <input type="text" v-model="artwork.price" inputmode="decimal" />
      <label for="dimensions">Dimensions</label>
      <input type="text" v-model="artwork.dimensions" />
      <label for="artwork_note">Artwork Note (Optional)</label>
      <input type="text" v-model="artwork.artwork_note" />
      <label for="image">Artwork Image</label>
      <input @change="onFileChange" name="image" accept="image" type="file" />
      <div class="">
        <DropDown label="Artist" :items="artistItems" @select="selectArtist" />
        <span>{{ artistName }}</span>
      </div>
      <p v-if="!loadingArtists && !artistError && artists?.length === 0">
        Add an artist before adding artwork.
      </p>
      <p v-if="artistError">Artists could not be loaded.</p>
      <button
        variant="primary"
        type="submit"
        size="sm"
        :disabled="loadingArtists || !!artistError || !artists?.length"
      >
        Submit
      </button>
    </form>
  </div>
</template>

<style scoped>
span {
  margin-left: 0.5rem;
}
</style>
