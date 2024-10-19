<template>
  <div class="card">
    <Menubar :model="items">
      <template #start>
        <img
          src="@/images/sezam-logo.png"
          alt="SEZAM Logo"
          class="sezam-logo"
        />
      </template>
      <template #item="{ item, props, hasSubmenu }">
        <router-link
          v-if="item.route"
          v-slot="{ href, navigate }"
          :to="item.route"
          custom
        >
          <a v-ripple :href="href" v-bind="props.action" @click="navigate">
            <span :class="item.icon" />
            <span>{{ item.label }}</span>
          </a>
        </router-link>
        <a
          v-else
          v-ripple
          :href="item.url"
          :target="item.target"
          v-bind="props.action"
        >
          <span :class="item.icon" />
          <span>{{ item.label }}</span>
          <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down" />
        </a>
      </template>
    </Menubar>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Menubar from 'primevue/menubar'

const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
    route: '/',
  },
  {
    label: 'Galery',
    icon: 'pi pi-image',
    route: '/galery',
  },
  {
    label: 'About',
    icon: 'pi pi-star',
    route: '/about',
  },
  {
    label: 'Contact',
    icon: 'pi pi-envelope',
    route: '/contact',
  },
])
</script>
