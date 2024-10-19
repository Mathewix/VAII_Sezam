<template>
  <section class="mt-8">
    <h1
      class="py-4 text-4xl font-extrabold tracking-tight leading-tight text-gray-900 dark:text-white md:text-4xl"
    >
      Galery
    </h1>
    <p>Fotky zo zimného sústredenia 2023</p>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
      <div v-for="img of images" :key="img.url">
        <img
          class="h-auto max-w-full rounded-lg"
          :src="img.url"
          :alt="img.url"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const images = ref([
  {
    url: 'https://scontent-vie1-1.xx.fbcdn.net/v/t39.30808-6/277806998_5275205995865192_6565930718033021919_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=7T0hsM_t2iYQ7kNvgH44a_X&_nc_zt=23&_nc_ht=scontent-vie1-1.xx&_nc_gid=Axqtga75fPU56w1rMjtk2vQ&oh=00_AYDOFnTPj8BdfLZVf2q4-gnmvuvAKwZNqKXEi5RpRoZnVA&oe=67198842',
  },
  {
    url: 'https://scontent-vie1-1.xx.fbcdn.net/v/t39.30808-6/277784762_5275205789198546_6632974585512717868_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_ohc=VarsSB1N8CsQ7kNvgE0jlRS&_nc_zt=23&_nc_ht=scontent-vie1-1.xx&_nc_gid=A4qn0g2Bp6cAf7l5cboa5_G&oh=00_AYCze89j7b8WVRmY0Ox934TdoLbGhGWnh2_Pr9U5jkk6oA&oe=6719B3D6',
  },
  {
    url: 'https://scontent-vie1-1.xx.fbcdn.net/v/t39.30808-6/277784762_5275205789198546_6632974585512717868_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_ohc=VarsSB1N8CsQ7kNvgE0jlRS&_nc_zt=23&_nc_ht=scontent-vie1-1.xx&_nc_gid=A4qn0g2Bp6cAf7l5cboa5_G&oh=00_AYCze89j7b8WVRmY0Ox934TdoLbGhGWnh2_Pr9U5jkk6oA&oe=6719B3D6',
  },
  {
    url: 'https://scontent-vie1-1.xx.fbcdn.net/v/t39.30808-6/277784762_5275205789198546_6632974585512717868_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_ohc=VarsSB1N8CsQ7kNvgE0jlRS&_nc_zt=23&_nc_ht=scontent-vie1-1.xx&_nc_gid=A4qn0g2Bp6cAf7l5cboa5_G&oh=00_AYCze89j7b8WVRmY0Ox934TdoLbGhGWnh2_Pr9U5jkk6oA&oe=6719B3D6',
  },
  {
    url: 'https://scontent-vie1-1.xx.fbcdn.net/v/t39.30808-6/277784762_5275205789198546_6632974585512717868_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_ohc=VarsSB1N8CsQ7kNvgE0jlRS&_nc_zt=23&_nc_ht=scontent-vie1-1.xx&_nc_gid=A4qn0g2Bp6cAf7l5cboa5_G&oh=00_AYCze89j7b8WVRmY0Ox934TdoLbGhGWnh2_Pr9U5jkk6oA&oe=6719B3D6',
  },
  {
    url: 'https://scontent-vie1-1.xx.fbcdn.net/v/t39.30808-6/277784762_5275205789198546_6632974585512717868_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_ohc=VarsSB1N8CsQ7kNvgE0jlRS&_nc_zt=23&_nc_ht=scontent-vie1-1.xx&_nc_gid=A4qn0g2Bp6cAf7l5cboa5_G&oh=00_AYCze89j7b8WVRmY0Ox934TdoLbGhGWnh2_Pr9U5jkk6oA&oe=6719B3D6',
  },
  {
    url: 'https://scontent-vie1-1.xx.fbcdn.net/v/t39.30808-6/277784762_5275205789198546_6632974585512717868_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_ohc=VarsSB1N8CsQ7kNvgE0jlRS&_nc_zt=23&_nc_ht=scontent-vie1-1.xx&_nc_gid=A4qn0g2Bp6cAf7l5cboa5_G&oh=00_AYCze89j7b8WVRmY0Ox934TdoLbGhGWnh2_Pr9U5jkk6oA&oe=6719B3D6',
  },
  {
    url: 'https://scontent-vie1-1.xx.fbcdn.net/v/t39.30808-6/277784762_5275205789198546_6632974585512717868_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_ohc=VarsSB1N8CsQ7kNvgE0jlRS&_nc_zt=23&_nc_ht=scontent-vie1-1.xx&_nc_gid=A4qn0g2Bp6cAf7l5cboa5_G&oh=00_AYCze89j7b8WVRmY0Ox934TdoLbGhGWnh2_Pr9U5jkk6oA&oe=6719B3D6',
  },
])
</script>
