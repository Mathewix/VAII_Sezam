import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import { PrimeIcons } from '@primevue/core/api'
import { definePreset } from '@primevue/themes'

// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
// import { getDatabase } from 'firebase/database'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBVmb5OTgZ6OrVmBZwktclYCRYYe_tLS70',
  authDomain: 'sezam-be.firebaseapp.com',
  projectId: 'sezam-be',
  storageBucket: 'sezam-be.firebasestorage.app',
  messagingSenderId: '479359667152',
  appId: '1:479359667152:web:0a421ffd362d883ac947d5',
}

firebase.initializeApp(firebaseConfig)
const app = createApp(App)
// Initialize pinia store and vue router
app.use(createPinia())
app.use(router)

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{blue.50}',
      100: '{blue.100}',
      200: '{blue.200}',
      300: '{blue.300}',
      400: '{blue.400}',
      500: '{blue.500}',
      600: '{blue.600}',
      700: '{blue.700}',
      800: '{blue.800}',
      900: '{blue.900}',
      950: '{blue.950}',
    },
  },
})

app.use(PrimeVue, {
  theme: {
    preset: MyPreset,
    options: {
      prefix: 'p',
      darkModeSelector: 'system',
      cssLayer: false,
    },
  },
})

app.mount('#app')
