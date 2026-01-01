<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Search, BookOpen, BookMarked, MessageCircle, Tv, Download, Play, FileText, CheckCircle, Zap, Users, Heart } from 'lucide-vue-next'
import { useScrollPosition } from '@/composables/useScrollPosition'

// 保存和恢复滚动位置
useScrollPosition()

// Scroll to contact section
const scrollToContact = () => {
  const contactSection = document.getElementById('contact-section')
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

// Get gradient colors for each service card
const getServiceGradient = (id: number) => {
  const gradients = [
    'from-primary-400 via-primary-500 to-orange-400 dark:from-primary-dark-400 dark:via-primary-dark-500 dark:to-orange-500', // 日剧服务
    'from-blue-400 via-cyan-500 to-teal-400 dark:from-blue-600 dark:via-cyan-600 dark:to-teal-600', // 电子书
    'from-purple-400 via-pink-500 to-rose-400 dark:from-purple-600 dark:via-pink-600 dark:to-rose-600', // 爬虫
    'from-green-400 via-emerald-500 to-teal-400 dark:from-green-600 dark:via-emerald-600 dark:to-teal-600' // 编程
  ]
  return gradients[id - 1] || gradients[0]
}

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
    title: '日剧资源定制服务',
    description: '从查找到字幕，一站式日剧学习资源解决方案，让您的日语学习更加高效便捷。',
    features: [
      '精准查找各类日剧、综艺、电影资源',
      '提供代下载服务，省去您的搜索时间',
      '专业添加双语字幕，支持学习对照',
      '字幕翻译服务，确保准确性和流畅度',
      '根据您的需求定制资源内容和格式'
    ],
    icon: Tv
  },
  {
    id: 2,
    title: '电子书查找服务',
    description: '海量电子书资源库，涵盖各类学术、文学、专业书籍，助您轻松获取所需知识。',
    features: [
      '全网搜索，海量中日文电子书资源',
      '支持多种格式（PDF、EPUB、MOBI等）',
      '涵盖学术、文学、专业、学习等各类书籍',
      '提供资源整理和分类服务',
      '可根据需求定制书单推荐'
    ],
    icon: BookMarked
  },
  {
    id: 3,
    title: '数据爬虫服务',
    description: '专业的网络数据采集方案，帮助您高效获取所需信息，节省大量人工时间。',
    features: [
      '定制化数据采集方案，满足各类需求',
      '支持多种网站和数据格式抓取',
      '自动化数据清洗和整理',
      '定期更新和维护爬虫程序',
      '提供数据分析和可视化支持'
    ],
    icon: Download
  },
  {
    id: 4,
    title: '编程技术咨询',
    description: '解决您的编程难题，用自动化工具优化工作流程，让重复性工作变得简单高效。',
    features: [
      '各类编程问题解答和技术指导',
      '自动化脚本开发，减轻重复性工作',
      '工作流程优化和效率提升方案',
      '定制化小工具和应用程序开发',
      '代码审查和性能优化建议'
    ],
    icon: FileText
  }
])

const contactMethods = ref<ContactMethod[]>([
  {
    type: 'wechat',
    qrCode: '/qr-codes/wechat-qr.jpg',
    label: '微信联系',
    hint: '扫码添加微信咨询',
    accountId: ''
  },
  {
    type: 'qq',
    qrCode: '/qr-codes/qq-qr.jpg',
    label: 'QQ联系',
    hint: '扫码添加QQ咨询',
    accountId: ''
  },
  {
    type: 'wechat',
    qrCode: '/qr-codes/wechat-official-qr.jpg',
    label: '微信公众号',
    hint: '关注公众号获取更多资源',
    accountId: ''
  },
  {
    type: 'qq',
    qrCode: '/qr-codes/qq-group-qr.jpg',
    label: 'QQ交流群',
    hint: '加入QQ群交流学习',
    accountId: ''
  }
])

// Example resources showcase (placeholder for user-provided images)
interface ExampleResource {
  id: number
  title: string
  imageUrl?: string // Image URL for the resource screenshot
  icon: any
  type: 'drama' | 'book'
}

