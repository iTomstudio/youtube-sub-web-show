import { ref } from 'vue'

export type ThemeMode = 'light' | 'dark' | 'system'

const STORAGE_KEY = 'orange-language-theme'

const themeMode = ref<ThemeMode>('system')
const actualTheme = ref<'light' | 'dark'>('light')

export function useTheme() {
  const getSystemTheme = (): 'light' | 'dark' => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  }

  const applyTheme = (theme: 'light' | 'dark') => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    actualTheme.value = theme
  }

  const updateActualTheme = () => {
    if (themeMode.value === 'system') {
      applyTheme(getSystemTheme())
    } else {
      applyTheme(themeMode.value)
    }
  }

  const setThemeMode = (mode: ThemeMode) => {
    themeMode.value = mode
    localStorage.setItem(STORAGE_KEY, mode)
    updateActualTheme()
  }

  const initTheme = () => {
    const stored = localStorage.getItem(STORAGE_KEY) as ThemeMode | null
    if (stored && ['light', 'dark', 'system'].includes(stored)) {
      themeMode.value = stored
    }

    updateActualTheme()

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      if (themeMode.value === 'system') {
        updateActualTheme()
      }
    }

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
    } else {
      mediaQuery.addListener(handleChange)
    }
  }

  return {
    themeMode,
    actualTheme,
    setThemeMode,
    initTheme,
  }
}
