<script setup lang="ts">
import { ref } from 'vue'
import { Search, BookOpen, BookMarked, MessageCircle } from 'lucide-vue-next'
import { useScrollPosition } from '@/composables/useScrollPosition'

// 保存和恢复滚动位置
useScrollPosition()

interface Service {
  id: number
  title: string
  description: string
  features: string[]
  icon: any
}

interface ContactMethod {
  type: 'wechat' | 'qq'
  qrCode: string
  label: string
  hint: string
  accountId?: string
}

const services = ref<Service[]>([
  {
    id: 1,
    title: '日语资源代查服务',
    description: '专业为您查找和整理各类日语学习资源，让学习之路更加顺畅。',
    features: [
      '专业查找各类日语学习资源',
      '涵盖教材、视频、音频等多种格式',
      '根据您的学习水平推荐合适资源',
      '快速响应，通常24小时内交付',
      '提供资源使用指导和学习建议'
    ],
    icon: Search
  },
  {
    id: 2,
    title: '电子书查找服务',
    description: '拥有海量电子书资源库，助您轻松获取所需书籍。',
    features: [
      '海量中日文电子书库',
      '支持多种格式（PDF、EPUB、MOBI）',
      '包含学术、文学、专业书籍',
      '提供资源整理和分类服务',
      '可根据需求定制书单推荐'
    ],
    icon: BookMarked
  }
])

const contactMethods = ref<ContactMethod[]>([
  {
    type: 'wechat',
    qrCode: '/qr-codes/wechat-qr.png',
    label: '微信联系',
    hint: '扫码添加微信',
    accountId: ''
  },
  {
    type: 'qq',
    qrCode: '/qr-codes/qq-qr.png',
    label: 'QQ联系',
    hint: '扫码添加QQ',
    accountId: ''
  }
])

const handleImageError = (e: Event) => {
  const img = e.target as HTMLImageElement
  img.style.display = 'none'
  const parent = img.parentElement
  if (parent) {
    const placeholder = document.createElement('div')
    placeholder.className = 'w-48 h-48 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 dark:text-gray-500'
    placeholder.innerHTML = '<span class="text-sm">二维码占位符</span>'
    parent.appendChild(placeholder)
  }
}
</script>

<template>
  <div class="space-y-12">
    <!-- 页面标题 -->
    <section>
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">
        定制服务
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        为您提供专业的日语学习资源查找和电子书定制服务。
      </p>
    </section>

    <!-- 服务介绍 -->
    <section>
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        我们的服务
      </h2>
      <div class="grid grid-cols-1 tablet:grid-cols-2 gap-6">
        <div
          v-for="service in services"
          :key="service.id"
          class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow"
        >
          <!-- 服务图标和标题 -->
          <div class="flex items-start gap-4 mb-4">
            <div class="flex-shrink-0 w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-dark-900 flex items-center justify-center">
              <component
                :is="service.icon"
                class="text-primary-600 dark:text-primary-dark-500"
                :size="24"
              />
            </div>
            <div>
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {{ service.title }}
              </h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm">
                {{ service.description }}
              </p>
            </div>
          </div>

          <!-- 服务特点 -->
          <ul class="space-y-2">
            <li
              v-for="(feature, index) in service.features"
              :key="index"
              class="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-400"
            >
              <span class="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-green-600 dark:text-green-400 text-xs font-bold mt-0.5">
                ✓
              </span>
              <span>{{ feature }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 服务说明 -->
    <section class="bg-gradient-to-r from-primary-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 border border-primary-200 dark:border-gray-700 rounded-lg p-6">
      <div class="flex items-start gap-3">
        <BookOpen class="text-primary-600 dark:text-primary-dark-500 flex-shrink-0 mt-1" :size="24" />
        <div>
          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">
            为什么选择我们的定制服务？
          </h3>
          <div class="text-gray-600 dark:text-gray-400 space-y-2">
            <p>
              我们深知每位日语学习者的需求都是独特的。无论您是初学者还是高级学习者，
              我们都能为您提供最合适的学习资源。
            </p>
            <p>
              多年的资源积累和专业的查找经验，让我们能够快速准确地找到您需要的材料。
              省去您大量搜索时间，让学习更加高效。
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 联系方式 -->
    <section>
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        联系我们
      </h2>
      <p class="text-gray-600 dark:text-gray-400 mb-8">
        扫描下方二维码添加我的微信或QQ，告诉我您的需求，我会尽快为您服务。
      </p>

      <div class="grid grid-cols-1 tablet:grid-cols-2 gap-8">
        <div
          v-for="contact in contactMethods"
          :key="contact.type"
          class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-8 hover:shadow-lg transition-shadow"
        >
          <div class="flex flex-col items-center text-center">
            <!-- 图标 -->
            <div class="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-dark-900 flex items-center justify-center mb-4">
              <MessageCircle
                class="text-primary-600 dark:text-primary-dark-500"
                :size="32"
              />
            </div>

            <!-- 标题 -->
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {{ contact.label }}
            </h3>

            <!-- 提示文字 -->
            <p class="text-gray-600 dark:text-gray-400 mb-6">
              {{ contact.hint }}
            </p>

            <!-- 二维码 -->
            <div class="bg-white dark:bg-gray-800 p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 mb-4">
              <img
                :src="contact.qrCode"
                :alt="contact.label"
                class="w-48 h-48 object-contain"
                @error="handleImageError"
              />
            </div>

            <!-- 账号ID（如果有） -->
            <p
              v-if="contact.accountId"
              class="text-sm text-gray-500 dark:text-gray-400 font-mono"
            >
              {{ contact.type === 'wechat' ? '微信号' : 'QQ号' }}: {{ contact.accountId }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 服务流程 -->
    <section class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        服务流程
      </h2>
      <div class="grid grid-cols-1 tablet:grid-cols-4 gap-6">
        <div class="text-center">
          <div class="w-12 h-12 rounded-full bg-primary-600 dark:bg-primary-dark-500 text-white font-bold text-xl flex items-center justify-center mx-auto mb-3">
            1
          </div>
          <h4 class="font-semibold text-gray-900 dark:text-white mb-2">添加联系方式</h4>
          <p class="text-sm text-gray-600 dark:text-gray-400">扫码添加微信或QQ</p>
        </div>
        <div class="text-center">
          <div class="w-12 h-12 rounded-full bg-primary-600 dark:bg-primary-dark-500 text-white font-bold text-xl flex items-center justify-center mx-auto mb-3">
            2
          </div>
          <h4 class="font-semibold text-gray-900 dark:text-white mb-2">描述需求</h4>
          <p class="text-sm text-gray-600 dark:text-gray-400">告诉我您需要的资源</p>
        </div>
        <div class="text-center">
          <div class="w-12 h-12 rounded-full bg-primary-600 dark:bg-primary-dark-500 text-white font-bold text-xl flex items-center justify-center mx-auto mb-3">
            3
          </div>
          <h4 class="font-semibold text-gray-900 dark:text-white mb-2">查找资源</h4>
          <p class="text-sm text-gray-600 dark:text-gray-400">快速为您查找整理</p>
        </div>
        <div class="text-center">
          <div class="w-12 h-12 rounded-full bg-primary-600 dark:bg-primary-dark-500 text-white font-bold text-xl flex items-center justify-center mx-auto mb-3">
            4
          </div>
          <h4 class="font-semibold text-gray-900 dark:text-white mb-2">交付资源</h4>
          <p class="text-sm text-gray-600 dark:text-gray-400">发送资源链接给您</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* 定制服务页面样式 */
</style>
