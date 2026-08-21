<script lang="ts" setup>
definePageMeta({ layout: "default" });

useSeoMeta({
  title: "Stories",
  description: "Watch stories from Making Means.",
  ogTitle: "Stories | Making Means",
  ogDescription: "Watch stories from Making Means.",
});
</script>

<template>
  <main class="verticalContent fillPage storiesPage">
    <div class="textBlock">
      <h1>Stories</h1>
    </div>

    <div class="videoFrame">
      <iframe
        src="https://www.youtube-nocookie.com/embed/z8wrqe72YG4"
        title="Making Means story video"
        loading="lazy"
        referrerpolicy="strict-origin-when-cross-origin"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    </div>
  </main>
</template>

<style scoped>
.storiesPage {
  padding: 0 1rem 3rem;
}

.videoFrame {
  position: relative;
  width: min(56rem, 100%);
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: black;
}

.videoFrame iframe {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 0;
  inset: 0;
}
</style>
