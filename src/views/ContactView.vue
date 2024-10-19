<template>
  <section class="p-4 sm:p-8">
    <section>
      <h1
        class="py-4 text-5xl font-extrabold tracking-tight leading-tight text-gray-900 dark:text-white md:text-4xl"
      >
        Contacts
      </h1>
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
        <div class="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
          <ProfileCard
            v-for="(item, index) of items"
            :key="index"
            :name="item.name"
            :url="item.url"
            :role="item.role"
            :description="item.description"
          />
        </div>
      </div>
    </section>
  </section>
</template>

<script setup>
import ProfileCard from '@/components/ProfileCard.vue'
import { ref } from 'vue'

const items = ref([
  {
    name: 'Anna Müller',
    url: '@/images/basic-instructor.png',
    role: 'High School Math Teacher',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.',
  },
  {
    name: 'Michael Schmidt',
    url: '@/images/basic-instructor.png',
    role: 'University Physics Professor',
    description:
      'Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Etiam porta sem.',
  },
  {
    name: 'Sophia Hoffmann',
    url: '@/images/basic-instructor.png',
    role: 'Mathematics Research Assistant',
    description:
      'Donec sed odio dui. Curabitur blandit tempus porttitor. Maecenas sed diam eget risus varius.',
  },
  {
    name: 'Lucas Fischer',
    url: '@/images/basic-instructor.png',
    role: 'IT University Student',
    description:
      'Nullam id dolor id nibh ultricies vehicula ut id elit. Fusce dapibus tellus ac cursus.',
  },
  {
    name: 'Emma Wagner',
    url: '@/images/basic-instructor.png',
    role: 'High School Physics Student',
    description:
      'Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Praesent commodo cursus magna.',
  },
  {
    name: 'Noah Becker',
    url: '@/images/basic-instructor.png',
    role: 'Math Department Head',
    description:
      'Aenean lacinia bibendum nulla sed consectetur. Cras justo odio, dapibus ac facilisis in.',
  },
  {
    name: 'Lena Weber',
    url: '@/images/basic-instructor.png',
    role: 'Physics PhD Candidate',
    description:
      'Cras mattis consectetur purus sit amet fermentum. Sed posuere consectetur est at lobortis.',
  },
  {
    name: 'Maximilian Lehmann',
    url: '@/images/basic-instructor.png',
    role: 'University Math Professor',
    description:
      'Vestibulum id ligula porta felis euismod semper. Nulla vitae elit libero, a pharetra augue.',
  },
  {
    name: 'Mia Schulz',
    url: '@/images/basic-instructor.png',
    role: 'Computer Science Student',
    description:
      'Etiam porta sem malesuada magna mollis euismod. Vestibulum id ligula porta felis euismod semper.',
  },
])
</script>
