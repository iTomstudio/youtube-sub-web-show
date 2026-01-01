<script setup lang="ts">
import { computed } from 'vue'
import type { Subtitle } from '@/types/subtitle'

interface Props {
  subtitle: Subtitle
  active?: boolean
  displayMode: 'furigana' | 'text' | 'translated'
}

const props = withDefaults(defineProps<Props>(), {
  active: false
})

const emit = defineEmits<{
  click: []
}>()

const displayText = computed(() => {
  switch (props.displayMode) {
    case 'furigana':
      return props.subtitle.furiganaText
    case 'text':
      return props.subtitle.text
    case 'translated':
      return props.subtitle.translatedText
  }
})

const formattedTime = computed(() => {
  // 完整时间格式：00:00:06,020 → 00:00:11,440
  return `${props.subtitle.startTime} → ${props.subtitle.endTime}`
})
</script>

<template>
  <div
    :class="[
      'subtitle-item',
      'p-4 border-b border-gray-200 dark:border-gray-800',
      'transition-all duration-200 cursor-pointer',
      'hover:bg-gray-50 dark:hover:bg-gray-900',
      'h-[120px] flex flex-col',
      active
        ? 'bg-primary-50 dark:bg-primary-dark-50 border-l-4 border-l-primary-600 dark:border-l-primary-dark-500'
        : ''
    ]"
    :data-active="active"
    :data-subtitle-index="subtitle.index"
    @click="emit('click')"
  >
    <!-- 序号和时间戳 -->
    <div class="flex items-center justify-between mb-2 text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">
      <span class="font-mono font-semibold">#{{ subtitle.index }}</span>
      <span class="font-mono">{{ formattedTime }}</span>
    </div>

    <!-- 字幕文本 -->
    <div class="flex-1 flex items-start overflow-hidden">
      <div
        v-if="displayMode === 'furigana'"
        v-html="displayText"
        class="text-base leading-loose w-full overflow-y-auto subtitle-text-scroll"
        :class="active ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-700 dark:text-gray-300'"
      />
      <div
        v-else
        class="text-base leading-relaxed w-full overflow-y-auto subtitle-text-scroll"
        :class="active ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-700 dark:text-gray-300'"
      >
        {{ displayText }}
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Ruby 注音样式 */
:deep(ruby) {
  ruby-position: over;
  line-height: 2.2;
}

:deep(rt) {
  font-size: 0.55em;
  color: rgb(107 114 128); /* gray-500 */
  font-weight: normal;
  line-height: 1;
}

.dark :deep(rt) {
  color: rgb(156 163 175); /* gray-400 */
}

/* 激活状态下的注音颜色 */
.subtitle-item[data-active="true"] :deep(rt) {
  color: #E67E00; /* primary-600 */
}

.dark .subtitle-item[data-active="true"] :deep(rt) {
  color: #FFB380; /* primary-dark-500 */
}

/* 字幕文本滚动条样式 */
.subtitle-text-scroll::-webkit-scrollbar {
  width: 4px;
}

.subtitle-text-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.subtitle-text-scroll::-webkit-scrollbar-thumb {
  background: rgba(156, 163, 175, 0.4); /* gray-400 with opacity */
  border-radius: 2px;
}

.subtitle-text-scroll::-webkit-scrollbar-thumb:hover {
  background: rgba(156, 163, 175, 0.6);
}

.dark .subtitle-text-scroll::-webkit-scrollbar-thumb {
  background: rgba(107, 114, 128, 0.4); /* gray-500 with opacity */
}

.dark .subtitle-text-scroll::-webkit-scrollbar-thumb:hover {
  background: rgba(107, 114, 128, 0.6);
}
</style>
