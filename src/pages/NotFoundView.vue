<script setup lang="ts">
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
    <div class="text-center space-y-4">
      <h1 class="text-6xl font-bold text-gray-900 dark:text-white">
        404
      </h1>
      <p class="text-2xl font-semibold text-gray-600 dark:text-gray-400">
        页面未找到
      </p>
      <p class="text-gray-600 dark:text-gray-400 max-w-md">
        抱歉，您要查找的页面不存在或已被移动。
      </p>
    </div>
    <router-link
      to="/"
      class="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 dark:bg-primary-dark-500 dark:hover:bg-primary-dark-600 transition-colors font-medium"
    >
      返回首页
    </router-link>
  </div>
</template>

<style scoped>
/* 404页面样式 */
</style>
