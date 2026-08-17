<script lang="ts" setup>
definePageMeta({ layout: "default" });

useSeoMeta({
  title: "Artists",
  description:
    "Meet the artists represented by Making Means and learn about their work.",
  ogTitle: "Artists | Making Means",
  ogDescription:
    "Meet the artists represented by Making Means and learn about their work.",
});

const { getArtists } = useArtists();
const { data: artists, pending, error } = await getArtists();
const failedPortraits = ref(new Set<string>());

function portraitFailed(id: string) {
  failedPortraits.value = new Set(failedPortraits.value).add(id);
}
</script>

<template>
  <main class="verticalContent fullWidth artistsPage">
    <div class="textBlock"><h1>Artists</h1></div>
    <div v-if="pending"><h2>Loading artists...</h2></div>
    <div v-else-if="error"><h2>Artists could not be loaded.</h2></div>
    <div v-else-if="!artists?.length"><h2>No artists to show.</h2></div>
    <div v-else class="artistProfiles">
      <article v-for="artist in artists" :key="artist.id" class="artistProfile">
        <div class="portraitWrapper">
          <NuxtImg
            v-if="artist.image_path && !failedPortraits.has(artist.id)"
            :src="artist.image_path"
            :alt="`${artist.name} portrait`"
            class="portrait"
            format="webp"
            quality="75"
            sizes="(max-width: 768px) 90vw, 35vw"
            @error="portraitFailed(artist.id)"
          />
          <div v-else class="portraitFallback">Portrait unavailable</div>
        </div>
        <div class="artistCopy">
          <h2>{{ artist.name }}</h2>
          <p>{{ artist.bio }}</p>
        </div>
      </article>
    </div>
  </main>
</template>

<style scoped>
.artistsPage {
  padding: 0 1rem 3rem;
}

.artistProfiles {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: min(70rem, 100%);
}

.artistProfile {
  display: grid;
  gap: 1.5rem;
}

.portraitWrapper {
  aspect-ratio: 4 / 5;
  background: var(--theme-white);
  border-radius: 8px;
  overflow: hidden;
}

.portrait,
.portraitFallback {
  width: 100%;
  height: 100%;
}

.portrait {
  object-fit: cover;
}

.portraitFallback {
  display: grid;
  place-items: center;
  color: var(--theme-grey);
}

.artistCopy p {
  line-height: 1.6;
  white-space: pre-wrap;
}

@media (min-width: 768px) {
  .artistProfile {
    grid-template-columns: minmax(15rem, 2fr) minmax(20rem, 3fr);
    align-items: center;
  }
}
</style>
