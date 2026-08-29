<script lang="ts" setup>
definePageMeta({ layout: false });

useHead({
  link: [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Lato:wght@400;900&display=swap",
    },
  ],
});

useSeoMeta({
  title: "Original Artwork Portfolio",
  description:
    "Discover original mixed media artwork by Jamie Nelson, explore featured pieces, and browse a visual-first artist portfolio.",
  ogTitle: "Jamie Nelson Art",
  ogDescription:
    "Discover original mixed media artwork by Jamie Nelson, explore featured pieces, and browse a visual-first artist portfolio.",
});
</script>

<template>
  <div class="entry-page">
    <EntryHero />
    <EntryContactStrip />
  </div>
</template>

<style>
:root {
  --mm-gold: #d8c35a;
  --mm-green: #102117;
  --mm-black: #101a15;
  --mm-white: #fafaf7;
}

.entry-page {
  min-height: calc(100dvh - 5.5rem);
  overflow: hidden;
  background: var(--mm-green);
}

@media (min-width: 1101px) {
  .entry-page {
    min-height: calc(100dvh - 7rem);
  }
}

@media (min-width: 1201px) {
  .entry-page {
    height: calc(100dvh - 7rem);
    display: flex;
    flex-direction: column;
  }

  .entry-page .entry-contact {
    flex: 0 0 auto;
  }

  .entry-page .entry-hero {
    flex: 1 1 auto;
    min-height: 0;
  }

}
</style>
