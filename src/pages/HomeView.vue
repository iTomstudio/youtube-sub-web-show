<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Subtitle, SubtitleData } from '@/types/subtitle'
import SubtitleItem from '@/components/SubtitleItem.vue'
import { Upload } from 'lucide-vue-next'
import { useAnalytics } from '@/composables/useAnalytics'

const {
  trackSubtitleUpload,
  trackSubtitleClear,
  trackColumnToggle,
  trackMobileViewSwitch,
  trackException,
} = useAnalytics()

const subtitles = ref<Subtitle[]>([])
const subtitleData = ref<SubtitleData | null>(null)
const activeIndex = ref<number | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)
const mobileView = ref<'furigana' | 'text' | 'translated'>('furigana')
const fileName = ref<string>('')

const furiganaColumn = ref<HTMLElement | null>(null)
const textColumn = ref<HTMLElement | null>(null)
const translatedColumn = ref<HTMLElement | null>(null)

let isScrolling = false
let scrollTimer: number | null = null

// 遮盖状态
const hideFurigana = ref(false)
const hideTranslation = ref(false)

// sessionStorage 键名（切换路由会保留）
const STORAGE_KEY = 'subtitle-data'
const NAVIGATION_FLAG_KEY = 'subtitle-navigation-flag'

// 从 sessionStorage 加载字幕数据
const loadFromStorage = () => {
  try {
    // 检查是否是从导航返回的（而不是刷新）
    const isNavigation = sessionStorage.getItem(NAVIGATION_FLAG_KEY) === 'true'

    if (isNavigation) {
      const saved = sessionStorage.getItem(STORAGE_KEY)
      if (saved) {
        const data = JSON.parse(saved) as SubtitleData
        subtitleData.value = data
        subtitles.value = data.subtitles
        console.log('从缓存加载了', data.totalEntries, '条字幕')
      }
    } else {
      // 如果不是导航返回（即刷新或首次访问），清除数据
      console.log('检测到刷新或首次访问，清除缓存数据')
      sessionStorage.removeItem(STORAGE_KEY)
    }

    // 重置导航标记
    sessionStorage.removeItem(NAVIGATION_FLAG_KEY)
  } catch (error) {
    console.error('加载缓存失败:', error)
  }
}

// 保存到 sessionStorage
const saveToStorage = (data: SubtitleData) => {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (error) {
    console.error('保存缓存失败:', error)
  }
}

// 文件上传处理
const handleFileUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return

  // 保存文件名
  fileName.value = file.name

  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target?.result as string) as SubtitleData
      subtitleData.value = data
      subtitles.value = data.subtitles
      activeIndex.value = null

      // 保存到 sessionStorage
      saveToStorage(data)

      // 追踪上传事件
      trackSubtitleUpload(file.name, data.subtitles.length)
    } catch (error) {
      alert('JSON 文件格式错误，请检查文件内容')
      console.error('解析JSON失败:', error)
      // 追踪异常
      trackException('Failed to parse subtitle file', false)
    }
  }
  reader.readAsText(file)
}

// 清除字幕
const clearSubtitles = () => {
  if (confirm('确定要清除当前字幕吗？')) {
    subtitles.value = []
    subtitleData.value = null
    activeIndex.value = null
    if (fileInput.value) {
      fileInput.value.value = ''
    }

    // 同时清除 sessionStorage
    sessionStorage.removeItem(STORAGE_KEY)

    // 追踪清除事件
    trackSubtitleClear()
  }
}

// 同步滚动处理（优化版 - 添加节流）
const throttleDelay = 16 // 约60fps，提供流畅体验

