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
    url: 'https://scontent-vie1-1.xx.fbcdn.net/v/t39.30808-6/277806998_5275205995865192_6565930718033021919_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=7T0hsM_t2iYQ7kNvgH44a_X&_nc_zt=23&_nc_ht=scontent-vie1-1.xx&_nc_gid=Axqtga75fPU56w1rMjtk2vQ&oh=00_AYDOFnTPj8BdfLZVf2q4-gnmvuvAKwZNqKXEi5RpRoZnVA&oe=67198842',
  },
  {
    url: 'https://scontent-vie1-1.xx.fbcdn.net/v/t39.30808-6/277784762_5275205789198546_6632974585512717868_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_ohc=VarsSB1N8CsQ7kNvgE0jlRS&_nc_zt=23&_nc_ht=scontent-vie1-1.xx&_nc_gid=A4qn0g2Bp6cAf7l5cboa5_G&oh=00_AYCze89j7b8WVRmY0Ox934TdoLbGhGWnh2_Pr9U5jkk6oA&oe=6719B3D6',
  },
  {
    url: 'https://scontent-vie1-1.xx.fbcdn.net/v/t39.30808-6/277779529_5275205709198554_3483255921897514386_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_ohc=4mmKRpoJp2oQ7kNvgHvU1Kv&_nc_zt=23&_nc_ht=scontent-vie1-1.xx&_nc_gid=A3vYgpKKAjq147IVH-C3On6&oh=00_AYAPVr1c_od3C7TGO1SiZNmBa3V3UhmrDRAftXJNZuHwug&oe=671993C6',
  },
  {
    url: 'https://scontent-vie1-1.xx.fbcdn.net/v/t39.30808-6/277733888_5275205892531869_253870886221836083_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_ohc=a4qC8NuYvM4Q7kNvgG7MipW&_nc_zt=23&_nc_ht=scontent-vie1-1.xx&_nc_gid=Acrmko3kg4LBhHvstfQiGZO&oh=00_AYA7UnxDWL69biM5g6vUoCBS1NutpgyG2s2dl7bpbCoTag&oe=6719A7CC',
  },
  {
    url: 'https://scontent-vie1-1.xx.fbcdn.net/v/t39.30808-6/277810292_5275205835865208_4233107373811795742_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_ohc=O_XLqJIxGYcQ7kNvgEHP1hA&_nc_zt=23&_nc_ht=scontent-vie1-1.xx&_nc_gid=ABnDcCNivnHF3-Lcg7iuA25&oh=00_AYADOamuvUcv09pfbts0kq4sf_j9pGVB7ltAREmG0RTTzw&oe=6719980A',
  },
  {
    url: 'https://scontent-vie1-1.xx.fbcdn.net/v/t39.30808-6/277578068_5275209819198143_3174051055177509638_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_ohc=31vK7VLXrxcQ7kNvgGbd68R&_nc_zt=23&_nc_ht=scontent-vie1-1.xx&_nc_gid=ACn3kOfxV8S6R4nNkJmhSjC&oh=00_AYAlSG9HRjgBL8ZIo9POVRKPFSoawa3ljnNbUEUjm-bd7g&oe=67198CA7',
  },
  {
    url: 'https://scontent-vie1-1.xx.fbcdn.net/v/t39.30808-6/368429761_683602067134643_3285496750144014297_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_ohc=lXedM6YxU0QQ7kNvgGm9u26&_nc_zt=23&_nc_ht=scontent-vie1-1.xx&_nc_gid=AvMYCjBrnJdkyvFoQywwfwi&oh=00_AYBZx8oNzirckIo9ZF7YXCi9MCHCWlYzXUiZFBWHJqdh_w&oe=6719C109',
  },
  {
    url: 'https://scontent-vie1-1.xx.fbcdn.net/v/t39.30808-6/297402834_5633168300068958_625362941418290982_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_ohc=Ae-gEwemXk8Q7kNvgECN_3J&_nc_zt=23&_nc_ht=scontent-vie1-1.xx&_nc_gid=AAXEt2sAW-pjEg4ypeqBzDO&oh=00_AYCGOlgLRGXZZxfCpK9LLsr0tf7mrCz_bYHcfKkjXXCHPA&oe=6719B644',
  },
  {
    url: 'https://scontent-vie1-1.xx.fbcdn.net/v/t39.30808-6/297216694_5633168683402253_1841541544341864080_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_ohc=3ER39ag6yIgQ7kNvgGhjg38&_nc_zt=23&_nc_ht=scontent-vie1-1.xx&_nc_gid=AOlBzybp-DXiQmDji575p1-&oh=00_AYAQd4FOtyRfiq40K9fQ95qNPdh-KA-jLHXaTPJvLfx0LQ&oe=6719C553',
  },
  {
    url: 'https://scontent-vie1-1.xx.fbcdn.net/v/t39.30808-6/298098699_5633168486735606_3482725845419934467_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_ohc=imab6RwS6SAQ7kNvgEeh4ql&_nc_zt=23&_nc_ht=scontent-vie1-1.xx&_nc_gid=ATNYwUXz6OqzUnZ1hR-1AQv&oh=00_AYApJQtRPQAx8I6l-atTg5SCIDRk4UpOIFbnvsudqxVLMg&oe=6719C1DA',
  },
  {
    url: 'https://scontent-vie1-1.xx.fbcdn.net/v/t39.30808-6/368439167_683602333801283_6038953514874496844_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_ohc=or4gy2Q54WIQ7kNvgEsMKxa&_nc_zt=23&_nc_ht=scontent-vie1-1.xx&_nc_gid=AYITJVVK8N4Z5zascF0JAdu&oh=00_AYCr5bpjcEb59cOsf8RD16KXQl8mq9Nn7YZP8R2DeYP-hA&oe=6719AA87',
  },
  {
    url: 'https://scontent-vie1-1.xx.fbcdn.net/v/t39.30808-6/368353512_683602530467930_6521711781234218750_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_ohc=n-AdcDzqheQQ7kNvgG3NLkh&_nc_zt=23&_nc_ht=scontent-vie1-1.xx&_nc_gid=AS367Ea6Tpa2M5LXru1ltLj&oh=00_AYBcERDxOoVcD6GPDIzWTubfyPvdXzErDg4lGNEeaBbU9A&oe=6719B20E',
  },
])
</script>