const exampleResources = ref<ExampleResource[]>([
  {
    id: 1,
    title: 'TVer 日剧资源',
    icon: Tv,
    type: 'drama',
    imageUrl: '/examples/tver-screenshot.jpg' // TODO: 添加 TVer 截图
  },
  {
    id: 2,
    title: 'Hulu 日剧资源',
    icon: Play,
    type: 'drama',
    imageUrl: '/examples/hulu-screenshot.jpg' // TODO: 添加 Hulu 截图
  },
  {
    id: 3,
    title: 'U-NEXT 综合资源',
    icon: BookOpen,
    type: 'drama',
    imageUrl: '/examples/unext-screenshot.jpg' // TODO: 添加 U-NEXT 截图
  },
  {
    id: 4,
    title: 'TBS 节目资源',
    icon: BookMarked,
    type: 'drama',
    imageUrl: '/examples/tbs-screenshot.jpg' // TODO: 添加 TBS 截图
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

// Image lightbox functionality
const selectedImage = ref<string | null>(null)
const selectedImageTitle = ref<string>('')

const openImageLightbox = (imageUrl: string, title: string) => {
  selectedImage.value = imageUrl
  selectedImageTitle.value = title
  // Prevent body scroll when lightbox is open
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  selectedImage.value = null
  selectedImageTitle.value = ''
  // Restore body scroll
  document.body.style.overflow = ''
}

// Keyboard event handler for ESC key
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && selectedImage.value) {
    closeLightbox()
  }
}

// Add keyboard listener when component mounts
onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

// Remove keyboard listener when component unmounts
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  // Ensure body scroll is restored if component unmounts while lightbox is open
  document.body.style.overflow = ''
})
</script>

