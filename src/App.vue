<script setup lang="ts">
import Navigation from '@/components/layout/Navigation.vue'
import MainLayout from '@/components/layout/MainLayout.vue'
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-gray-950">
    <Navigation />
    <MainLayout>
      <router-view />
    </MainLayout>
  </div>
</template>

<style scoped>
/* 通过 Tailwind CSS 应用的全局样式 */
</style>
