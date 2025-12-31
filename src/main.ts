import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'
import { useTheme } from './composables/useTheme'

const { initTheme } = useTheme()
initTheme()

const app = createApp(App)

app.use(router)
app.mount('#app')
