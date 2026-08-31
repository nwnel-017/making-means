<script lang="ts" setup>
import InstagramIcon from "~/components/icons/InstagramIcon.vue";

definePageMeta({
  layout: "default",
});

useHead({
  bodyAttrs: {
    class: "contact-route",
  },
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
  title: "Contact",
  description:
    "Contact Making Means about artwork, collaborations, exhibitions, and general inquiries.",
  ogTitle: "Contact | Making Means",
  ogDescription:
    "Contact Making Means about artwork, collaborations, exhibitions, and general inquiries.",
});
</script>

<template>
  <main class="contact-page">
    <div class="page-divider" aria-hidden="true" />

    <header class="contact-banner">
      <h1>Contact</h1>
    </header>

    <section class="contact-content">
      <p class="contact-kicker">Questions, ideas, or opportunities?</p>
      <h2>Let’s make something meaningful.</h2>
      <p class="contact-copy">
        Get in touch about artwork, exhibitions, collaborations, or the Making
        Means project. We would love to hear from you.
      </p>

      <div class="contact-actions">
        <a class="contact-action contact-action--primary" href="mailto:makingmeans@gmail.com">
          makingmeans@gmail.com
        </a>
        <a
          class="contact-action contact-action--social"
          href="https://www.instagram.com"
          target="_blank"
          rel="noreferrer"
          aria-label="Follow Making Means on Instagram"
        >
          <InstagramIcon size="lg" />
          <span>Instagram</span>
        </a>
      </div>
    </section>
  </main>
</template>

<style scoped>
:global(body.contact-route) {
  --mm-gold: #d8c35a;
  --mm-green: #102117;
  --mm-black: #101a15;
  --mm-white: #fafaf7;
}

:global(body.contact-route .page) {
  min-height: calc(100dvh - 7rem);
  padding: 0;
}

.contact-page {
  display: flex;
  width: 100%;
  min-height: calc(100dvh - 15rem);
  flex-direction: column;
  background: var(--mm-green);
  color: var(--mm-white);
  font-family: Lato, Arial, sans-serif;
}

.page-divider {
  flex: 0 0 clamp(1.1rem, 2dvh, 2rem);
  background: var(--mm-green);
}

.contact-banner {
  display: grid;
  min-height: clamp(6rem, 13dvh, 9rem);
  padding: 0.75rem 1.25rem;
  place-items: center;
  background: var(--mm-gold);
  color: var(--mm-green);
  text-align: center;
}

.contact-banner h1 {
  margin: 0;
  font-family: Lato, Arial, sans-serif;
  font-size: clamp(2.4rem, 5vw, 5rem);
  font-weight: 400;
  letter-spacing: 0.2em;
  line-height: 1;
  text-indent: 0.2em;
  text-transform: uppercase;
}

.contact-content {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: min(100%, 68rem);
  margin: 0 auto;
  padding: clamp(2rem, 5dvh, 4rem) clamp(1.25rem, 5vw, 4rem);
  text-align: center;
}

.contact-kicker {
  margin: 0;
  color: var(--mm-gold);
  font-size: clamp(1rem, 1.25vw, 1.25rem);
  font-weight: 900;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.contact-content h2 {
  margin: clamp(0.65rem, 1.5dvh, 1.25rem) 0 0;
  font-family: Lato, Arial, sans-serif;
  font-size: clamp(2rem, 4vw, 4rem);
  font-weight: 400;
  line-height: 1.05;
}

.contact-copy {
  max-width: 48rem;
  margin: clamp(1rem, 2dvh, 1.5rem) 0 0;
  font-size: clamp(1.05rem, 1.5vw, 1.5rem);
  line-height: 1.4;
}

.contact-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-top: clamp(1.75rem, 4dvh, 3rem);
}

.contact-action {
  display: inline-flex;
  min-height: 3.75rem;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 0.8rem clamp(1.25rem, 2vw, 2rem);
  border: 2px solid var(--mm-gold);
  border-radius: 999px;
  color: var(--mm-white);
  font-size: clamp(1rem, 1.25vw, 1.25rem);
  font-weight: 900;
  text-decoration: none;
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    filter 0.2s ease;
}

.contact-action--primary {
  background: var(--mm-gold);
  color: var(--mm-green);
}

.contact-action:hover,
.contact-action:focus-visible {
  background: var(--mm-gold);
  color: var(--mm-green);
  filter: brightness(1.08);
}

.contact-action--social :deep(svg) {
  flex: 0 0 auto;
}

@media (max-width: 1100px) {
  :global(body.contact-route .page) {
    min-height: calc(100dvh - 5.5rem);
  }

  .contact-page {
    min-height: calc(100dvh - 13.5rem);
  }
}

@media (max-width: 800px) {
  .contact-page {
    min-height: 0;
  }

  .page-divider {
    flex-basis: 1rem;
  }

  .contact-banner {
    min-height: 6rem;
  }

  .contact-banner h1 {
    letter-spacing: 0.12em;
    text-indent: 0.12em;
  }

  .contact-content {
    min-height: 28rem;
    padding: 3rem 1.25rem;
  }
}

@media (max-width: 540px) {
  .contact-actions,
  .contact-action {
    width: 100%;
  }

  .contact-action {
    min-height: 3.5rem;
    padding-right: 1rem;
    padding-left: 1rem;
    font-size: 0.95rem;
  }
}
</style>
