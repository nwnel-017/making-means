<script lang="ts" setup>
definePageMeta({ layout: false });

useHead({
  link: [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap",
    },
  ],
});

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
</script>

<template>
  <main class="artists-page">
    <section class="artists-heading">
      <h1>This Year&rsquo;s Artists</h1>
    </section>

    <section class="artists-list" aria-label="This year's artists">
      <p v-if="pending" class="artists-message">Loading artists...</p>
      <p v-else-if="error" class="artists-message">
        Artists could not be loaded.
      </p>
      <p v-else-if="!artists?.length" class="artists-message">
        No artists to show.
      </p>

      <ul v-else>
        <li v-for="artist in artists" :key="artist.id">
          <NuxtLink :to="`/artists/${artist.id}`">
            {{ artist.name }}
          </NuxtLink>
        </li>
      </ul>
    </section>

    <EntryContactStrip />
  </main>
</template>

<style scoped>
.artists-page {
  --artists-gold: var(--mm-gold, #d8c35a);
  --artists-green: var(--mm-green, #102117);
  --artists-ink: var(--mm-black, #101a15);
  --artists-white: var(--mm-white, #fafaf7);
  display: flex;
  flex-direction: column;
  min-height: calc(100dvh - 7rem);
  border-top: clamp(0.65rem, 1vw, 1rem) solid var(--artists-green);
  background: var(--artists-green);
  color: var(--artists-white);
  font-family: Lato, Arial, sans-serif;
}

.artists-heading {
  display: grid;
  min-height: clamp(6.5rem, 10vw, 9rem);
  padding: 1rem 1.25rem;
  place-items: center;
  background: var(--artists-gold);
  color: var(--artists-ink);
  text-align: center;
}

.artists-heading h1 {
  margin: 0;
  font-size: clamp(1.75rem, 3.5vw, 4rem);
  font-weight: 400;
  letter-spacing: 0.2em;
  line-height: 1.05;
  text-transform: uppercase;
}

.artists-list {
  display: grid;
  flex: 1;
  min-height: 0;
  padding: clamp(2.25rem, 5vh, 4rem) 1.5rem;
  place-items: center;
}

.artists-list ul {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(2rem, 4vh, 3.5rem);
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
}

.artists-list li {
  max-width: 100%;
  text-align: center;
}

.artists-list li a {
  color: inherit;
  font-size: clamp(1.6rem, 3vw, 3.3rem);
  font-weight: 400;
  line-height: 1.15;
  text-decoration: underline;
  text-decoration-thickness: 0.06em;
  text-underline-offset: 0.1em;
}

.artists-list li a:hover,
.artists-list li a:focus-visible {
  color: var(--artists-gold);
}

.artists-message {
  margin: 0;
  font-size: clamp(1.5rem, 2.5vw, 2.5rem);
  text-align: center;
}

@media (max-width: 700px) {
  .artists-page {
    min-height: calc(100dvh - 5.5rem);
  }

  .artists-heading h1 {
    letter-spacing: 0.12em;
  }

  .artists-list {
    padding: 2.5rem 1rem;
  }
}
</style>
