<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ExternalLink, AlertCircle, Loader2 } from 'lucide-vue-next'
import { useAnalytics } from '@/composables/useAnalytics'

const { trackEvent, trackException } = useAnalytics()

// iframe 加载状态
const isLoading = ref(true)
const loadError = ref(false)
const iframeRef = ref<HTMLIFrameElement | null>(null)

// iframe 加载完成处理
const handleIframeLoad = () => {
  isLoading.value = false
  trackEvent('subtitle_editor_loaded', {
    event_category: 'editor',
    event_label: 'iframe_load_success'
  })
}

// iframe 加载失败处理
const handleIframeError = () => {
  isLoading.value = false
  loadError.value = true
  trackException('Subtitle editor iframe failed to load', false)
}

// 在新标签页打开编辑器（备选方案）
const openInNewTab = () => {
  window.open('https://www.nikse.dk/subtitleedit/online', '_blank', 'noopener,noreferrer')
  trackEvent('subtitle_editor_external_open', {
    event_category: 'editor',
    event_label: 'open_new_tab'
  })
}

// 重试加载
const retryLoad = () => {
  loadError.value = false
  isLoading.value = true
  if (iframeRef.value) {
    iframeRef.value.src = 'https://www.nikse.dk/subtitleedit/online'
  }
}

onMounted(() => {
  trackEvent('subtitle_editor_view', {
    event_category: 'page_view',
    event_label: 'editor_page_mounted'
  })
})
</script>

<template>
  <!-- 编辑器容器 - 全屏显示 -->
  <div class="relative bg-white dark:bg-gray-950 overflow-hidden h-[calc(100vh-4rem)]">
    <!-- 顶部工具栏 -->
    <div class="absolute top-0 right-0 z-20 p-3">
      <button
        @click="openInNewTab"
        class="px-3 py-1.5 text-xs font-medium bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm
               text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-900
               rounded-md border border-gray-300 dark:border-gray-700 transition-colors
               flex items-center space-x-1.5 shadow-sm"
      >
        <ExternalLink :size="14" />
        <span>新标签页打开</span>
      </button>
    </div>

    <!-- 加载指示器 -->
    <div
      v-if="isLoading"
      class="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-950 z-10"
    >
      <div class="text-center">
        <Loader2 :size="48" class="mx-auto text-primary-600 dark:text-primary-dark-500 animate-spin mb-4" />
        <p class="text-gray-600 dark:text-gray-400">正在加载字幕编辑器...</p>
      </div>
    </div>

    <!-- 错误提示 -->
    <div
      v-if="loadError"
      class="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-950 z-10"
    >
      <div class="text-center max-w-md p-8">
        <AlertCircle :size="48" class="mx-auto text-red-500 mb-4" />
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
          无法加载编辑器
        </h3>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          编辑器可能因为浏览器安全策略无法在此处显示。您可以尝试重新加载或在新标签页中打开。
        </p>
        <div class="flex justify-center space-x-3">
          <button
            @click="retryLoad"
            class="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300
                   rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
          >
            重新加载
          </button>
          <button
            @click="openInNewTab"
            class="px-4 py-2 bg-primary-600 dark:bg-primary-dark-500 text-white
                   rounded-lg hover:bg-primary-700 dark:hover:bg-primary-dark-600
                   transition-colors flex items-center space-x-2"
          >
            <ExternalLink :size="16" />
            <span>在新标签页打开</span>
          </button>
        </div>
      </div>
    </div>

    <!-- iframe 编辑器 - 全屏 -->
    <iframe
      ref="iframeRef"
      src="https://www.nikse.dk/subtitleedit/online"
      @load="handleIframeLoad"
      @error="handleIframeError"
      class="w-full h-full border-0"
      :class="{ 'invisible': isLoading || loadError }"
      sandbox="allow-scripts allow-same-origin allow-forms allow-downloads allow-popups"
      allow="clipboard-read; clipboard-write"
      loading="lazy"
      title="Subtitle Edit Online Editor"
    />
  </div>
</template>

<style scoped>
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
