import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'
import { useTheme } from './composables/useTheme'
import { analyticsService } from './services/analytics'

const { initTheme } = useTheme()
initTheme()

const app = createApp(App)

// 初始化 Google Analytics 4
const measurementId = import.meta.env.VITE_GA4_MEASUREMENT_ID as string
const debugMode = import.meta.env.DEV

// 先挂载应用，确保 DOM 已准备好
app.use(router)
app.mount('#app')

// 然后初始化 Analytics（异步，不阻塞应用启动）
if (measurementId) {
  analyticsService.initialize({
    measurementId,
    enabled: true,
    debugMode,
    anonymizeIp: true,
  }).catch((error) => {
    console.error('Failed to initialize GA4:', error)
  })
}
