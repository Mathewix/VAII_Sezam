<template>
  <section class="p-4 sm:p-8">
    <section>
      <h1 class="title-classic dark:text-white md:text-4xl">About us</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus
        justo est, mollis dictum augue finibus in. Vivamus erat nulla, mattis
        nec augue vitae, venenatis mollis erat. Sed at malesuada ipsum. Donec
        dapibus scelerisque metus, sit amet pellentesque orci ultrices sit amet.
        Nam sodales tellus eu vehicula dignissim. Cras sodales, risus ut
        pellentesque ornare, augue arcu efficitur leo, et pharetra leo nunc id
        ante. Sed rutrum posuere felis tincidunt sollicitudin. Suspendisse
        viverra augue velit, ac faucibus orci pharetra eget. Vivamus dignissim
        urna mauris, eget tincidunt erat elementum at. Maecenas quis mi eget
        lectus ornare iaculis ut ac massa. Fusce eget laoreet est. Integer vel
        bibendum ante. Sed at malesuada ipsum. Donec dapibus scelerisque metus,
        sit amet pellentesque orci ultrices sit amet. Nam sodales tellus eu
        vehicula dignissim.Fusce rhoncus justo est, mollis dictum augue finibus
        in. Vivamus erat nulla, mattis nec augue vitae, venenatis mollis erat.
      </p>
    </section>

    <section class="mt-6">
      <h2
        class="py-4 text-3xl font-extrabold tracking-tight leading-tight text-gray-900 dark:text-white md:text-4xl"
      >
        Statistics
      </h2>
      <p>
        Štatistiky od založenia <strong>SEZAMu</strong> ku súčastnému roku
        <strong>2024</strong>
      </p>

      <!-- grid -->
      <dl
        class="grid gap-8 text-gray-900 sm:grid-cols-2 lg:gap-20 lg:mt-8 mt-4 lg:grid-cols-4 dark:text-white"
      >
        <!-- card -->
        <div
          v-for="stat in statistics"
          :key="stat.title"
          class="flex flex-col p-4 hover:border border-slate-300 dark:border-slate-800 rounded-lg hover:bg-slate-100 hover:dark:bg-slate-900"
        >
          <dt class="mb-2 text-3xl md:text-4xl font-extrabold tracking-tight">
            {{ stat.title }}
          </dt>
          <dd class="font-light text-gray-500 dark:text-gray-400">
            {{ stat.description }}
          </dd>
        </div>
      </dl>
    </section>

    <section class="mt-6">
      <h2
        class="py-4 text-3xl font-extrabold tracking-tight leading-tight text-gray-900 dark:text-white md:text-4xl"
      >
        Our goals
      </h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus
        justo est, mollis dictum augue finibus in. Vivamus erat nulla, mattis
        nec augue vitae, venenatis mollis erat. Sed at malesuada ipsum. Donec
        dapibus scelerisque metus, sit amet pellentesque orci ultrices sit amet.
        Nam sodales tellus eu vehicula dignissim. Cras sodales, risus ut
        pellentesque ornare, augue arcu efficitur leo, et pharetra leo nunc id
        ante. Sed rutrum posuere felis tincidunt sollicitudin. Suspendisse
        viverra augue velit, ac faucibus orci pharetra eget. Vivamus dignissim
        urna mauris, eget tincidunt erat elementum at. Maecenas quis mi eget
        lectus ornare iaculis ut ac massa. Fusce eget laoreet est. Integer vel
        bibendum ante. Sed at malesuada ipsum. Donec dapibus scelerisque metus,
        sit amet pellentesque orci ultrices sit amet. Nam sodales tellus eu
        vehicula dignissim.Fusce rhoncus justo est, mollis dictum augue finibus
        in. Vivamus erat nulla, mattis nec augue vitae, venenatis mollis erat.
      </p>
    </section>
  </section>
</template>

<script setup>
import { ref } from 'vue'
const statistics = ref([
  {
    title: '8574',
    description: 'Úspešných riešiteľov',
  },
  {
    title: '219',
    description: 'Odborných vedúcich',
  },
  {
    title: '2080',
    description: 'Unikátnych príkladov',
  },
  {
    title: '117',
    description: 'Zážitkových sústredení',
  },
])
</script>
