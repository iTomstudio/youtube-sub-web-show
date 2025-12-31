<script setup lang="ts">
interface LayoutProps {
  showSidebar?: boolean
  sidebarWidth?: 'narrow' | 'normal' | 'wide'
}

withDefaults(defineProps<LayoutProps>(), {
  showSidebar: false,
  sidebarWidth: 'normal'
})
</script>

<template>
  <div class="flex flex-col min-h-screen pt-0">
    <!-- 主内容区域 -->
    <main class="flex-1 container-responsive max-w-7xl mx-auto w-full py-6 tablet:py-8 desktop:py-12">
      <slot />
    </main>

    <!-- 页脚 -->
    <!-- <footer class="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-12">
      <div class="container-responsive max-w-7xl mx-auto py-8">
        <div class="grid grid-cols-1 tablet:grid-cols-3 gap-8">
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              关于我们
            </h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm">
              YouTube Sub Web Show - 您管理和分析 YouTube 订阅的平台。
            </p>
          </div>

          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              快速链接
            </h3>
            <ul class="space-y-2">
              <li>
                <router-link
                  to="/"
                  class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm"
                >
                  字幕工具
                </router-link>
              </li>
              <li>
                <router-link
                  to="/about"
                  class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm"
                >
                  关于
                </router-link>
              </li>
              <li>
                <router-link
                  to="/dashboard"
                  class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm"
                >
                  仪表板
                </router-link>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              联系方式
            </h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm">
              邮箱: info@ysw.com
            </p>
            <p class="text-gray-600 dark:text-gray-400 text-sm mt-2">
              © 2025 YouTube Sub Web Show. 保留所有权利。
            </p>
          </div>
        </div>
      </div>
    </footer> -->
  </div>
</template>

<style scoped>
/* 主布局组件的局部样式 */
</style>