const handleScroll = (source: 'furigana' | 'text' | 'translated') => {
  if (isScrolling) return

  // 节流：如果定时器存在，说明正在处理中，跳过
  if (scrollTimer !== null) return

  scrollTimer = window.setTimeout(() => {
    scrollTimer = null
  }, throttleDelay)

  isScrolling = true

  const sourceEl =
    source === 'furigana'
      ? furiganaColumn.value
      : source === 'text'
      ? textColumn.value
      : translatedColumn.value

  const scrollTop = sourceEl?.scrollTop || 0

  // 立即同步scrollTop到其他列（不包裹在requestAnimationFrame中）
  if (source !== 'furigana' && furiganaColumn.value) {
    furiganaColumn.value.scrollTop = scrollTop
  }
  if (source !== 'text' && textColumn.value) {
    textColumn.value.scrollTop = scrollTop
  }
  if (source !== 'translated' && translatedColumn.value) {
    translatedColumn.value.scrollTop = scrollTop
  }

  // 使用 requestAnimationFrame 仅用于解锁
  requestAnimationFrame(() => {
    isScrolling = false
  })
}

// 设置激活字幕
const setActive = (index: number) => {
  activeIndex.value = index
}

// 触发文件选择
const triggerFileUpload = () => {
  fileInput.value?.click()
}

// 组件挂载时从 sessionStorage 加载数据
onMounted(() => {
  loadFromStorage()
})
</script>

