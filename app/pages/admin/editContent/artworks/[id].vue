<script lang="ts" setup>
import type { ArtworkData } from "#types/artworks/artworks";
import type { DropDown } from "#types/dropdown/dropdown";
import { toast } from "vue-sonner";

definePageMeta({
  layout: "dashboard",
  middleware: "admin",
});

const { startLoading, stopLoading } = useLoading();
const { getArtwork, updateArtwork, removeArtwork } = useArtworks();
const { getArtists } = useArtists();

const route = useRoute();

const artworkId = computed(() => route.params.id as string);

const { data: artwork, pending, error } = await getArtwork(artworkId.value);
const {
  data: artists,
  pending: artistsPending,
  error: artistsError,
} = await getArtists();

const artistItems = computed<DropDown[]>(
  () =>
    artists.value?.map((artist) => ({
      label: artist.name,
      value: artist.id,
    })) ?? [],
);

const artistName = ref("");

function selectArtist(artist: DropDown) {
  editedArtwork.value.artist = artist.value;
  artistName.value = artist.label;
}

useSeoMeta({
  title: () => artwork.value?.title || "Edit Artwork",
  robots: "noindex, nofollow",
});

const editedArtwork = ref<ArtworkData>({
  title: "",
  description: "",
  dimensions: "",
  price: "",
  artist: artwork.value?.artist_id || "",
  artwork_note: "",
});

const image = ref<File | null>(null);

const isEditing = ref(false);

function startEdit() {
  isEditing.value = true;
  editedArtwork.value = {
    title: artwork.value?.title || "",
    description: artwork.value?.description || "",
    dimensions: artwork.value?.dimensions || "",
    price: artwork.value?.price?.toString() || "",
    artist: artwork.value?.artist_id || "",
    artwork_note: artwork.value?.artwork_note || "",
  };
  artistName.value =
    artists.value?.find((artist) => artist.id === artwork.value?.artist_id)
      ?.name || "";
  image.value = null;
}

function stopEdit() {
  isEditing.value = false;
  editedArtwork.value = {
    title: "",
    description: "",
    dimensions: "",
    price: "",
    artist: artwork.value?.artist_id || "",
    artwork_note: "",
  };
  artistName.value = "";
  image.value = null;
}

// To Do: move to useArtworks composable
async function save() {
  console.log("saving!");
  isEditing.value = false;
  const newTitle = editedArtwork.value.title;
  const newDesc = editedArtwork.value.description;
  const newPrice = editedArtwork.value.price;
  const newDimensions = editedArtwork.value.dimensions;
  const newArtist = editedArtwork.value.artist;
  const newNote = editedArtwork.value.artwork_note || "";
  if (!newTitle || !newDesc || !newPrice || !newDimensions || !newArtist) {
    toast.error("Please change at least one field to update the artwork");
    return;
  }

  if (
    newTitle === artwork.value?.title &&
    newDesc === artwork.value?.description &&
    newPrice === artwork.value?.price?.toString() &&
    newDimensions === artwork.value?.dimensions &&
    newArtist === artwork.value?.artist_id &&
    newNote === artwork.value?.artwork_note
  ) {
    toast.error("No changes have been made!");
    return;
  }

  const form = new FormData();
  form.append("id", artworkId.value);
  form.append("title", newTitle);
  form.append("description", newDesc);
  form.append("dimensions", newDimensions);
  form.append("artist", newArtist);
  form.append("artwork_note", newNote);
  form.append("price", newPrice);

  try {
    startLoading();
    await updateArtwork(artworkId.value, form);
    toast.success("Artwork successfully updated!");
    await navigateTo("/admin/artworks");
  } catch (err) {
    console.log("Error updating artwork: " + err);
    toast.error("Something went wrong! Please try again");
  } finally {
    stopLoading();
  }
}

