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
  title: "About Making Means",
  description:
    "Learn how Making Means connects Zimbabwean artists living abroad with creative communities and organizations at home.",
  ogTitle: "About Making Means",
  ogDescription:
    "Learn how Making Means connects Zimbabwean artists living abroad with creative communities and organizations at home.",
});
</script>

<template>
  <main class="about-page">
    <section class="about-content">
      <h1>About Making Means</h1>

      <div class="about-columns">
        <div class="about-column">
          <p>
            <strong>Making Means</strong> is a pilot project developed as part
            of Jamie Stambolie Nelson's master's research in Cultural
            Management at the University of Puerto Rico. The project explores
            how digital exhibitions can create meaningful connections between
            Zimbabwean artists living abroad and creative communities in
            Zimbabwe.
          </p>

          <p class="about-highlight">
            The project brings together artists living abroad with locally led
            creative organizations and community projects in Zimbabwe. Through
            artwork, conversation, and collaboration, Making Means explores how
            these connections can create exchanges that extend beyond financial
            support to include knowledge, skills, relationships, visibility,
            and new opportunities.
          </p>
        </div>

        <div class="about-column">
          <p>
            Each edition will remain permanently on the Making Means website,
            creating an evolving digital archive of the artists, artworks,
            collaborations, conversations, and community projects connected
            through the initiative. Over time, the website will become more
            than an exhibition platform—it will serve as an archive of
            connections between Zimbabwean artists abroad and creative
            communities at home.
          </p>

          <p class="about-highlight">
            The 2026 edition is the first Making Means pilot, developed in
            collaboration with The Oasis Bulawayo.
          </p>
        </div>
      </div>
    </section>

    <EntryContactStrip />
  </main>
</template>

<style scoped>
:global(:root) {
  --mm-gold: #d8c35a;
  --mm-green: #102117;
  --mm-black: #101a15;
  --mm-white: #fafaf7;
}

.about-page {
  display: flex;
  min-height: calc(100dvh - 5.5rem);
  flex-direction: column;
  background: var(--mm-green);
  color: var(--mm-white);
  font-family: Lato, Arial, sans-serif;
}

.about-content {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  justify-content: center;
  padding: clamp(2.5rem, 3.8vw, 4.5rem) clamp(1.25rem, 5.7vw, 7rem);
}

.about-content h1 {
  margin: 0;
  color: var(--mm-gold);
  font-size: clamp(3rem, 4.75vw, 5.25rem);
  font-weight: 400;
  letter-spacing: 0.2em;
  line-height: 1;
  text-align: center;
  text-indent: 0.2em;
  text-transform: uppercase;
}

.about-columns {
  display: grid;
  width: min(100%, 72rem);
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(4rem, 7vw, 7rem);
  margin: clamp(3rem, 5vw, 6rem) auto 0;
}

.about-column {
  display: flex;
  flex-direction: column;
  gap: clamp(2.25rem, 3.4vw, 4rem);
}

.about-column p {
  margin: 0;
  font-size: clamp(1.125rem, 1.5vw, 1.8rem);
  font-weight: 700;
  line-height: 1.45;
}

.about-column strong,
.about-highlight {
  color: var(--mm-gold);
  font-weight: 900;
}

@media (min-width: 1101px) {
  .about-page {
    min-height: calc(100dvh - 7rem);
  }
}

@media (min-width: 1280px) and (min-height: 850px) {
  .about-page {
    height: calc(100dvh - 7rem);
  }

  .about-content {
    min-height: 0;
  }

  .about-page :deep(.entry-contact) {
    flex: 0 0 auto;
  }
}

@media (min-width: 1280px) and (min-height: 850px) and (max-height: 1050px) {
  .about-content {
    padding-block: 1.8rem;
  }

  .about-content h1 {
    font-size: 3.75rem;
  }

  .about-columns {
    gap: clamp(4rem, 7vw, 7rem);
    margin-top: 2.5rem;
  }

  .about-column {
    gap: 1.75rem;
  }

  .about-column p {
    font-size: 1.0625rem;
    line-height: 1.38;
  }
}

@media (max-width: 800px) {
  .about-content {
    padding: 3rem 1.25rem;
  }

  .about-content h1 {
    font-size: clamp(2.5rem, 11vw, 3.5rem);
    line-height: 1.15;
  }

  .about-columns {
    grid-template-columns: 1fr;
    gap: 2.25rem;
    margin-top: 2.75rem;
  }

  .about-column {
    gap: 2.25rem;
  }
}
</style>
