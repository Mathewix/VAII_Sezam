<template>
  <div class="card">
    <div class="flex flex-col md:flex-row">
      <div
        class="w-full md:w-5/12 flex flex-col items-center justify-center gap-3 py-5"
      >
        <h2
          class="section-title text-gray-900 dark:text-white"
        >
          Log in
        </h2>

        <div class="flex flex-col gap-2">
          <label for="email">Email</label>
          <InputText v-model="email" id="email" type="email" />
        </div>
        <div class="flex flex-col gap-2">
          <label for="password">Password</label>
          <InputText v-model="password" id="password" type="password" />
        </div>
        <p v-if="errorMsg">{{ errorMsg }}</p>
        <div class="flex flex-col gap-2">
          <Button
            label="Login"
            icon="pi pi-user"
            class="w-full max-w-[17.35rem] mx-auto"
            @click="login"
          ></Button>
          <Button
            label="Sign in with Google"
            icon="pi pi-google"
            class="w-full max-w-[17.35rem] mx-auto"
            @click="loginWithGoogle"
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
          Join us!
        </h2>
        <Button
          label="Sign Up"
          icon="pi pi-user-plus"
          severity="success"
          class="w-full max-w-[17.35rem] mx-auto"
          @click="router.push({ name: 'register' })"
        ></Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Divider from 'primevue/divider'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const password = ref('')
const errorMsg = ref('')

const login = () => {
  const auth = getAuth()
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(data => {
      console.log(data)
      console.log(auth.currentUser)
      router.push({ name: 'home' })
    })
    .catch(error => {
      console.log(error.code)
      switch (error.code) {
        case 'auth/invalid-email':
          errorMsg.value = 'Invalid email'
          break
        case 'auth/user-not-found':
          errorMsg.value = 'Email is not registered'
          break
        case 'auth/wrong-password':
          errorMsg.value = 'Incorrect password'
          break
        default:
          errorMsg.value = 'Email or password was incorrect'
          break
      }
    })
}
const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  try {
    const result = await signInWithPopup(auth, provider);
    console.log(result.user);
    router.push({ name: 'home' });
  } catch (error) {
    console.log(error.code);
    errorMsg.value = 'Failed to sign in with Google';
  }
}
</script>

<style scoped>
.class-remove :first-child {
  @apply bg-slate-50 dark:bg-slate-950;
}
</style>
