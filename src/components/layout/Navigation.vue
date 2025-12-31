<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Menu, X } from 'lucide-vue-next'
import ThemeToggle from '@/components/ui/ThemeToggle.vue'

const router = useRouter()
const route = useRoute()
const isMenuOpen = ref(false)

const navLinks = [
  { name: '字幕工具', path: '/' },
  { name: '精听工具', path: '/nikse' },
  { name: '关于', path: '/about' },
  { name: '仪表板', path: '/dashboard' },
]

const isActive = (path: string) => route.path === path

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

// 设置导航标记（用于区分路由导航和页面刷新）
const setNavigationFlag = () => {
  sessionStorage.setItem('subtitle-navigation-flag', 'true')
}

const navigate = (path: string) => {
  setNavigationFlag()
  router.push(path)
  isMenuOpen.value = false
}
</script>

<template>
  <nav class="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
    <div class="container-responsive max-w-7xl mx-auto">
      <div class="flex items-center h-16">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <router-link to="/" class="text-2xl font-bold text-primary-600 dark:text-primary-dark-500">
            橘子外语学习
          </router-link>
        </div>

        <!-- 桌面导航 - 居中 -->
        <div class="hidden tablet:flex items-center space-x-8 flex-1 justify-center">
          <router-link
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            @click="setNavigationFlag"
            :class="[
              'text-sm font-bold transition-colors',
              isActive(link.path)
                ? 'text-primary-600 dark:text-primary-dark-500'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            ]"
          >
            {{ link.name }}
          </router-link>
        </div>

        <!-- 桌面端右侧主题切换器 -->
        <div class="hidden tablet:flex items-center">
          <ThemeToggle />
        </div>

        <!-- 移动端右侧控件 -->
        <div class="tablet:hidden flex items-center space-x-2 ml-auto">
          <ThemeToggle />
          <button
            class="p-2 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900"
            @click="toggleMenu"
          >
            <Menu v-if="!isMenuOpen" :size="24" />
            <X v-else :size="24" />
          </button>
        </div>
      </div>

      <!-- 移动端导航 -->
      <div
        v-if="isMenuOpen"
        class="tablet:hidden border-t border-gray-200 dark:border-gray-800 py-2"
      >
        <button
          v-for="link in navLinks"
          :key="link.path"
          @click="navigate(link.path)"
          :class="[
            'block w-full text-left px-4 py-2 text-sm font-medium rounded-md transition-colors',
            isActive(link.path)
              ? 'bg-primary-50 dark:bg-gray-900 text-primary-600 dark:text-primary-dark-500'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900'
          ]"
        >
          {{ link.name }}
        </button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* 导航组件的局部样式 */
</style>
