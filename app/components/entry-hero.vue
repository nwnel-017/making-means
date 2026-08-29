<template>
  <main class="entry-hero">
    <div class="entry-mark" aria-label="Making Means">
      <div class="entry-mark-letter entry-mark-letter--left">M</div>
      <div class="entry-mark-name">MAKING MEANS</div>
      <div class="entry-mark-letter entry-mark-letter--right">M</div>
    </div>

    <section class="entry-copy" aria-labelledby="entry-intro-title">
      <p id="entry-intro-title" class="entry-intro">
        <strong>MAKING MEANS</strong> connects Zimbabwean artists living abroad
        with local creative organizations in Zimbabwe, creating opportunities
        for collaboration through art, conversation, and exchange. Through an
        online exhibition and sale of artworks, the project explores how these
        collaborations can generate resources for locally led creative
        initiatives.
      </p>

      <div class="entry-edition">
        <h1>2026 EDITION</h1>
        <p>
          This year's edition of Making Means is presented in collaboration
          with <a href="https://theoasisbulawayo.com" target="_blank" rel="noreferrer">The Oasis Bulawayo.</a>
        </p>
      </div>
      <div class="btn-container"> 
      <NuxtLink to="/artworks/available" class="entry-cta">
        VIEW ARTWORKS
      </NuxtLink>
    </div>
    </section>
  </main>
</template>

<style scoped>
.entry-hero {
  --entry-content-height: clamp(22rem, min(36vw, 60dvh), 42rem);

  display: flex;
  justify-content: center;
  align-items: center;
  gap: clamp(3rem, 7vw, 8rem);
  min-height: 0;
  padding: clamp(3.5rem, 6vw, 6.5rem) clamp(3rem, 5.45vw, 7.75rem);
  background: var(--mm-green);
  color: var(--mm-white);
}

.entry-mark {
  position: relative;
  flex: 0 0 var(--entry-content-height);
  display: grid;
  grid-template-columns: 43.75% 14% 42.25%;
  grid-template-rows: 1fr;
  align-items: center;
  width: var(--entry-content-height);
  max-width: 100%;
  height: var(--entry-content-height);
  aspect-ratio: 1;
  container-type: inline-size;
  justify-self: center;
  color: var(--mm-green);
  background: var(--mm-gold);
  box-shadow: 0 0 0 1px var(--mm-green);
  overflow: hidden;
  /* border: 2px solid green; */
}

.entry-mark-letter {
  z-index: 1;
  grid-row: 1;
  place-self: center;
  font-family: "Times New Roman", Times, serif;
  font-size: clamp(12rem, 42cqw, 24rem);
  line-height: 0.72;
  letter-spacing: -0.16em;
}

.entry-mark-letter--left {
  grid-column: 1 / 3;
  transform: translate(-10%, -12%);
}

.entry-mark-letter--right {
  grid-column: 2 / 4;
  transform: translate(10%, 12%);
}

.entry-mark-name {
  z-index: 2;
  grid-column: 2;
  grid-row: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: var(--mm-green);
  color: var(--mm-gold);
  font-family: "Times New Roman", Times, serif;
  font-size: clamp(1.5rem, 5.25cqw, 3.25rem);
  letter-spacing: 0;
  line-height: 1;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  white-space: nowrap;
}

.entry-copy {
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  min-width: 0;
  height: var(--entry-content-height);
  max-width: 68rem;
  /* border: 2px solid purple; */
}

.entry-intro,
.entry-edition p {
  margin: 0;
  font-family: Lato, Arial, sans-serif;
  font-size: clamp(1.25rem, 1.65vw, 2rem);
  line-height: 1.4;
}

.entry-intro strong,
.entry-edition h1 {
  color: var(--mm-gold);
  font-family: Lato, Arial, sans-serif;
  font-weight: 900;
}

.entry-edition {
  /* margin-top: clamp(3rem, 5vw, 5.25rem); */
}

.entry-edition h1 {
  margin: 0 0 1rem;
  font-size: clamp(1.75rem, 2.5vw, 2.5rem);
  line-height: 1;
}

.entry-edition a {
  color: var(--mm-gold);
  text-decoration: none;
}

.entry-edition a:hover {
  text-decoration: underline;
  text-underline-offset: 0.15em;
}

.btn-container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.entry-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  /* min-width: min(32rem, 100%); -----> TO DO: what is controlling width here?*/
  /* min-height: 3rem; */
  /* margin: clamp(3.5rem, 5vw, 5.5rem) auto 0; */
  /* padding: 1rem 2.5rem; */
  padding: 1.5rem 1rem;
  border-radius: 999px;
  background: var(--mm-white);
  color: var(--mm-green);
  font-family: Lato, Arial, sans-serif;
  font-size: clamp(1.5rem, 2.5vw, 2.5rem);
  font-weight: 900;
  line-height: 1;
  text-align: center;
  text-decoration: none;
  transition: transform 180ms ease;
}

.entry-cta:hover {
  transform: translateY(-0.2rem);
}

@media (min-width: 1201px) {
  .entry-mark {
    grid-template-columns: 42.25% 17% 40.75%;
  }
}

@media (min-width: 1201px) and (max-height: 850px) {
  .entry-hero {
    --entry-content-height: clamp(20rem, 46dvh, 28rem);

    padding-block: clamp(1.5rem, 3dvh, 2.5rem);
  }

  .entry-intro,
  .entry-edition p {
    font-size: clamp(1.1rem, 2.4dvh, 1.5rem);
  }

  .entry-cta {
    padding-block: 1rem;
    font-size: clamp(1.4rem, 3dvh, 2rem);
  }
}

@media (max-width: 1200px) {
  .entry-hero {
    --entry-content-height: min(28rem, calc(100vw - 2.5rem));

    flex-direction: column;
    gap: clamp(2.5rem, 7vw, 4rem);
    min-height: auto;
    padding: 2.5rem 1.25rem 4rem;
  }

  .entry-mark {
    width: var(--entry-content-height);
    height: var(--entry-content-height);
  }

  .entry-copy {
    gap: clamp(2rem, 6vw, 3.5rem);
    width: min(100%, 42rem);
    height: auto;
  }

  .entry-mark-letter {
    font-size: clamp(8rem, 42cqw, 18rem);
  }

  .entry-mark-name {
    font-size: clamp(1.1rem, 5.25cqw, 2rem);
  }

  .entry-intro,
  .entry-edition p {
    font-size: clamp(1.25rem, 3vw, 1.75rem);
  }

  .entry-cta {
    width: 100%;
    min-width: 0;
    min-height: 5.25rem;
    font-size: 1.55rem;
  }
}

</style>