<template>
  <div class="space-y-3 pb-8">
    <!-- 空状态：上传区叠加在三列预览上 -->
    <div v-if="!subtitles.length" class="relative min-h-[70vh]">
      <!-- 背景：三列预览（模糊半透明） -->
      <div class="absolute inset-0 pointer-events-none opacity-50 blur-xs">
        <div class="hidden desktop:grid desktop:grid-cols-3 gap-4">
          <!-- 左栏：假名注音预览 -->
          <div class="bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div class="bg-primary-100 dark:bg-primary-dark-100 px-4 py-3 border-b border-gray-200 dark:border-gray-800">
              <h3 class="text-sm font-bold text-primary-800 dark:text-primary-dark-800">假名注音</h3>
            </div>
            <div class="p-4 space-y-3">
              <div v-for="i in 3" :key="`demo-furigana-${i}`" class="h-[120px] border-b border-gray-200 dark:border-gray-800 p-4">
                <div class="text-xs text-gray-400 mb-2">#{{ i }} · 00:00:00,000</div>
                <div class="text-base text-gray-600 dark:text-gray-400">よし、終わり！</div>
              </div>
            </div>
          </div>

          <!-- 中栏：日语原文预览 -->
          <div class="bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div class="bg-primary-100 dark:bg-primary-dark-100 px-4 py-3 border-b border-gray-200 dark:border-gray-800">
              <h3 class="text-sm font-bold text-primary-800 dark:text-primary-dark-800">日语原文</h3>
            </div>
            <div class="p-4 space-y-3">
              <div v-for="i in 3" :key="`demo-text-${i}`" class="h-[120px] border-b border-gray-200 dark:border-gray-800 p-4">
                <div class="text-xs text-gray-400 mb-2">#{{ i }} · 00:00:00,000</div>
                <div class="text-base text-gray-600 dark:text-gray-400">よし、終わり！</div>
              </div>
            </div>
          </div>

          <!-- 右栏：中文翻译预览 -->
          <div class="bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div class="bg-primary-100 dark:bg-primary-dark-100 px-4 py-3 border-b border-gray-200 dark:border-gray-800">
              <h3 class="text-sm font-bold text-primary-800 dark:text-primary-dark-800">中文翻译</h3>
            </div>
            <div class="p-4 space-y-3">
              <div v-for="i in 3" :key="`demo-trans-${i}`" class="h-[120px] border-b border-gray-200 dark:border-gray-800 p-4">
                <div class="text-xs text-gray-400 mb-2">#{{ i }} · 00:00:00,000</div>
                <div class="text-base text-gray-600 dark:text-gray-400">好了，结束了！</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 前景：上传区域（清晰、可交互） -->
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="text-center p-12 bg-white/95 dark:bg-gray-950/95 backdrop-blur-md border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl max-w-md hover:border-primary-600 dark:hover:border-primary-dark-500 transition-colors shadow-2xl">
          <input
            type="file"
            ref="fileInput"
            accept=".json,application/json"
            @change="handleFileUpload"
            class="hidden"
          />
          <div class="mb-6">
            <Upload :size="48" class="mx-auto text-gray-400 dark:text-gray-600" />
          </div>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            上传字幕文件
          </h2>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            支持 JSON 格式的字幕文件<br />
            包含日语原文、假名注音和中文翻译
          </p>
          <button
            @click="triggerFileUpload"
            class="btn-primary inline-flex items-center space-x-2"
          >
            <Upload :size="20" />
            <span>选择文件</span>
          </button>
        </div>
      </div>
    </div>

    <!-- 字幕展示区 -->
    <div v-else class="space-y-2">
      <!-- 控制栏 -->
      <div class="flex items-center justify-between px-3 py-2 bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800">
        <div class="flex items-center space-x-4">
          <div>
            <span class="text-sm font-bold text-gray-900 dark:text-white">
              {{ subtitleData?.totalEntries || 0 }} 条字幕
            </span>
            <span class="text-xs text-gray-500 dark:text-gray-400 ml-2">
              {{ subtitleData?.exportedAt ? new Date(subtitleData.exportedAt).toLocaleString('zh-CN') : '' }}
            </span>
          </div>

          <!-- 遮盖功能按钮 -->
          <div class="hidden desktop:flex items-center space-x-2">
            <button
              @click="() => { hideFurigana = !hideFurigana; trackColumnToggle('furigana', !hideFurigana) }"
              :class="[
                'px-3 py-1 text-xs font-medium rounded transition-colors',
                hideFurigana
                  ? 'bg-primary-600 text-white dark:bg-primary-dark-500'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              ]"
            >
              {{ hideFurigana ? '显示假名' : '隐藏假名' }}
            </button>
            <button
              @click="() => { hideTranslation = !hideTranslation; trackColumnToggle('translation', !hideTranslation) }"
              :class="[
                'px-3 py-1 text-xs font-medium rounded transition-colors',
                hideTranslation
                  ? 'bg-primary-600 text-white dark:bg-primary-dark-500'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              ]"
            >
              {{ hideTranslation ? '显示翻译' : '隐藏翻译' }}
            </button>
          </div>
        </div>

        <button
          @click="clearSubtitles"
          class="px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
        >
          清除字幕
        </button>
      </div>

      <!-- 桌面端：三栏布局 -->
      <div class="hidden desktop:grid desktop:grid-cols-3 gap-4 relative">
        <!-- 左栏：带假名注音 -->
        <div class="bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden relative">
          <!-- 遮盖层 -->
          <div
            v-if="hideFurigana"
            class="absolute inset-0 bg-gray-900/90 dark:bg-gray-950/90 backdrop-blur-sm z-20 flex items-center justify-center"
          >
            <p class="text-white text-sm font-medium">假名已隐藏</p>
          </div>
          <div
            ref="furiganaColumn"
            @scroll="handleScroll('furigana')"
            class="subtitle-column h-[calc(100vh-12rem)] overflow-y-auto"
          >
            <div class="sticky top-0 bg-primary-100 dark:bg-primary-dark-100 px-4 py-3 border-b border-gray-200 dark:border-gray-800 z-10">
              <h3 class="text-sm font-bold text-primary-800 dark:text-primary-dark-800">假名注音</h3>
            </div>
            <SubtitleItem
              v-for="sub in subtitles"
              :key="`furigana-${sub.index}`"
              :subtitle="sub"
              :active="activeIndex === sub.index"
              display-mode="furigana"
              @click="setActive(sub.index)"
            />
          </div>
        </div>

        <!-- 中栏：纯日语 -->
        <div class="bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div
            ref="textColumn"
            @scroll="handleScroll('text')"
            class="subtitle-column h-[calc(100vh-12rem)] overflow-y-auto"
          >
            <div class="sticky top-0 bg-primary-100 dark:bg-primary-dark-100 px-4 py-3 border-b border-gray-200 dark:border-gray-800 z-10">
              <h3 class="text-sm font-bold text-primary-800 dark:text-primary-dark-800">日语原文</h3>
            </div>
            <SubtitleItem
              v-for="sub in subtitles"
              :key="`text-${sub.index}`"
              :subtitle="sub"
              :active="activeIndex === sub.index"
              display-mode="text"
              @click="setActive(sub.index)"
            />
          </div>
        </div>

        <!-- 右栏：中文翻译 -->
        <div class="bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden relative">
          <!-- 遮盖层 -->
          <div
            v-if="hideTranslation"
            class="absolute inset-0 bg-gray-900/90 dark:bg-gray-950/90 backdrop-blur-sm z-20 flex items-center justify-center"
          >
            <p class="text-white text-sm font-medium">翻译已隐藏</p>
          </div>
          <div
            ref="translatedColumn"
            @scroll="handleScroll('translated')"
            class="subtitle-column h-[calc(100vh-12rem)] overflow-y-auto"
          >
            <div class="sticky top-0 bg-primary-100 dark:bg-primary-dark-100 px-4 py-3 border-b border-gray-200 dark:border-gray-800 z-10">
              <h3 class="text-sm font-bold text-primary-800 dark:text-primary-dark-800">中文翻译</h3>
            </div>
            <SubtitleItem
              v-for="sub in subtitles"
              :key="`translated-${sub.index}`"
              :subtitle="sub"
              :active="activeIndex === sub.index"
              display-mode="translated"
              @click="setActive(sub.index)"
            />
          </div>
        </div>
      </div>

      <!-- 移动端：单栏可切换 -->
      <div class="desktop:hidden space-y-4">
        <!-- 切换按钮 -->
        <div class="flex justify-center space-x-2">
          <button
            @click="() => { mobileView = 'furigana'; trackMobileViewSwitch('furigana') }"
            :class="[
              'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
              mobileView === 'furigana'
                ? 'bg-primary-600 text-white dark:bg-primary-dark-500'
                : 'bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
            ]"
          >
            假名注音
          </button>
          <button
            @click="() => { mobileView = 'text'; trackMobileViewSwitch('text') }"
            :class="[
              'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
              mobileView === 'text'
                ? 'bg-primary-600 text-white dark:bg-primary-dark-500'
                : 'bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
            ]"
          >
            纯日语
          </button>
          <button
            @click="() => { mobileView = 'translated'; trackMobileViewSwitch('translated') }"
            :class="[
              'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
              mobileView === 'translated'
                ? 'bg-primary-600 text-white dark:bg-primary-dark-500'
                : 'bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
            ]"
          >
            中文翻译
          </button>
        </div>

        <!-- 字幕列表 -->
        <div class="bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div class="sticky top-16 bg-primary-100 dark:bg-primary-dark-100 px-4 py-3 border-b border-gray-200 dark:border-gray-800 z-10">
            <h3 class="text-sm font-bold text-primary-800 dark:text-primary-dark-800">
              {{
                mobileView === 'furigana'
                  ? '假名注音'
                  : mobileView === 'text'
                  ? '日语原文'
                  : '中文翻译'
              }}
            </h3>
          </div>
          <div class="subtitle-column h-[calc(100vh-20rem)] overflow-y-auto">
            <SubtitleItem
              v-for="sub in subtitles"
              :key="`mobile-${sub.index}`"
              :subtitle="sub"
              :active="activeIndex === sub.index"
              :display-mode="mobileView"
              @click="setActive(sub.index)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 字幕列滚动条样式 */
.subtitle-column {
  /* 移除 scroll-behavior: smooth; 以避免与JS同步冲突 */
}

.subtitle-column::-webkit-scrollbar {
  width: 8px;
}

.subtitle-column::-webkit-scrollbar-track {
  @apply bg-gray-100 dark:bg-gray-800;
}

.subtitle-column::-webkit-scrollbar-thumb {
  @apply bg-gray-300 dark:bg-gray-600 rounded-full;
}

.subtitle-column::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-400 dark:bg-gray-500;
}

/* 背景预览模糊效果 */
.blur-xs {
  filter: blur(2px);
}

/* 前景上传区域阴影 */
.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* 玻璃态效果 */
.backdrop-blur-md {
  backdrop-filter: blur(12px);
}
</style>
