<script setup lang="ts">
import { ref } from 'vue'
import { ExternalLink } from 'lucide-vue-next'

interface VideoExample {
  id: number
  title: string
  thumbnail: string
  description: string
  tags: string[]
  baiduLink: string
  quarkLink: string
}

const examples = ref<VideoExample[]>([
  {
    id: 1,
    title: '【Day 240】作为朋友代表在婚礼上的讲话vlog',
    thumbnail: '/examples/day240.jpg',
    description: '参加朋友婚礼，作为代表致辞的完整记录',
    tags: ['N5', 'N4', 'N3', 'N2', '在日生活', '赴日留学', '生活方式', '当地文化'],
    baiduLink: 'https://pan.baidu.com/s/example240',
    quarkLink: 'https://pan.quark.cn/s/example240'
  },
  {
    id: 2,
    title: '【Day 239】关于日本如何过圣诞节',
    thumbnail: '/examples/day239.jpg',
    description: '探索日本独特的圣诞节庆祝方式',
    tags: ['N5', 'N4', 'N3', 'N2', 'N1', '在日生活', '赴日留学', '生活方式', '当地文化'],
    baiduLink: 'https://pan.baidu.com/s/example239',
    quarkLink: 'https://pan.quark.cn/s/example239'
  },
  {
    id: 3,
    title: '【Day 238】边走边学，玩转浅草！',
    thumbnail: '/examples/day238.jpg',
    description: '浅草寺及周边地区深度游览',
    tags: ['N5', 'N4', 'N3', '在日生活', '赴日留学', '生活方式', '当地文化'],
    baiduLink: 'https://pan.baidu.com/s/example238',
    quarkLink: 'https://pan.quark.cn/s/example238'
  },
  {
    id: 4,
    title: '【Day 237】之大阪一人游草津温泉，预算17万日元极限打卡',
    thumbnail: '/examples/day237.jpg',
    description: '一个人的温泉之旅，详细预算分享',
    tags: ['N5', 'N4', 'N3', '在日生活', '赴日旅游', '生活方式', '当地文化'],
    baiduLink: 'https://pan.baidu.com/s/example237',
    quarkLink: 'https://pan.quark.cn/s/example237'
  },
  {
    id: 5,
    title: '【Day 236】接纳内心的庞杂大物，人便能付诸行动',
    thumbnail: '/examples/day236.jpg',
    description: '探讨个人成长与行动力的关系',
    tags: ['N5', 'N4', 'N3', 'N2', 'N1', '在日生活', '文化探趣', '生活方式', '成长', '方言'],
    baiduLink: 'https://pan.baidu.com/s/example236',
    quarkLink: 'https://pan.quark.cn/s/example236'
  },
  {
    id: 6,
    title: '【Day 235】2025冬季最佳购入☆近期爱用品分享',
    thumbnail: '/examples/day235.jpg',
    description: '冬季推荐好物分享与购物心得',
    tags: ['N5', 'N4', 'N3', 'N2', '在日生活', '赴日留学', '生活方式', '家居'],
    baiduLink: 'https://pan.baidu.com/s/example235',
    quarkLink: 'https://pan.quark.cn/s/example235'
  },
  {
    id: 7,
    title: '【Day 234】日本职场文化深度解析',
    thumbnail: '/examples/day234.jpg',
    description: '了解日本公司的工作环境和职场礼仪',
    tags: ['N4', 'N3', 'N2', 'N1', '在日生活', '职场文化', '生活方式'],
    baiduLink: 'https://pan.baidu.com/s/example234',
    quarkLink: 'https://pan.quark.cn/s/example234'
  },
  {
    id: 8,
    title: '【Day 233】东京美食探店之旅',
    thumbnail: '/examples/day233.jpg',
    description: '带你品尝东京最地道的美食',
    tags: ['N5', 'N4', 'N3', '在日生活', '美食', '生活方式', '当地文化'],
    baiduLink: 'https://pan.baidu.com/s/example233',
    quarkLink: 'https://pan.quark.cn/s/example233'
  }
])
</script>

<template>
  <div class="space-y-8">
    <!-- 页面标题 -->
    <section>
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">
        免费示例
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        精选日语学习视频示例，配有完整字幕。点击下载按钮获取资源。
      </p>
    </section>

    <!-- 视频示例网格 -->
    <section class="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4 gap-6">
      <div
        v-for="example in examples"
        :key="example.id"
        class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
      >
        <!-- 视频封面 -->
        <div class="aspect-video bg-gradient-to-br from-primary-100 to-primary-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
          <img
            v-if="example.thumbnail"
            :src="example.thumbnail"
            :alt="example.title"
            class="w-full h-full object-cover"
            @error="(e) => (e.target as HTMLImageElement).style.display = 'none'"
          />
          <div v-else class="text-gray-400 dark:text-gray-600 text-center p-4">
            <ExternalLink :size="48" class="mx-auto mb-2" />
            <p class="text-sm">视频封面</p>
          </div>
        </div>

        <!-- 卡片内容 -->
        <div class="p-6">
          <!-- 标题 -->
          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
            {{ example.title }}
          </h3>

          <!-- 描述 -->
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
            {{ example.description }}
          </p>

          <!-- 标签 -->
          <div class="flex flex-wrap gap-2 mb-4">
            <span
              v-for="(tag, index) in example.tags"
              :key="index"
              :class="[
                'px-2 py-1 text-xs font-medium rounded-md',
                tag.startsWith('N') && /^N[1-5]$/.test(tag)
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                  : 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300'
              ]"
            >
              {{ tag }}
            </span>
          </div>

          <!-- 下载链接 -->
          <div class="space-y-2 text-sm">
            <div class="flex items-start gap-2">
              <span class="text-gray-600 dark:text-gray-400 flex-shrink-0 font-medium">百度网盘:</span>
              <a
                :href="example.baiduLink"
                target="_blank"
                rel="noopener noreferrer"
                class="text-blue-600 dark:text-blue-400 hover:underline break-all"
              >
                {{ example.baiduLink }}
              </a>
            </div>
            <div class="flex items-start gap-2">
              <span class="text-gray-600 dark:text-gray-400 flex-shrink-0 font-medium">夸克网盘:</span>
              <a
                :href="example.quarkLink"
                target="_blank"
                rel="noopener noreferrer"
                class="text-purple-600 dark:text-purple-400 hover:underline break-all"
              >
                {{ example.quarkLink }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 提示信息 -->
    <section class="bg-primary-50 dark:bg-gray-900 border border-primary-200 dark:border-gray-800 rounded-lg p-6">
      <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
        使用说明
      </h2>
      <ul class="space-y-2 text-gray-600 dark:text-gray-400">
        <li class="flex items-start space-x-2">
          <span class="text-primary-600 dark:text-primary-dark-500 font-bold">•</span>
          <span>所有视频均配有完整的中日双语字幕</span>
        </li>
        <li class="flex items-start space-x-2">
          <span class="text-primary-600 dark:text-primary-dark-500 font-bold">•</span>
          <span>标签中的 N1-N5 代表日语能力考试等级，数字越小难度越高</span>
        </li>
        <li class="flex items-start space-x-2">
          <span class="text-primary-600 dark:text-primary-dark-500 font-bold">•</span>
          <span>资源完全免费，无需注册或付费</span>
        </li>
        <li class="flex items-start space-x-2">
          <span class="text-primary-600 dark:text-primary-dark-500 font-bold">•</span>
          <span>如需更多学习资源或定制服务，请访问「定制服务」页面</span>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
/* 免费示例页面样式 */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
