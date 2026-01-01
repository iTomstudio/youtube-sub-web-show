import { onMounted, onBeforeUnmount, onActivated, onDeactivated, watch } from 'vue'
import { useRoute } from 'vue-router'

// 全局存储滚动位置，在组件外部定义，这样即使组件被销毁，数据也能保留
const globalScrollPositions = new Map<string, number>()

/**
 * 保存和恢复页面滚动位置的组合式函数
 * 适用于 keep-alive 缓存的组件
 */
export function useScrollPosition() {
  const route = useRoute()

  // 保存当前路由的滚动位置
  const saveScrollPosition = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop
    globalScrollPositions.set(route.path, scrollTop)
  }

  // 恢复当前路由的滚动位置
  const restoreScrollPosition = () => {
    const savedPosition = globalScrollPositions.get(route.path)
    if (savedPosition !== undefined) {
      // 使用 requestAnimationFrame 确保 DOM 已经渲染
      requestAnimationFrame(() => {
        window.scrollTo({
          top: savedPosition,
          behavior: 'instant' as ScrollBehavior
        })
      })
    }
  }

  // 监听窗口滚动事件，实时保存位置（带节流）
  onMounted(() => {
    let scrollTimer: number | null = null
    const handleScroll = () => {
      if (scrollTimer !== null) {
        return
      }
      scrollTimer = window.setTimeout(() => {
        saveScrollPosition()
        scrollTimer = null
      }, 100) // 100ms 节流
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    // 清理函数
    onBeforeUnmount(() => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimer !== null) {
        clearTimeout(scrollTimer)
      }
    })
  })

  // 当组件被激活时（从 keep-alive 缓存中恢复）
  onActivated(() => {
    restoreScrollPosition()
  })

  // 当组件被停用时（进入 keep-alive 缓存）
  onDeactivated(() => {
    saveScrollPosition()
  })

  // 组件卸载前保存位置
  onBeforeUnmount(() => {
    saveScrollPosition()
  })

  return {
    saveScrollPosition,
    restoreScrollPosition
  }
}

// 全局存储元素滚动位置的 Map，键为 "路由路径:元素ID"
const globalElementScrollPositions = new Map<string, number>()
let elementIdCounter = 0

/**
 * 保存和恢复元素滚动位置的组合式函数
 * 适用于页面内部的滚动容器
 */
export function useElementScrollPosition(elementRef: { value: HTMLElement | null }) {
  const route = useRoute()
  // 为每个元素生成唯一 ID
  const elementId = `element-${elementIdCounter++}`

  const saveScrollPosition = () => {
    if (elementRef.value) {
      const scrollTop = elementRef.value.scrollTop
      const key = `${route.path}:${elementId}`
      globalElementScrollPositions.set(key, scrollTop)
    }
  }

  const restoreScrollPosition = () => {
    const key = `${route.path}:${elementId}`
    const savedPosition = globalElementScrollPositions.get(key)
    if (savedPosition !== undefined && elementRef.value) {
      requestAnimationFrame(() => {
        if (elementRef.value) {
          elementRef.value.scrollTop = savedPosition
        }
      })
    }
  }

  // 监听元素的滚动事件，实时保存位置（带节流）
  let scrollTimer: number | null = null
  let scrollHandler: (() => void) | null = null
  let isListenerAttached = false

  // 添加滚动监听器的函数
  const attachScrollListener = () => {
    if (isListenerAttached || !elementRef.value) {
      return
    }

    scrollHandler = () => {
      if (scrollTimer !== null) {
        return
      }
      scrollTimer = window.setTimeout(() => {
        saveScrollPosition()
        scrollTimer = null
      }, 100) // 100ms 节流
    }
    elementRef.value.addEventListener('scroll', scrollHandler, { passive: true })
    isListenerAttached = true
  }

  // 监听 elementRef 的变化，当元素出现时添加监听器
  watch(
    () => elementRef.value,
    (newValue) => {
      if (newValue && !isListenerAttached) {
        attachScrollListener()
      }
    },
    { immediate: true }
  )

  onMounted(() => {
    attachScrollListener()
  })

  onBeforeUnmount(() => {
    if (elementRef.value && scrollHandler) {
      elementRef.value.removeEventListener('scroll', scrollHandler)
    }
    if (scrollTimer !== null) {
      clearTimeout(scrollTimer)
    }
  })

  onActivated(() => {
    restoreScrollPosition()
  })

  onDeactivated(() => {
    saveScrollPosition()
  })

  onBeforeUnmount(() => {
    saveScrollPosition()
  })

  return {
    saveScrollPosition,
    restoreScrollPosition
  }
}