async function deleteArtwork() {
  console.log("deleting artwork!");
  isEditing.value = false;

  try {
    startLoading();
    await removeArtwork(artworkId.value);
    toast.success("Artwork deleted successfully!");
    navigateTo("/admin/artworks");
  } catch (error) {
    console.log("error deleting artwork: " + error);
    toast.error("Something went wrong. Please try again later!");
  } finally {
    stopLoading();
  }
}
</script>

<template>
  <div class="fullWidth">
    <div class="verticalContent verticalMargin paddedSides">
      <div class="horizontalContent">
        <div v-if="!isEditing">
          <div v-if="pending">Loading details...</div>
          <div v-if="error">There was an error getting artwork details</div>
          <div v-else-if="artwork">
            <div class="imgContainer">
              <NuxtImg
                :src="artwork?.image_path ?? undefined"
                alt=""
                class="artworkFull"
              />
            </div>
            <div class="artworkDetails">
              <div>
                <div><span>Title:</span> {{ artwork?.title }}</div>
                <div><span>Description:</span> {{ artwork?.description }}</div>
                <div><span>Dimensions:</span> {{ artwork?.dimensions }}</div>
                <div><span>Price:</span> ${{ artwork?.price || `$${0}` }}</div>
              </div>
            </div>
          </div>
          <div class="btnContainer">
            <Button variant="primary" size="lg" class="btn" @click="startEdit"
              >Click to Edit Artwork</Button
            >
            <Button
              variant="primary"
              size="lg"
              class="btn"
              @click="navigateTo('/admin/editContent/gallery/' + artwork?.id)"
              >Click to Edit Gallery</Button
            >
            <Button
              variant="danger"
              size="lg"
              @click="deleteArtwork"
              class="btn"
              >Click to Delete Artwork</Button
            >
          </div>
        </div>
        <div v-if="isEditing" class="verticalContent spaced">
          <label for="title">Title</label>
          <textarea v-model="editedArtwork.title" type="text"></textarea>
          <label for="description">Description</label>
          <textarea v-model="editedArtwork.description" type="text"></textarea>
          <label for="price">Price</label>
          <textarea v-model="editedArtwork.price" type="text"></textarea>
          <label for="dimensions">Size:</label>
          <textarea v-model="editedArtwork.dimensions" type="text"></textarea>
          <label for="artwork_note">Artwork Note (Optional):</label>
          <textarea v-model="editedArtwork.artwork_note" type="text"></textarea>
          <DropDown
            label="Artist"
            :items="artistItems"
            @select="selectArtist"
          />
          <span>{{ artistName }}</span>
          <p v-if="artistsError">Artists could not be loaded.</p>
          <Button
            variant="primary"
            size="lg"
            :disabled="artistsPending || !!artistsError || !artists?.length"
            @click="save"
            >Save Changes</Button
          >
          <Button variant="secondary" size="lg" @click="stopEdit"
            >Cancel</Button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.btn {
  min-width: 170px;
}

.btnContainer {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.hiddenInput {
  display: none;
}

.fileInput {
  cursor: pointer;
  border: none;
  font-size: 0.8rem;
  font-weight: 500;
  font-family: inherit;
  background-color: var(--theme-blue);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.35rem 0.75rem;
  max-height: 2rem;
  border-radius: 6px;
  width: 170px;
  color: white;
}

.fileInput:hover {
  background: #2563eb;
  opacity: 0.9;
}

.artworkFull {
  max-width: 100%;
  max-height: 50vh;
  height: auto;
  object-fit: contain;
  border-radius: 8px;
}
.artworkDetails {
  padding: 0.5rem 0;
  height: auto;
  margin: 0.5rem 0;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
}

.artworkDetails span {
  font-weight: bold;
}

textarea {
  border-radius: 8px;
  border-color: var(--text-color);
  width: 90%;
  font-family: inherit;
}

@media (min-width: 768px) {
  .btnContainer {
    flex-direction: row;
    justify-content: space-around;
    gap: 1rem;
  }
}

@media (min-width: 1024px) {
  textarea {
    width: 25vw;
    height: 5rem;
  }

  .btn {
    width: 200px;
  }

  .fileInput {
    width: 200px;
  }
}
</style>
