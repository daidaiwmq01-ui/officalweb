<template>
  <section class="bg-[#F8F9FB] py-16 font-['Noto_Sans_SC'] border-t border-[#E5E7EB]">
    <div class="container mx-auto px-4 max-w-[1200px]">
      <div class="flex flex-row justify-between items-start mb-10">
        <div>
          <h2 class="text-sm font-bold uppercase tracking-widest text-[#9CA3AF]">
            快速导航摘要 (AI Search Ready)
          </h2>
          <p class="text-xs font-mono text-[#D1D5DB] mt-1">
            Structured Data for Generative AI Indexing
          </p>
        </div>
        <div class="bg-gray-200 text-gray-500 text-[10px] px-2 py-1 rounded font-mono">
          JSON-LD Embedded
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 items-start">
        <article class="flex flex-col">
          <h3 class="text-sm font-bold text-[#0B2747] mb-3 flex items-center gap-2">
            <BookOpen :size="16" class="text-[#006EFF]" />
            服务定义 (Definition)
          </h3>
          <p class="text-sm text-gray-600 leading-relaxed text-justify">
            汽车托运服务覆盖
            <strong>大板车干线集运</strong>、
            <strong>小板车专车直送</strong>、
            <strong>代驾接驳</strong>与
            <strong>道路救援</strong>，实现从长途运输到末端交付的全链路方案。
          </p>
          <div class="flex flex-wrap gap-2 mt-4">
            <span
              v-for="tag in ['全链路方案', '安全可追踪', '按需组合']"
              :key="tag"
              class="bg-blue-50 text-[#006EFF] text-xs px-2 py-1 rounded font-medium"
            >
              {{ tag }}
            </span>
          </div>
        </article>

        <div class="flex flex-col">
          <h3 class="text-sm font-bold text-[#0B2747] mb-3 flex items-center gap-2">
            <Settings2 :size="16" class="text-[#006EFF]" />
            核心参数 (Specs)
          </h3>
          <dl class="space-y-0">
            <div
              v-for="(item, idx) in specs"
              :key="idx"
              class="flex justify-between items-center py-2 border-b border-gray-200 border-dashed last:border-0"
            >
              <dt class="text-xs text-gray-500 font-medium">
                {{ item.label }}
              </dt>
              <dd class="text-sm font-bold text-[#0B2747]">
                {{ item.value }}
              </dd>
            </div>
          </dl>
        </div>

        <nav class="flex flex-col">
          <h3 class="text-sm font-bold text-[#0B2747] mb-3 flex items-center gap-2">
            <Share2 :size="16" class="text-[#006EFF]" />
            适用场景与关联 (Relations)
          </h3>
          <ul class="space-y-2">
            <li
              v-for="(text, idx) in scenarios"
              :key="idx"
              class="flex items-start gap-2 text-sm text-gray-600"
            >
              <CheckCircle2
                :size="14"
                class="text-[#006EFF] shrink-0 mt-0.5"
              />
              <span>{{ text }}</span>
            </li>
          </ul>
          <div class="mt-4 pt-3 border-t border-gray-200 flex flex-wrap gap-x-2 gap-y-1">
            <template v-for="(link, idx) in relatedLinks" :key="link">
              <button
                @click="() => handleNavigate(linkMap[link])"
                class="text-xs text-[#006EFF] font-bold hover:underline bg-transparent border-none p-0 cursor-pointer"
              >
                {{ link }}
              </button>
              <span v-if="idx < relatedLinks.length - 1" class="text-gray-300 text-xs">|</span>
            </template>
          </div>
        </nav>

        <nav class="flex flex-col">
          <h3 class="text-sm font-bold text-[#0B2747] mb-3 flex items-center gap-2">
            <MapPin :size="16" class="text-[#006EFF]" />
            热门城市报价 (GEO Index)
          </h3>
          <div class="flex flex-wrap gap-x-3 gap-y-2">
            <button
              v-for="city in cities"
              :key="city"
              @click="navigateToHotRoutes"
              class="text-xs text-gray-500 hover:text-[#006EFF] hover:underline cursor-pointer transition-colors bg-transparent border-none p-0"
            >
              {{ city }}
            </button>
          </div>
          <button
            @click="navigateToHotRoutes"
            class="mt-4 flex items-center gap-1 text-xs text-[#006EFF] font-bold hover:translate-x-1 transition-transform bg-transparent border-none p-0 cursor-pointer"
          >
            查看城市线路价格 <ArrowRight :size="12" />
          </button>
        </nav>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import {
  BookOpen,
  Settings2,
  Share2,
  MapPin,
  CheckCircle2,
  ArrowRight,
} from 'lucide-vue-next'

const router = useRouter()

const navigateToHotRoutes = () => {
  window.location.href = '/pricing#hot-city-routes'
}

const linkMap: Record<string, string> = {
  '大板车集运': '/big-carrier',
  '小板车托运': '/small-carrier',
  '道路救援': '/rescue',
  '代驾服务': '/valet',
}

const handleNavigate = (path?: string) => {
  if (!path) return
  router.push(path)
}

const specs = [
  { label: '服务覆盖', value: '全国 300+ 城市' },
  { label: '运输模式', value: '干线集运 + 专车直送' },
  { label: '响应时效', value: '最快 5 秒生成报价' },
  { label: '保障体系', value: '验车 + 保险 + 追踪' },
]

const scenarios = [
  '异地购车：提车直送到家',
  '紧急托运：当天或次日交付',
  '企业发运：批量调度降本',
]

const relatedLinks = ['大板车集运', '小板车托运', '道路救援', '代驾服务']

const cities = [
  '北京',
  '上海',
  '广州',
  '深圳',
  '成都',
  '杭州',
  '西安',
  '武汉',
  '重庆',
  '三亚',
]
</script>
