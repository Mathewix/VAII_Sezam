<template>
  <div class="card">
    <Menubar :model="items" class="sticky-menubar">
      <template #start>
        <img src="/images/sezam-logo.png" alt="SEZAM Logo" class="sezam-logo" />
      </template>
      <template #item="{ item, props, hasSubmenu }">
        <div v-if="!item.requiresAuth || (item.requiresAuth && isAuthorized(item.requiresAuth))">
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
import { useRouter, useRoute } from 'vue-router'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { getUserRole } from '@/api'

const router = useRouter()
const route = useRoute()

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
    requiresAuth: 'viewer',
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
    requiresAuth: 'admin',
  },
  {
    label: 'Instructors',
    icon: 'pi pi-users',
    route: '/instructors',
    requiresAuth: 'editor',
  },
  {
    label: 'Rankings',
    icon: 'pi pi-chart-bar',
    route: '/ranking',
  }
])

const isLoggedIn = ref(false)
const role = ref('')
const auth = ref()

onMounted(() => {
  auth.value = getAuth()
  onAuthStateChanged(auth.value, user => {
    isLoggedIn.value = !!user // Set true if user exists, false otherwise
    getCurrentUsersRole()
  })
})

const logout = () => {
  signOut(auth.value)
    .then(() => {
      console.log('User logged out')
      getCurrentUsersRole()
      isLoggedIn.value = false
      // if page requires auth, redirect to home
      if (route.meta.requiresAuth) {
        router.push({ name: 'home' });
      }
    })
    .catch(error => {
      console.error('Logout failed:', error)
    })
}

const getCurrentUsersRole = async () => {
  auth.value = getAuth()
  const user = auth.value.currentUser
  if (user) {
    role.value = await getUserRole(user.uid)
    console.log("ROLE is: ", role.value)
  }
}

const isAuthorized = (requirement) => {
  if (isLoggedIn.value) {
    return role.value === 'admin' || 
           (requirement === 'editor' && role.value === 'editor') || 
           (requirement === 'viewer' && role.value === 'viewer')
  } else {
    return false
  }
}

</script>
