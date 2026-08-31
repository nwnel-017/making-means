<script setup lang="ts">
import appLogo from "~/assets/icons/applogo-transparent.png";

const links = [
  { label: "HOME", to: "/" },
  { label: "EXHIBITION & SALE", to: "/exhibition-sales" },
  { label: "ARTISTS", to: "/artists/all" },
  { label: "THE OASIS", to: "/collections/collections" },
  { label: "IMPACT", to: "/about" },
  { label: "CONVERSATIONS", to: "/stories" },
  { label: "ABOUT", to: "/about" },
  { label: "CONTACT", to: "/contact" },
];
</script>

<template>
  <footer class="entry-footer">
    <NuxtLink to="/" aria-label="Making Means home" class="entry-footer-logo-link">
      <img :src="appLogo" alt="Making Means" class="entry-footer-logo">
    </NuxtLink>
    <nav class="entry-footer-navigation" aria-label="Footer navigation">
      <NuxtLink v-for="link in links" :key="`${link.label}-${link.to}`" :to="link.to">
        {{ link.label }}
      </NuxtLink>
    </nav>
  </footer>
</template>

<style scoped>
.entry-footer {
  display: flex;
  align-items: center;
  gap: 2.25rem;
  min-height: 7rem;
  padding: 1.1rem 2.35rem;
  background: var(--mm-gold);
}

.entry-footer-logo-link {
  display: block;
  flex: 0 0 9.1rem;
  height: 4.7rem;
  background: var(--mm-white);
}

.entry-footer-logo {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.entry-footer-navigation {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  gap: 1.35rem;
}

.entry-footer-navigation a {
  color: var(--mm-black);
  font-family: "Arial Black", Arial, sans-serif;
  font-size: clamp(0.95rem, 1.55vw, 2rem);
  line-height: 1;
  text-decoration: none;
  white-space: nowrap;
}

.entry-footer-navigation a:hover {
  text-decoration: underline;
  text-underline-offset: 0.22em;
}

@media (max-width: 1100px) {
  .entry-footer {
    align-items: flex-start;
    flex-direction: column;
    padding: 1.5rem 1.25rem 2rem;
  }

  .entry-footer-logo-link {
    flex-basis: 3.7rem;
    width: 7.6rem;
    height: 3.7rem;
  }

  .entry-footer-navigation {
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 1rem 1.5rem;
  }

  .entry-footer-navigation a {
    font-size: 1rem;
  }
}
</style>
