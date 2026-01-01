import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { analyticsService } from '@/services/analytics'
import HomeView from '@/pages/HomeView.vue'
import SubtitleEditorView from '@/pages/SubtitleEditorView.vue'
import AboutView from '@/pages/AboutView.vue'
import DashboardView from '@/pages/DashboardView.vue'
import FreeExamplesView from '@/pages/FreeExamplesView.vue'
import CustomServicesView from '@/pages/CustomServicesView.vue'
import NotFoundView from '@/pages/NotFoundView.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: '橘子外语学习'
    }
  },
  {
    path: '/nikse',
    name: 'nikse',
    component: SubtitleEditorView,
    meta: {
      title: '精听工具 - YouTube Sub Web Show',
      fullScreen: true,
      keepAlive: true
    }
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    meta: {
      title: '关于 - YouTube Sub Web Show'
    }
  },
  {
    path: '/examples',
    name: 'examples',
    component: FreeExamplesView,
    meta: {
      title: '免费示例 - 橘子外语学习'
    }
  },
  {
    path: '/services',
    name: 'services',
    component: CustomServicesView,
    meta: {
      title: '定制服务 - 橘子外语学习'
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta: {
      title: '仪表板 - YouTube Sub Web Show'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView,
    meta: {
      title: '页面未找到 - YouTube Sub Web Show'
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach((to, _from, next) => {
  // 更新文档标题
  const title = (to.meta.title as string) || 'YouTube Sub Web Show'
  document.title = title

  // 追踪页面浏览
  if (analyticsService.isReady()) {
    analyticsService.trackPageView(to.path, title)
  }

  next()
})

export default router
