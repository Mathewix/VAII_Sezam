<template>
  <div class="card">
    <Menubar :model="items">
      <template #start>
        <img src="/images/sezam-logo.png" alt="SEZAM Logo" class="sezam-logo" />
      </template>
      <template #item="{ item, props, hasSubmenu }">
        <div v-if="!item.requiresAuth || (item.requiresAuth && isLoggedIn)">
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
        </div>
      </template>
      <template #end>
        <RouterLink v-if="!isLoggedIn" :to="{ name: 'login' }">
          <Button> Login </Button>
        </RouterLink>

        <Button v-else @click="logout"> Logout </Button>
      </template>
    </Menubar>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import Menubar from 'primevue/menubar'
import Button from 'primevue/button'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'

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
  {
    label: 'Users',
    icon: 'pi pi-user',
    route: '/users',
    requiresAuth: true,
  },
])

const isLoggedIn = ref(false)

let auth
onMounted(() => {
  auth = getAuth()
  onAuthStateChanged(auth, user => {
    isLoggedIn.value = !!user // Set true if user exists, false otherwise
  })
})

const logout = () => {
  signOut(auth)
    .then(() => {
      console.log('User logged out')
      isLoggedIn.value = false // Hide auth-required menu items
    })
    .catch(error => {
      console.error('Logout failed:', error)
    })
}
</script>
