<template>
  <div class="max-w-screen-2xl mx-auto">
    <AppBar />
    <RouterView />
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import AppBar from '@/components/AppBar.vue'
</script>

<style scoped></style>
