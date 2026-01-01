<script setup lang="ts">
import { ref } from 'vue'
import { ExternalLink } from 'lucide-vue-next'
import { useScrollPosition } from '@/composables/useScrollPosition'

// 保存和恢复滚动位置
useScrollPosition()

interface VideoExample {
  id: number
  title: string
  thumbnail: string
  description: string
  tags: string[]
  feishuLink: string
  quarkLink: string
}

const examples = ref<VideoExample[]>([
  {
    id: 1,
    title: '[Ted演讲] 小岛豆腐屋创业记👩‍🌾+: 从15岁骑手到未来设计师🌟 5epBxpAL6P0',
    thumbnail: '/examples/5epBxpAL6P0.jpg',
    description: '今天带大家认识一位来自日本小岛的豆腐屋老板，山下贤太。他在15岁那年成为了一名骑手，经历了许多挫折后，最终决定回到家乡创业。他如何从一个运动员转型成一个豆腐屋老板？又有哪些不为人知的故事？一起来了解他的创业经历和生活哲学吧！👨‍🍳🌟。从他的故事中，你会发现，失败并不是终点，而是通往未来的起点💡。快来一起感受这位小岛青年的成长之路吧！💪',
    tags: ['N2', '创业故事', '小岛生活', '梦想实现', '传统美食'],
    feishuLink: 'https://fcnnebqvmjct.feishu.cn/wiki/S3BBwa47eiecBMktKBacEuoJnPf',
    quarkLink: 'https://pan.quark.cn/s/978bed565f70'
  },
  {
    id: 2,
    title: '[ゆうか] 【草津】1万円で尽くす草津温泉美食大冒险🍜鲭鱼 aL7lIL6nIVg',
    thumbnail: '/examples/aL7lIL6nIVg.jpg',
    description: '优香来到群马县的草津温泉，用1万円预算尽情探索美食！从汤畑到温泉蛋、甘酒，再到牡蛎天和草津汉堡，每一道美食都让人回味无穷。她还体验了温泉足浴、射的和浴衣租赁，感受不一样的温泉风情。这不仅是一场美食之旅，更是一次身心放松的旅行记。快来一起跟随优香的脚步，享受草津温泉的魅力吧！🌞🍜鲭鱼',
    tags: ['N3', '草津温泉', '美食博主', '旅行记', '当地文化'],
    feishuLink: 'https://fcnnebqvmjct.feishu.cn/wiki/XaNIwmK8HilMbukieYrcgu9MnAi',
    quarkLink: 'https://pan.quark.cn/s/bae1906dfd60'
  },
  {
    id: 3,
    title: '[あかね] 宫城Vlog🍵くりこま高原駅体验新干线美食&Cafe探店✨ bQMl5rm2Xqc',
    thumbnail: '/examples/bQMl5rm2Xqc.jpg',
    description: '今天带大家来到日本宫城的栗原市，感受这里的独特魅力。首先，我们体验了一次新干线的旅行，从东京到栗原只需2小时左右，乘坐特快列车还能欣赏沿途风景。接着，我们来到一家当地很有特色的咖啡店，品尝了各种美味的意大利面和蛋糕。店内装饰非常可爱，还有很多手工艺品，非常适合拍照打卡📸。最后，我们还参观了一处古色古香的景点，感受日本传统的茶道文化🍵。快来一起看看吧！',
    tags: ['N3', '新干线', '宫城', 'Vlog', '日本美食'],
    feishuLink: 'https://fcnnebqvmjct.feishu.cn/wiki/YoK6wkpMEi4LuikHcRYcvc3Vn0e',
    quarkLink: 'https://pan.quark.cn/s/1db0f337d6bf'
  },
  {
    id: 4,
    title: '[福良美恵] 中日友情见证💖结亲友婚礼现场亲历者感言✨ d0nBBU7aF2g',
    thumbnail: '/examples/d0nBBU7aF2g.jpg',
    description: '今天是亲友美恵见证中日友谊的美好时刻💖。她作为新娘的好友，亲历了这场充满感动与温馨的婚礼。从婚礼筹备到现场感言，美恵分享了与好友从小学到大学的点滴回忆，以及她在婚礼上的感人演讲。不仅有婚礼现场的精彩瞬间📸，还有美恵与好友的温馨互动💕。这不仅是一场婚礼，更是一次珍贵的友情见证。快来一起感受这份美好吧！✨',
    tags: ['N2', '婚礼现场', '婚礼感言', '幸福瞬间', '中日友情'],
    feishuLink: 'https://fcnnebqvmjct.feishu.cn/wiki/Lmzywm8Eei3YS3k5hxTcwSWAnGf',
    quarkLink: 'https://pan.quark.cn/s/4f3228c36676'
  },
  {
    id: 5,
    title: '[小宵こなん] 日本偶像对谈分享会🎤✨ 跨界合作背后的秘密 HNq9aD7kiFY',
    thumbnail: '/examples/HNq9aD7kiFY.jpg',
    description: '今天带来一段日本偶像对谈分享会，COCO和神山みれい两位偶像畅聊幕后故事和跨界合作经历。从初次见面到一起工作，分享了许多有趣的细节和真实的感受。节目中还讨论了如何喝酒不醉、团队合作以及个人魅力等话题。快来一起看看这两位偶像的精彩对话吧！🎤✨',
    tags: ['N2', '偶像对谈', '艺人访谈', '幕后故事', '神山みれい', 'COCO'],
    feishuLink: 'https://fcnnebqvmjct.feishu.cn/wiki/Fa7BwnwUTir5XpkUPLVc4TXenRf',
    quarkLink: 'https://pan.quark.cn/s/b7c08431cfd2'
  },
  {
    id: 6,
    title: '[みゆ] 日本2025年流行语大赏🏆 神预测挑战游戏🧩 IQ6LlLBNa1I',
    thumbnail: '/examples/IQ6LlLBNa1I.jpg',
    description: '今天带大家了解2025年日本的流行语大赏🏆。从神秘的「リカバリーウェア」到有趣的「エッホエッホ」，每一条都充满了日本生活的智慧和趣味。我们将一起玩一个神预测挑战游戏🧩，猜猜这些流行语背后的真实含义，看看谁能准确预测出流行语大赏的最终结果。快来一起参与吧！不仅如此，我们还会介绍一些有趣的日本方言和文化现象，让你对日本的生活有更多的了解。👀快来点击观看，一起感受日本文化的魅力吧！🌟',
    tags: ['N3', '2025流行语', '流行语解析', '神预测', '拉布布'],
    feishuLink: 'https://fcnnebqvmjct.feishu.cn/wiki/N68TwNpyLiZVdNk9Pk7c9xcUnqg',
    quarkLink: 'https://pan.quark.cn/s/94939e71c68d'
  },
  {
    id: 7,
    title: '[ゆうか] 日本猫岛cation猫多到爆💦200只猫迎接我！ TqVvMPLF4vc',
    thumbnail: '/examples/TqVvMPLF4vc.jpg',
    description: '今天带大家去日本福冈县的相岛，这里被誉为猫岛，有200多只猫，比岛上的居民还要多！我乘坐渡轮来到岛上，遇到了一群可爱又亲人的小猫咪，它们甚至主动扑过来要吃我带去的猫粮。不仅如此，岛上还有美味的刺身和新鲜的海鲜，我甚至骑上了电动滑板车环岛一周。这里不仅风景美，还有很多有趣的猫猫故事，快来一起看看吧！📸🐾❤️',
    tags: ['N3', '猫岛生活', '猫岛风情', '一个人的旅行'],
    feishuLink: 'https://fcnnebqvmjct.feishu.cn/wiki/VgCmwQwJmiEe7ZkiQ3tcjQwVn4e',
    quarkLink: 'https://pan.quark.cn/s/1aba99371b3b'
  },
  {
    id: 8,
    title: '[けんさん] 宝妈宝妈👶带着宝宝第一次飞日本✈️全家团聚之旅 #161  ve13HzU_xM8',
    thumbnail: '/examples/ve13HzU_xM8.jpg',
    description: '今天Ken老师带着他的妻子和刚刚五个月大的宝宝一起飞往日本✈️！他详细讲述了这次旅行的准备过程，从收拾行李🧳到机场遇到的挑战，再到宝宝第一次乘坐飞机的趣事。还有更多关于日本生活的实用信息，比如如何在日本机场买汉堡🍔，以及为什么这次旅行让他如此期待😊。观看视频，了解Ken老师如何带着全家一起享受这次特别的家庭团聚之旅！👩‍👧‍👦💕',
    tags: ['N5', '全家旅行', '空港趣事', '宝妈带娃', '日本生活'],
    feishuLink: 'https://fcnnebqvmjct.feishu.cn/wiki/HUa1wUAGwinKdbkPkjwcFfDcnmc',
    quarkLink: 'https://pan.quark.cn/s/11ee6d4a3667'
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
              <span class="text-gray-600 dark:text-gray-400 flex-shrink-0 font-medium">飞书文档:</span>
              <a
                :href="example.feishuLink"
                target="_blank"
                rel="noopener noreferrer"
                class="text-blue-600 dark:text-blue-400 hover:underline break-all"
              >
                {{ example.feishuLink }}
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
          <span>本页资源作为例子完全免费，无需注册或付费</span>
        </li>
        <li class="flex items-start space-x-2">
          <span class="text-primary-600 dark:text-primary-dark-500 font-bold">•</span>
          <span>如需更多学习资源，请关注微信公众号：橘子外语学习</span>
        </li>
        <li class="flex items-start space-x-2">
          <span class="text-primary-600 dark:text-primary-dark-500 font-bold">•</span>
          <span>定制服务，请访问「定制服务」页面</span>
        </li>
      </ul>
    </section>

    <!-- 文件介绍 -->
    <section class="bg-blue-50 dark:bg-gray-900 border border-blue-200 dark:border-gray-800 rounded-lg p-6">
      <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <span class="text-2xl">💡</span>
        <span>文件介绍</span>
      </h2>
      <ul class="space-y-3 text-gray-600 dark:text-gray-400">
        <li class="flex items-start space-x-3">
          <span class="text-blue-600 dark:text-blue-400 font-bold text-lg">•</span>
          <div>
            <span class="font-semibold text-gray-900 dark:text-white">学习日语：</span>
            <span class="ml-1">使用 <code class="px-2 py-0.5 bg-gray-200 dark:bg-gray-800 rounded text-sm">_jp_cn.srt</code>（双语）或 <code class="px-2 py-0.5 bg-gray-200 dark:bg-gray-800 rounded text-sm">_txt.txt</code>（纯文本对照）</span>
          </div>
        </li>
        <li class="flex items-start space-x-3">
          <span class="text-blue-600 dark:text-blue-400 font-bold text-lg">•</span>
          <div>
            <span class="font-semibold text-gray-900 dark:text-white">视频字幕：</span>
            <span class="ml-1">使用 <code class="px-2 py-0.5 bg-gray-200 dark:bg-gray-800 rounded text-sm">_jp.srt</code> 或 <code class="px-2 py-0.5 bg-gray-200 dark:bg-gray-800 rounded text-sm">_cn.srt</code>，日语字幕 和 中文字幕</span>
          </div>
        </li>
        <li class="flex items-start space-x-3">
          <span class="text-blue-600 dark:text-blue-400 font-bold text-lg">•</span>
          <div>
            <span class="font-semibold text-gray-900 dark:text-white">页面导入：</span>
            <span class="ml-1">使用 <code class="px-2 py-0.5 bg-gray-200 dark:bg-gray-800 rounded text-sm">_complete.json</code> 导入到【<a href="https://juzi.zeabur.app/" target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 hover:underline">橘子外语学习网站</a>】中</span>
          </div>
        </li>
        <li class="flex items-start space-x-3">
          <span class="text-blue-600 dark:text-blue-400 font-bold text-lg">•</span>
          <div>
            <span class="font-semibold text-gray-900 dark:text-white">快速预览：</span>
            <span class="ml-1">使用 <code class="px-2 py-0.5 bg-gray-200 dark:bg-gray-800 rounded text-sm">.txt</code> 查看视频基本信息</span>
          </div>
        </li>
      </ul>
      <div class="mt-4 pt-4 border-t border-blue-200 dark:border-gray-700">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          如果有问题，请联系 QQ：1443183233
        </p>
      </div>
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
