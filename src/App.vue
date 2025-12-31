<script setup lang="ts">
import { h, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import Navigation from '@/components/layout/Navigation.vue'
import MainLayout from '@/components/layout/MainLayout.vue'
import SubtitleEditorView from '@/pages/SubtitleEditorView.vue'

const route = useRoute()
const isEditorActive = ref(route.path === '/nikse')

// 监听路由变化
watch(() => route.path, (newPath) => {
  isEditorActive.value = newPath === '/nikse'
})
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-gray-950">
    <Navigation />

    <!-- 精听工具页面 - 始终存在于 DOM,通过 v-show 控制显示 -->
    <div v-show="isEditorActive">
      <SubtitleEditorView />
    </div>

    <!-- 其他页面 - 正常路由渲染 -->
    <div v-show="!isEditorActive">
      <router-view v-slot="{ Component }">
        <component :is="h(MainLayout, null, { default: () => h(Component) })" />
      </router-view>
    </div>
  </div>
</template>

<style scoped>
/* 通过 Tailwind CSS 应用的全局样式 */
</style>
