<script setup lang="ts">
import { ref } from 'vue'
import { TrendingUp, TrendingDown, Users, Eye } from 'lucide-vue-next'

interface DashboardMetric {
  label: string
  value: string
  change: number
  trend: 'up' | 'down'
  icon: any
}

const metrics = ref<DashboardMetric[]>([
  {
    label: '总订阅者',
    value: '25.4K',
    change: 12.5,
    trend: 'up',
    icon: Users
  },
  {
    label: '总浏览量',
    value: '1.2M',
    change: 8.2,
    trend: 'up',
    icon: Eye
  },
  {
    label: '增长率',
    value: '5.3%',
    change: -2.1,
    trend: 'down',
    icon: TrendingUp
  }
])
</script>

<template>
  <div class="space-y-8">
    <!-- 页面标题 -->
    <section>
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">
        仪表板
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        监控您的 YouTube 频道表现和增长指标。
      </p>
    </section>

    <!-- 指标网格 -->
    <section class="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-6">
      <div
        v-for="metric in metrics"
        :key="metric.label"
        class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow"
      >
        <div class="flex items-start justify-between">
          <div>
            <p class="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2">
              {{ metric.label }}
            </p>
            <h3 class="text-3xl font-bold text-gray-900 dark:text-white">
              {{ metric.value }}
            </h3>
          </div>
          <div
            :class="[
              'w-12 h-12 rounded-lg flex items-center justify-center',
              metric.trend === 'up'
                ? 'bg-green-100 dark:bg-green-900'
                : 'bg-red-100 dark:bg-red-900'
            ]"
          >
            <TrendingUp
              v-if="metric.trend === 'up'"
              class="text-green-600 dark:text-green-400"
              :size="24"
            />
            <TrendingDown
              v-else
              class="text-red-600 dark:text-red-400"
              :size="24"
            />
          </div>
        </div>
        <p
          :class="[
            'mt-4 text-sm font-medium',
            metric.trend === 'up'
              ? 'text-green-600 dark:text-green-400'
              : 'text-red-600 dark:text-red-400'
          ]"
        >
          <span>{{ metric.trend === 'up' ? '↑' : '↓' }}</span>
          {{ Math.abs(metric.change) }}% 较上月
        </p>
      </div>
    </section>

    <!-- 图表区域 -->
    <section class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        浏览量分析
      </h2>
      <div class="bg-gray-50 dark:bg-gray-800 rounded-lg h-64 flex items-center justify-center">
        <p class="text-gray-600 dark:text-gray-400">
          图表占位符 - 在此连接您的分析后端
        </p>
      </div>
    </section>

    <!-- 最近活动 -->
    <section class="grid grid-cols-1 tablet:grid-cols-2 gap-6">
      <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
          最近上传
        </h3>
        <div class="space-y-4">
          <div class="pb-4 border-b border-gray-200 dark:border-gray-800 last:border-0">
            <p class="font-medium text-gray-900 dark:text-white">视频标题</p>
            <p class="text-sm text-gray-600 dark:text-gray-400">2天前</p>
          </div>
          <div class="pb-4 border-b border-gray-200 dark:border-gray-800 last:border-0">
            <p class="font-medium text-gray-900 dark:text-white">另一个视频</p>
            <p class="text-sm text-gray-600 dark:text-gray-400">5天前</p>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
          表现最佳的视频
        </h3>
        <div class="space-y-4">
          <div class="pb-4 border-b border-gray-200 dark:border-gray-800 last:border-0">
            <p class="font-medium text-gray-900 dark:text-white">热门视频 #1</p>
            <p class="text-sm text-gray-600 dark:text-gray-400">250K 浏览量</p>
          </div>
          <div class="pb-4 border-b border-gray-200 dark:border-gray-800 last:border-0">
            <p class="font-medium text-gray-900 dark:text-white">热门视频 #2</p>
            <p class="text-sm text-gray-600 dark:text-gray-400">180K 浏览量</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* 仪表板样式 */
</style>
