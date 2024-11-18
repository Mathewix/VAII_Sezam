<template>
  <section class="p-4 sm:p-8">
    <section>
      <h1 class="title-classic dark:text-white md:text-4xl">Galery</h1>
      <p>Fotky zo zimného sústredenia 2023</p>

      <!-- grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
        <!-- card -->
        <div v-for="img of images" :key="img.url" class="cool-shadow">
          <!-- image -->
          <img class="galery-image" :src="img.url" :alt="img.url" />
        </div>
      </div>
    </section>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const images = ref([
  {
    url: '/images/sezam1.png',
  },
  {
    url: '/images/sezam2.png',
  },
  {
    url: '/images/sezam3.png',
  },
  {
    url: '/images/sezam4.png',
  },
  {
    url: '/images/sezam5.png',
  },
  {
    url: '/images/sezam6.png',
  },
  {
    url: '/images/sezam7.png',
  },
  {
    url: '/images/sezam8.png',
  },
  {
    url: '/images/sezam-logo.png',
  },
  {
    url: '/images/sezam-logo.png',
  },
  {
    url: '/images/sezam-logo.png',
  },
  {
    url: '/images/sezam-logo.png',
  },
])
</script>
