<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Sun, Moon, Monitor, ChevronDown } from 'lucide-vue-next'
import { useTheme, type ThemeMode } from '@/composables/useTheme'

const { themeMode, setThemeMode, actualTheme } = useTheme()
const isOpen = ref(false)
const menuRef = ref<HTMLElement | null>(null)

const themeOptions = [
  { value: 'light' as ThemeMode, label: '亮色', icon: Sun },
  { value: 'dark' as ThemeMode, label: '暗色', icon: Moon },
  { value: 'system' as ThemeMode, label: '跟随系统', icon: Monitor },
]

const currentOption = computed(() =>
  themeOptions.find(opt => opt.value === themeMode.value)
)

const currentIcon = computed(() => {
  if (themeMode.value === 'system') {
    return actualTheme.value === 'dark' ? Moon : Sun
  }
  return currentOption.value?.icon
})

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectTheme = (mode: ThemeMode) => {
  setThemeMode(mode)
  isOpen.value = false
}

const handleClickOutside = (event: MouseEvent) => {
  if (menuRef.value && !menuRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="relative" ref="menuRef">
    <button
      @click="toggleDropdown"
      class="theme-toggle-btn flex items-center space-x-1"
      :aria-label="`当前主题: ${currentOption?.label}`"
      :aria-expanded="isOpen"
    >
      <component :is="currentIcon" :size="20" />
      <ChevronDown
        :size="16"
        class="transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
      />
    </button>

    <Transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="absolute right-0 mt-2 w-40 rounded-lg shadow-lg
               bg-white dark:bg-gray-900
               border border-gray-200 dark:border-gray-700
               ring-1 ring-black ring-opacity-5
               z-50"
      >
        <div class="py-1" role="menu">
          <button
            v-for="option in themeOptions"
            :key="option.value"
            @click="selectTheme(option.value)"
            class="w-full flex items-center space-x-3 px-4 py-2 text-sm
                   transition-colors
                   hover:bg-gray-100 dark:hover:bg-gray-800"
            :class="{
              'text-primary-600 dark:text-primary-dark-500 bg-primary-50 dark:bg-primary-dark-50':
                themeMode === option.value,
              'text-gray-700 dark:text-gray-300':
                themeMode !== option.value
            }"
            role="menuitem"
          >
            <component :is="option.icon" :size="18" />
            <span>{{ option.label }}</span>
            <span v-if="themeMode === option.value" class="ml-auto">✓</span>
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>
