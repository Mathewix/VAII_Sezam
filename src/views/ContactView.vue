<template>
  <section class="p-4 sm:p-8">
    <section>
      <h1 class="title-classic dark:text-white md:text-4xl">Contacts</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </section>

    <section class="mt-6">
      <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div class="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
          <h2
            class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white"
          >
            Our Instructors
          </h2>
          <p
            class="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400"
          >
            This is our team of volunteers whose common interest is math. They
            are responsible for selecting and correcting math problems in the
            correspondence section of SEZAM and for supervising the winter and
            summer camps. Supervision includes preparing specialized lectures
            and organizing leisure activities.
          </p>
        </div>
        <div class="grid gap-8 md:grid-cols-2">
          <ProfileCard
            v-for="(item, index) of instructors"
            :key="index"
            :name="item.name"
            url="@/images/basic-instructor.png"
            :role="item.role"
            :description="item.description"
          />
        </div>
      </div>
    </section>

    <section class="mt-6">
      <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div class="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
          <h2
            class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white"
          >
            Contact Us
          </h2>
        </div>
        <div class="grid gap-8 mb-4 lg:mb-8 md:grid-cols-2">
          <div class="flex flex-col gap-2">
            <label for="name">Name</label>
            <InputText id="name" v-model="value" />
          </div>
          <div class="flex flex-col gap-2">
            <label for="email">Email</label>
            <InputText
              id="email"
              v-model="value"
              aria-describedby="email-help"
            />
          </div>
        </div>
        <div class="flex flex-col gap-2 mb-4 lg:mb-8">
          <label for="message">Message</label>
          <Textarea v-model="value" rows="5" cols="30" />
        </div>

        <Button
          type="button"
          label="Send message"
          icon="pi pi-send"
          :loading="loading"
          @click="load"
        />
      </div>
    </section>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import ProfileCard from '@/components/ProfileCard.vue'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import { onMounted } from 'vue'
import {
  getInstructors,
} from '@/api'

const instructors = ref()
const loading = ref(false)

onMounted(async () => {
  loading.value = true
  instructors.value = await getInstructors()
  loading.value = false
})
</script>