<template>
  <div class="space-y-0">
    <!-- 1. HERO SECTION -->
    <section class="relative bg-gradient-to-br from-primary-600 via-primary-500 to-orange-500 dark:from-primary-dark-600 dark:via-primary-dark-500 dark:to-orange-600 text-white py-20 tablet:py-32 overflow-hidden">
      <!-- Decorative floating icons -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <Tv class="absolute top-20 left-10 tablet:left-20" :size="48" />
        <BookOpen class="absolute top-40 right-16 tablet:right-32" :size="40" />
        <Download class="absolute bottom-32 left-1/4" :size="36" />
        <Play class="absolute bottom-20 right-1/4" :size="44" />
        <BookMarked class="absolute top-1/3 right-12" :size="32" />
      </div>

      <!-- Main content -->
      <div class="container-responsive relative z-10">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-5xl tablet:text-6xl font-bold mb-6 leading-tight">
            定制服务
          </h1>
          <p class="text-xl tablet:text-2xl mb-4 leading-relaxed text-white/90">
            您的专属日语学习资源管家
          </p>
          <p class="text-lg tablet:text-xl mb-10 leading-relaxed text-white/80 max-w-2xl mx-auto">
            提供日剧资源、电子书查找、数据爬虫、编程技术等专业定制服务
          </p>
          <button
            @click="scrollToContact"
            class="inline-flex items-center gap-2 bg-white text-primary-600 dark:text-primary-dark-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            立即咨询
            <MessageCircle :size="24" />
          </button>
        </div>
      </div>
    </section>

    <!-- 2. SERVICE CARDS SECTION -->
    <section class="py-16 tablet:py-24">
      <div class="container-responsive">
        <h2 class="text-3xl tablet:text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center">
          我们的服务
        </h2>
        <p class="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
          从日剧资源到技术开发，提供全方位的定制化服务，让学习和工作更加高效
        </p>
        <div class="grid grid-cols-1 tablet:grid-cols-2 gap-8">
          <div
            v-for="service in services"
            :key="service.id"
            class="group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 border border-gray-200 dark:border-gray-800"
          >
            <!-- Visual Header (placeholder for user images) -->
            <!-- TODO: Replace gradient with actual image when available -->
            <div class="relative h-48 bg-gradient-to-br overflow-hidden" :class="getServiceGradient(service.id)">
              <!-- Large centered icon -->
              <div class="absolute inset-0 flex items-center justify-center">
                <component
                  :is="service.icon"
                  class="text-white opacity-90"
                  :size="64"
                />
              </div>

              <!-- Category badge -->
              <div class="absolute top-4 right-4 px-3 py-1 bg-orange-500 dark:bg-orange-600 text-white text-sm rounded-full font-medium shadow-lg">
                热门服务
              </div>

              <!-- Gradient overlay for depth -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            <!-- Content Area -->
            <div class="p-8">
              <!-- Title -->
              <h3 class="text-2xl tablet:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                {{ service.title }}
              </h3>

              <!-- Description -->
              <p class="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                {{ service.description }}
              </p>

              <!-- Feature list -->
              <ul class="space-y-3 mb-6">
                <li
                  v-for="(feature, index) in service.features"
                  :key="index"
                  class="flex items-start space-x-3 text-gray-600 dark:text-gray-400"
                >
                  <span class="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-green-600 dark:text-green-400 text-xs font-bold mt-0.5">
                    ✓
                  </span>
                  <span class="leading-relaxed">{{ feature }}</span>
                </li>
              </ul>

              <!-- CTA button -->
              <button
                @click="scrollToContact"
                class="w-full py-3 px-6 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-primary-100 dark:hover:bg-primary-dark-900 hover:text-primary-700 dark:hover:text-primary-dark-400 transition-colors duration-300"
              >
                了解更多
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. EXAMPLE SHOWCASE SECTION (Placeholders) -->
    <section class="py-16 tablet:py-20 bg-gray-50 dark:bg-gray-950">
      <div class="container-responsive">
        <h2 class="text-3xl tablet:text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center">
          我们能为您找到的资源
        </h2>
        <p class="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
          日剧、综艺、电影、学习材料等丰富资源，只需告诉我们您的需求
        </p>

        <!-- Example resource grid - Larger images, 2 columns on desktop -->
        <div class="grid grid-cols-1 tablet:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div
            v-for="resource in exampleResources"
            :key="resource.id"
            class="group relative rounded-xl overflow-hidden hover:scale-[1.02] transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl"
            @click="resource.imageUrl && openImageLightbox(resource.imageUrl, resource.title)"
          >
            <!-- Display image if available, otherwise show gradient placeholder -->
            <div class="aspect-video relative overflow-hidden bg-gray-900">
              <!-- Actual image (when provided) -->
              <img
                v-if="resource.imageUrl"
                :src="resource.imageUrl"
                :alt="resource.title"
                class="w-full h-full object-cover"
                @error="(e) => (e.target as HTMLImageElement).style.display = 'none'"
              />

              <!-- Gradient placeholder (fallback or when no image) -->
              <div
                v-if="!resource.imageUrl"
                class="absolute inset-0 bg-gradient-to-br from-primary-400 to-orange-500 dark:from-primary-dark-500 dark:to-orange-600 flex items-center justify-center"
              >
                <!-- Icon -->
                <component
                  :is="resource.icon"
                  class="text-white opacity-80"
                  :size="80"
                />
              </div>

              <!-- Overlay on hover with zoom icon hint -->
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                <div v-if="resource.imageUrl" class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 dark:bg-gray-800/90 rounded-full p-4">
                  <Search :size="32" class="text-gray-900 dark:text-white" />
                </div>
              </div>
            </div>

            <!-- Title -->
            <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
              <p class="text-white font-bold text-lg">{{ resource.title }}</p>
              <p v-if="resource.imageUrl" class="text-white/70 text-sm mt-1">点击查看大图</p>
            </div>
          </div>
        </div>

        <!-- Note about examples -->
        <p class="text-center text-gray-500 dark:text-gray-500 mt-8 text-sm">
          以上为日本主流视频平台示例，更多资源示例即将上线
        </p>
      </div>
    </section>

    <!-- 4. WHY CHOOSE US SECTION (Enhanced) -->
    <section class="py-16 tablet:py-24">
      <div class="container-responsive">
        <h2 class="text-3xl tablet:text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center">
          为什么选择我们？
        </h2>
        <p class="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          我们深知每位日语学习者的需求都是独特的。专业的资源积累和查找经验，让我们能够快速准确地找到您需要的材料。
        </p>

        <!-- Feature grid -->
        <div class="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-8">
          <!-- Feature 1: Fast Response -->
          <div class="text-center">
            <div class="w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-orange-500 dark:from-primary-dark-500 dark:to-orange-600 flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Zap class="text-white" :size="40" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
              快速响应
            </h3>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
              24小时内快速响应，高效为您查找所需资源
            </p>
          </div>

          <!-- Feature 2: Professional Experience -->
          <div class="text-center">
            <div class="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 dark:from-blue-600 dark:to-cyan-600 flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Users class="text-white" :size="40" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
              专业经验
            </h3>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
              多年资源积累，深入了解各类日语学习材料
            </p>
          </div>

          <!-- Feature 3: Rich Resources -->
          <div class="text-center">
            <div class="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-lg">
              <BookOpen class="text-white" :size="40" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
              资源丰富
            </h3>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
              海量日剧、电子书、学习资料库任您选择
            </p>
          </div>

          <!-- Feature 4: Personalized Service -->
          <div class="text-center tablet:col-span-2 desktop:col-span-3">
            <div class="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600 flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Heart class="text-white" :size="40" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
              个性化服务
            </h3>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">
              根据您的学习水平和需求，提供定制化的资源推荐和学习建议
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. SERVICE PROCESS SECTION (Enhanced) -->
    <section class="py-16 tablet:py-20 bg-white dark:bg-gray-900">
      <div class="container-responsive">
        <h2 class="text-3xl tablet:text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center">
          服务流程
        </h2>
        <p class="text-center text-gray-600 dark:text-gray-400 mb-16 max-w-2xl mx-auto">
          简单四步，轻松获取您需要的日语学习资源
        </p>

        <!-- Process steps with connecting line -->
        <div class="relative max-w-5xl mx-auto">
          <!-- Connecting line (hidden on mobile) -->
          <div class="absolute top-10 left-0 right-0 h-1 bg-gradient-to-r from-primary-300 via-orange-300 to-primary-300 dark:from-primary-dark-700 dark:via-orange-700 dark:to-primary-dark-700 hidden tablet:block" style="left: 10%; right: 10%;"></div>

          <!-- Steps grid -->
          <div class="relative grid grid-cols-1 tablet:grid-cols-4 gap-8 tablet:gap-6">
            <!-- Step 1 -->
            <div class="text-center">
              <div class="relative w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-orange-500 dark:from-primary-dark-500 dark:to-orange-600 text-white font-bold text-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <MessageCircle :size="32" class="absolute" />
              </div>
              <h4 class="font-bold text-lg text-gray-900 dark:text-white mb-2">添加联系方式</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">扫码添加微信或QQ</p>
            </div>

            <!-- Step 2 -->
            <div class="text-center">
              <div class="relative w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-orange-500 dark:from-primary-dark-500 dark:to-orange-600 text-white font-bold text-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <FileText :size="32" class="absolute" />
              </div>
              <h4 class="font-bold text-lg text-gray-900 dark:text-white mb-2">描述需求</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">告诉我您需要的资源</p>
            </div>

            <!-- Step 3 -->
            <div class="text-center">
              <div class="relative w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-orange-500 dark:from-primary-dark-500 dark:to-orange-600 text-white font-bold text-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Search :size="32" class="absolute" />
              </div>
              <h4 class="font-bold text-lg text-gray-900 dark:text-white mb-2">查找资源</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">快速为您查找整理</p>
            </div>

            <!-- Step 4 -->
            <div class="text-center">
              <div class="relative w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-orange-500 dark:from-primary-dark-500 dark:to-orange-600 text-white font-bold text-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <CheckCircle :size="32" class="absolute" />
              </div>
              <h4 class="font-bold text-lg text-gray-900 dark:text-white mb-2">交付资源</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">发送资源链接给您</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. CONTACT SECTION (Redesigned with gradient & persuasive copy) -->
    <section id="contact-section" class="py-16 tablet:py-24 bg-gradient-to-br from-primary-500 via-orange-500 to-primary-600 dark:from-primary-dark-600 dark:via-orange-600 dark:to-primary-dark-700 text-white">
      <div class="container-responsive">
        <!-- Headline -->
        <div class="text-center mb-12">
          <h2 class="text-4xl tablet:text-5xl font-bold mb-4">
            准备好开始了吗？
          </h2>
          <p class="text-xl tablet:text-2xl mb-6 text-white/90 leading-relaxed">
            立即联系我们，享受专业的日语学习资源查找服务
          </p>

          <!-- Trust indicators -->
          <div class="flex flex-wrap justify-center gap-6 mb-8">
            <div class="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <Zap :size="20" class="text-white" />
              <span class="font-medium">24小时内响应</span>
            </div>
            <div class="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <Users :size="20" class="text-white" />
              <span class="font-medium">专业经验</span>
            </div>
            <div class="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <Heart :size="20" class="text-white" />
              <span class="font-medium">个性化服务</span>
            </div>
          </div>
        </div>

        <!-- QR Codes -->
        <div class="grid grid-cols-1 tablet:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div
            v-for="contact in contactMethods"
            :key="contact.type"
            class="bg-white dark:bg-gray-900 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <div class="flex flex-col items-center text-center">
              <!-- Icon -->
              <div class="w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-orange-500 dark:from-primary-dark-500 dark:to-orange-600 flex items-center justify-center mb-6 shadow-lg">
                <MessageCircle
                  class="text-white"
                  :size="40"
                />
              </div>

              <!-- Title -->
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {{ contact.label }}
              </h3>

              <!-- Hint text -->
              <p class="text-gray-600 dark:text-gray-400 mb-6">
                {{ contact.hint }}
              </p>

              <!-- QR Code with decorative border -->
              <div
                class="relative bg-white dark:bg-gray-800 p-6 rounded-xl border-4 border-primary-200 dark:border-primary-dark-700 mb-4 shadow-md cursor-pointer hover:border-primary-400 dark:hover:border-primary-dark-500 transition-all duration-300 hover:shadow-lg group/qr"
                @click.stop="openImageLightbox(contact.qrCode, contact.label)"
              >
                <img
                  :src="contact.qrCode"
                  :alt="contact.label"
                  class="w-48 h-48 object-contain relative z-10"
                  @error="handleImageError"
                />
                <!-- Zoom hint on hover -->
                <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover/qr:opacity-100 transition-opacity duration-300 bg-black/20 rounded-xl">
                  <div class="bg-white/90 dark:bg-gray-800/90 rounded-full p-3">
                    <Search :size="24" class="text-gray-900 dark:text-white" />
                  </div>
                </div>
              </div>

              <!-- Click hint text -->
              <p class="text-gray-500 dark:text-gray-400 text-xs mb-4">点击二维码查看大图</p>

              <!-- Account ID -->
              <p
                v-if="contact.accountId"
                class="text-sm text-gray-500 dark:text-gray-400 font-mono"
              >
                {{ contact.type === 'wechat' ? '微信号' : 'QQ号' }}: {{ contact.accountId }}
              </p>
            </div>
          </div>
        </div>

        <!-- Divider text -->
        <div class="flex items-center justify-center gap-4 my-8">
          <div class="h-px bg-white/30 flex-1 max-w-xs"></div>
          <span class="text-white/80 font-medium">或者</span>
          <div class="h-px bg-white/30 flex-1 max-w-xs"></div>
        </div>

        <!-- Helper text -->
        <div class="text-center max-w-2xl mx-auto">
          <p class="text-white/80 text-lg leading-relaxed mb-4">
            添加后请说明您的需求（想要的日剧、电子书等），我会尽快为您查找并提供资源
          </p>
          <p class="text-white/70 text-base leading-relaxed">
            如果您有任何互联网方面的问题，都欢迎联系我
          </p>
        </div>
      </div>
    </section>

    <!-- Image Lightbox Modal -->
    <Teleport to="body">
      <Transition name="lightbox">
        <div
          v-if="selectedImage"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm"
          @click="closeLightbox"
        >
          <!-- Close button -->
          <button
            class="absolute top-4 right-4 tablet:top-8 tablet:right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-colors duration-300 z-10"
            @click.stop="closeLightbox"
          >
            <span class="text-white text-2xl font-bold">×</span>
          </button>

          <!-- Image container -->
          <div
            class="relative w-auto h-auto max-w-4xl max-h-[85vh]"
            @click.stop
          >
            <!-- Title -->
            <div class="absolute -top-12 left-0 right-0 text-center">
              <p class="text-white text-xl font-bold">{{ selectedImageTitle }}</p>
            </div>

            <!-- Image -->
            <img
              :src="selectedImage"
              :alt="selectedImageTitle"
              class="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-lg shadow-2xl mx-auto"
            />

            <!-- Hint text -->
            <div class="absolute -bottom-12 left-0 right-0 text-center">
              <p class="text-white/60 text-sm">点击图片外区域或按 ESC 键关闭</p>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
/* 定制服务页面样式 */

/* Lightbox transitions */
.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.3s ease;
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}

.lightbox-enter-active img,
.lightbox-leave-active img {
  transition: transform 0.3s ease;
}

.lightbox-enter-from img,
.lightbox-leave-to img {
  transform: scale(0.9);
}
</style>
