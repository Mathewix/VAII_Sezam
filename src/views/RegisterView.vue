<template>
  <div class="card">
    <div class="flex flex-col md:flex-row">
      <div
        class="w-full md:w-5/12 flex flex-col items-center justify-center gap-3 py-5"
      >
        <h2
          class="section-title text-gray-900 dark:text-white"
        >
          Create new account
        </h2>
        <div class="flex flex-col gap-2">
          <label for="email">Email</label>
          <InputText v-model="email" id="email" type="email" />
        </div>
        <div class="flex flex-col gap-2">
          <label for="password">Password</label>
          <InputText v-model="password" id="password" type="password" />
        </div>
        <div class="flex flex-col gap-2">
          <Button
            label="Create"
            icon="pi pi-user-plus"
            class="w-full max-w-[17.35rem] mx-auto"
            @click="register"
          ></Button>
          <Button
            label="Sign up with Google"
            icon="pi pi-google"
            class="w-full max-w-[17.35rem] mx-auto"
            @click="registerWithGoogle"
          ></Button>
        </div>
      </div>

      <div class="w-full md:w-2/12">
        <Divider layout="vertical" class="!hidden md:!flex class-remove"
          ><b>OR</b></Divider
        >
        <Divider
          layout="horizontal"
          class="!flex md:!hidden class-remove"
          align="center"
          ><b>OR</b></Divider
        >
      </div>

      <div
        class="w-full md:w-5/12 flex flex-col items-center justify-center py-5"
      >
        <h2
          class="section-title text-gray-900 dark:text-white md:text-2xl"
        >
          Already have an account?
        </h2>
        <Button
          label="Sign In"
          icon="pi pi-user"
          severity="success"
          class="w-full max-w-[17.35rem] mx-auto"
          @click="router.push({ name: 'login' })"
        ></Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Divider from 'primevue/divider'
import { useRouter } from 'vue-router'
import { setRole } from '@/api'

const router = useRouter()

const email = ref('')
const password = ref('')

const register = async () => {
  const auth = getAuth()
  try {
    const data = await createUserWithEmailAndPassword(auth, email.value, password.value)
    console.log(data)
    console.log(auth.currentUser)
    await setRole(auth.currentUser.uid, 'viewer')
    router.push({ name: 'home' })
  } catch (error) {
    console.log(error.code)
    alert(error.message)
  }
}
const registerWithGoogle = async () => {
  const provider = new GoogleAuthProvider()
  try {
    const result = await signInWithPopup(getAuth(), provider)
    console.log(result.user)
    await setRole(result.user.uid, 'viewer')
    router.push({ name: 'home' })
  } catch (error) {
    console.log(error.code)
  }
}
</script>

<style scoped>
.class-remove :first-child {
  @apply bg-slate-50 dark:bg-slate-950;
}
</style>
