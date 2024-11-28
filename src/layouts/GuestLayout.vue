<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <div class="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
    <div class="container">
      <RouterView />
    </div>
  </div>
</template>
