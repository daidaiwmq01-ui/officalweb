<template>
  <article class="bg-white min-h-screen font-['Noto_Sans_SC']">
    <!-- 1. Hero Section: The Warm Welcome -->
    <section class="relative h-[550px] overflow-hidden bg-[#0B2747]">
      <div class="absolute inset-0 z-0">
        <ImageWithFallback
          src="/image/driver/hero.webp"
          alt="车拖车司机之家夜间驿站全景"
        loading="eager"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-r from-[#0B2747] via-[#0B2747]/70 to-transparent" />
      </div>

      <div class="container mx-auto max-w-[1200px] px-4 relative z-10 h-full flex flex-col justify-center">
        <div class="absolute top-6 left-4 lg:left-0 z-20">
          <BreadcrumbNav :items="breadcrumbItems" variant="light" />
        </div>

        <div
          v-motion
          :initial="{ opacity: 0, x: -30 }"
          :enter="{ opacity: 1, x: 0 }"
          class="max-w-[700px]"
        >
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[14px] mb-8">
            <div class="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse" />
            计划 2026 年底构建 500+ 处
          </div>
          <h1 class="text-2xl sm:text-3xl md:text-[48px] font-bold text-white mb-6" style="line-height: 1.5;">
            <div>司机之家：全国驿站补给网络</div>
            <div>关怀每一位运力伙伴</div>
          </h1>
          <p class="text-[18px] text-white/90 mb-10 leading-relaxed">
            全面铺设服务驿站，为货运司机提供 24h 热水淋浴、免费 Wi-Fi、车辆自助检测及温暖生活补给。不仅仅是歇脚的地方，更是人车双补给的能量站。
          </p>
          <Button
            class="h-16 px-10 rounded-2xl bg-[#FF6B00] hover:bg-[#E56000] text-white font-bold text-[18px] border-none shadow-xl shadow-orange-500/30"
            @click="scrollToStations"
          >
            查找附近驿站
          </Button>
        </div>
      </div>
    </section>

    <!-- 2. Section A: Basic Services - "Comfort & Rest" -->
    <section class="py-24 bg-white">
      <div class="container mx-auto max-w-[1200px] px-4">
        <div class="mb-16">
          <h2 class="text-[32px] font-bold text-[#0B2747] mb-4">
            基础服务：舒心休整
          </h2>
          <div class="w-16 h-1 bg-[#FF6B00] rounded-full" />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard
            :icon="Bath"
            title="24h 洗漱空间"
            desc="24小时热水淋浴、标准化洁净卫生间、免费一次性洗漱包。"
          />
          <ServiceCard
            :icon="Wifi"
            title="数字化休息区"
            desc="高速免费 Wi-Fi 全覆盖、手机快充、路况天气大屏。"
          />
          <ServiceCard
            :icon="Coffee"
            title="生活补给站"
            desc="冷热直饮水无限供应、简餐加热设备。"
          />
          <ServiceCard
            :icon="Stethoscope"
            title="应急关怀"
            desc="配备应急药箱与防暑降温用品。"
          />
          <ServiceCard
            :icon="Moon"
            title="临时休息"
            desc="安静的睡眠舱或舒适休息椅，缓解长途驾驶疲劳。"
          />
          <ServiceCard
            :icon="ShieldCheck"
            title="安全停车"
            desc="全监控覆盖的专用停车区，安心休憩。"
          />
        </div>
      </div>
    </section>

    <!-- 3. Section B: Vehicle Care - "Efficiency" -->
    <section class="py-24 bg-[#F0F7FF]">
      <div class="container mx-auto max-w-[1200px] px-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div
            v-motion
            :initial="{ opacity: 0, x: -30 }"
            :visible="{ opacity: 1, x: 0 }"
            :visibleOnce="true"
          >
            <h2 class="text-[32px] font-bold text-[#0B2747] mb-12">
              车辆关怀：高效续航
            </h2>
            <div class="space-y-10">
              <VehicleFeature
                :icon="Droplets"
                title="自助洗车"
                desc="配备高压水枪与专业洗车液，让您的爱车时刻保持专业形象。"
              />
              <VehicleFeature
                :icon="QrCode"
                title="车贴权益落地"
              >
                <template #desc>
                  <span>
                    官方认证车贴现场申领。专人指导贴附，完成后即可在司机端
                    APP 解锁
                    <strong class="text-[#006EFF]">
                      "自动接单"
                    </strong>
                    权益。
                  </span>
                </template>
              </VehicleFeature>
              <VehicleFeature
                :icon="Zap"
                title="基础检测"
                desc="免费胎压检测、玻璃水加注，确保行车安全。"
              />
            </div>
          </div>

          <div
            v-motion
            :initial="{ opacity: 0, scale: 0.9 }"
            :visible="{ opacity: 1, scale: 1 }"
            :visibleOnce="true"
            class="relative rounded-[40px] overflow-hidden shadow-2xl border-8 border-white"
          >
            <ImageWithFallback
              src="/image/driver/mockup.png"
              alt="车拖车平台认证司机在驿站休息"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </div>
      </div>
    </section>

    <!-- 4. Section C: The Blueprint (Map Visualization) -->
    <section class="py-24 bg-[#0B2747] text-white relative overflow-hidden">
      <div class="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <ImageWithFallback
          src="/image/driver/driverhome.png"
          alt="车拖车全国驿站网络节点覆盖图"
          class="w-full h-full object-cover"
        />
      </div>

      <div class="container mx-auto max-w-[1200px] px-4 relative z-10">
        <div class="text-center mb-16">
          <h2 class="text-2xl sm:text-[36px] font-bold mb-4">
            全国驿站布局蓝图
          </h2>
          <div class="w-20 h-1 bg-[#FF6B00] mx-auto rounded-full" />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div class="space-y-4">
            <div class="text-[56px] font-black text-[#FF6B00]">
              500+
            </div>
            <p class="text-white/60 text-[18px]">
              规划站点 (2026)
            </p>
          </div>
          <div class="space-y-4 border-x border-white/10">
            <div class="text-[56px] font-black text-[#FF6B00]">
              24h
            </div>
            <p class="text-white/60 text-[18px]">
              全天候开放
            </p>
          </div>
          <div class="space-y-4">
            <div class="text-[56px] font-black text-[#FF6B00]">
              0元
            </div>
            <p class="text-white/60 text-[18px]">
              认证司机免费入场
            </p>
          </div>
        </div>

        <div class="mt-20 max-w-[800px] mx-auto border border-white/10 rounded-[40px] p-8 bg-white/5 backdrop-blur-sm text-center">
          <p class="text-white/80 leading-relaxed italic">
            "司机之家不仅仅是物理上的歇脚点，更是车拖车'尊重劳动、关怀伙伴'价值观的直接体现。我们致力于在全国主要高速枢纽与物流集散地，为每一位在路上的伙伴构建温暖港湾。"
          </p>
        </div>
      </div>
    </section>

    <!-- 5. Section D: Driver Station List (API Driven) -->
    <section
      id="driver-stations"
      class="py-24 bg-[#F8F9FB]"
    >
      <div class="container mx-auto max-w-[1200px] px-4">
        <div class="text-center mb-12">
          <h2 class="text-[32px] font-bold text-[#0B2747] mb-4">
            全国司机之家驿站一览
          </h2>
          <p class="text-[15px] text-[#4B5563] max-w-[720px] mx-auto leading-relaxed">
            以下数据来自车拖车官方后台，全国站点信息将持续更新中。认证司机可优先前往附近驿站，享受免费休息、洗漱与基础车辆关怀服务。
          </p>
        </div>

        <!-- Loading & Error States -->
        <div v-if="loadingSites" class="flex justify-center py-10">
          <p class="text-gray-500 text-[15px]">
            正在加载全国驿站信息，请稍候...
          </p>
        </div>
        <div v-else-if="siteError" class="max-w-[800px] mx-auto mb-8">
          <div class="rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-[14px] text-red-700">
            {{ siteError }}
          </div>
        </div>

        <!-- Station List -->
        <div
          v-if="!loadingSites && flattenedSites.length"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <article
            v-for="station in flattenedSites"
            :key="station.id"
            class="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-all p-6 flex flex-col gap-3"
          >
            <header class="flex items-start justify-between gap-3">
              <div>
                <h3 class="text-[18px] font-bold text-[#0B2747] mb-1">
                  {{ station.siteName || '未命名驿站' }}
                </h3>
                <p class="text-[13px] text-gray-500">
                  {{ station.siteAddress || '地址信息待更新' }}
                </p>
              </div>
              <span
                v-if="station.siteType !== undefined && station.siteType !== null"
                class="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium bg-blue-50 text-[#006EFF]"
              >
                驿站类型 {{ station.siteType }}
              </span>
            </header>

            <p
              v-if="station.remark"
              class="text-[13px] text-gray-600 leading-relaxed line-clamp-3"
            >
              {{ station.remark }}
            </p>

            <dl class="mt-1 space-y-1 text-[13px] text-gray-600">
              <div v-if="station.siteHeadPerson">
                <dt class="inline text-gray-500">负责人：</dt>
                <dd class="inline">
                  {{ station.siteHeadPerson }}
                </dd>
              </div>
              <div v-if="station.linkPhone">
                <dt class="inline text-gray-500">联系电话：</dt>
                <dd class="inline">
                  {{ station.linkPhone }}
                </dd>
              </div>
            </dl>

            <p
              v-if="station.siteLola"
              class="mt-1 text-[12px] text-gray-400"
            >
              坐标：{{ station.siteLola }}
            </p>
          </article>
        </div>

        <div
          v-else-if="!loadingSites && !flattenedSites.length && !siteError"
          class="text-center py-10 text-[14px] text-gray-500"
        >
          暂无驿站数据，请稍后再试或联系平台管理员。
        </div>
      </div>
    </section>

    <!-- 6. Section E: How to Access (App Integration) -->
    <section class="py-24 bg-white">
      <div class="container mx-auto max-w-[1200px] px-4">
        <div class="max-w-[1000px] mx-auto border-2 border-[#FF6B00] rounded-[40px] p-10 md:p-16 flex flex-col md:flex-row items-center gap-16">
          <div class="flex-1">
            <h2 class="text-[32px] font-bold text-[#0B2747] mb-10">
              如何进入司机之家？
            </h2>
            <div class="space-y-8">
              <StepItem
                num="1"
                text="下载 车拖车司机端 APP"
              />
              <StepItem num="2" text="完成实名与车辆认证" />
              <StepItem
                num="3"
                text="出示 APP 内的 认证账号 即可免费享受基础服务"
              />
            </div>
          </div>
          <div class="shrink-0 text-center space-y-4">
            <div class="w-48 h-48 bg-gray-50 border-2 border-gray-100 rounded-3xl flex items-center justify-center p-4">
              <div class="w-full h-full bg-[#0B2747] rounded-xl flex items-center justify-center text-white">
                <Download class="w-12 h-12" />
              </div>
            </div>
            <p class="text-[14px] font-bold text-[#0B2747]">
              扫描下载司机端 APP
            </p>
            <Button class="w-full bg-[#0B2747] text-white hover:bg-[#1a3a5a] border-none">
              立即认证
            </Button>
          </div>
        </div>
      </div>
    </section>

    <!-- 7. Section F: FAQ (SEO Schema Content) -->
    <section class="py-24 bg-[#F8F9FB]">
      <div class="container mx-auto max-w-[800px] px-4">
        <div class="text-center mb-16">
          <div class="inline-flex p-3 bg-blue-50 rounded-2xl text-[#006EFF] mb-6">
            <Info class="w-6 h-6" />
          </div>
          <h2 class="text-[28px] font-bold text-[#0B2747]">
            驿站服务简报
          </h2>
        </div>

        <div class="space-y-4">
          <AccordionItem
            v-for="(item, idx) in faqData"
            :key="idx"
            :question="item.q"
            :answer="item.a"
          />
        </div>
      </div>
    </section>

    <footer class="py-20 bg-white border-t border-gray-100 text-center">
      <p class="text-gray-400 text-[14px]">车拖车·司机之家 | 全国伙伴热线：400-XXX-XXXX</p>
    </footer>
  </article>
</template>

<script setup lang="ts">
import BreadcrumbNav from '@/components/common/BreadcrumbNav.vue'
import { getBreadcrumbsForRoute } from '@/config/breadcrumbs'
import { useBreadcrumbSchema, useFAQPageSchema } from '@/composables/useSchemaOrg'

useBreadcrumbSchema(getBreadcrumbsForRoute('/driver/home'))

const breadcrumbItems = getBreadcrumbsForRoute('/driver/home')

useHead({
  title: '司机之家 - 全国驿站补给网络 - 车拖车',
  meta: [
    { name: 'description', content: '车拖车司机之家计划2026年底构建500+处服务驿站，为货运司机提供24h热水淋浴、免费Wi-Fi、车辆自助检测及温暖生活补给。' },
    { name: 'keywords', content: '司机之家, 司机驿站, 货运服务站, 司机补给, 车拖车' }
  ],
  link: [
    { rel: 'canonical', href: 'https://www.ctcapp.com/driver/home' }
  ]
})


import { computed, onMounted, ref } from 'vue'
import {
  ChevronRight,
  Bath,
  Wifi,
  Coffee,
  Stethoscope,
  Moon,
  ShieldCheck,
  Droplets,
  Zap,
  QrCode,
  Download,
  Info,
} from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'
import ImageWithFallback from '@/components/ImageWithFallback.vue'
import ServiceCard from '@/components/driver-home/ServiceCard.vue'
import VehicleFeature from '@/components/driver-home/VehicleFeature.vue'
import StepItem from '@/components/driver-home/StepItem.vue'
import AccordionItem from '@/components/driver-home/AccordionItem.vue'
import { useApi } from '@/composables/useApi'

interface Props {
  setActiveId?: (id: string) => void
}

const props = defineProps<Props>()

interface SiteItem {
  id: number
  siteName: string
  siteAddress: string
  linkPhone: string
  siteHeadPerson: string
  remark: string
  siteLola: string
  siteType: number
}

const { apiBase, getAuthHeaders } = useApi()

const loadingSites = ref(true)
const siteGroups = ref<any[]>([])
const siteError = ref<string | null>(null)

const flattenedSites = computed<SiteItem[]>(() =>
  (siteGroups.value || []).flatMap((group: any) => {
    // 标准结构：[{ siteType, siteList: SiteItem[] }]
    if (Array.isArray(group.siteList)) {
      return group.siteList
    }

    // 如果后端直接返回 SiteItem[]
    if (!group.siteList && group.id && group.siteName) {
      return [group as SiteItem]
    }

    return []
  })
)

const fetchSites = async () => {
  loadingSites.value = true
  siteError.value = null

  try {
    const response = await $fetch<any>(`${apiBase}/api/home/getAllSite`, {
      method: 'GET',
      headers: getAuthHeaders(),
    })

    // 兼容多种返回结构：数组 / { data } / { list } / { data: { list } }
    let raw = response

    if (raw && typeof raw === 'object' && !Array.isArray(raw)) {
      if (Array.isArray(raw.data)) {
        raw = raw.data
      } else if (Array.isArray(raw.list)) {
        raw = raw.list
      } else if (raw.data && Array.isArray(raw.data.list)) {
        raw = raw.data.list
      }
    }

    siteGroups.value = Array.isArray(raw) ? raw : []
  } catch (error) {
    siteError.value = '驿站数据获取失败，请稍后重试。'
    siteGroups.value = []
  } finally {
    loadingSites.value = false
  }
}

onMounted(() => {
  fetchSites()
})

const faqData = [
  {
    q: "车拖车司机之家提供哪些服务？",
    a: "司机之家提供基础生活服务（24h热水淋浴、免费Wi-Fi、简餐加热、应急药箱、临时休整）以及车辆专业关怀（自助洗车、认证车贴申领、胎压检测、玻璃水加注）等全方位补给。",
  },
  {
    q: "准入条件是什么？",
    a: "所有车拖车平台认证的板车司机、救援司机及代驾伙伴均可凭司机端 APP 内的认证账号，免费入场并享受所有基础服务。",
  },
]

const scrollToStations = () => {
  document
    .getElementById('driver-stations')
    ?.scrollIntoView({ behavior: 'smooth' })
}

// Schema.org 结构化数据 - 司机之家
const driverHomeSchema = {
  '@context': 'https://schema.org',
  '@type': 'CivicStructure',
  'name': '车拖车司机之家 (服务驿站)',
  'description': '为全国货运司机提供免费洗漱、24h休息区及车辆自助检测服务的补给网络。',
  'telephone': '400-075-1117',
  'openingHoursSpecification': {
    '@type': 'OpeningHoursSpecification',
    'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    'opens': '00:00',
    'closes': '23:59'
  },
  'amenityFeature': [
    { '@type': 'LocationFeatureSpecification', 'name': '免费热水淋浴' },
    { '@type': 'LocationFeatureSpecification', 'name': '高速Wi-Fi' },
    { '@type': 'LocationFeatureSpecification', 'name': '自助洗衣' },
    { '@type': 'LocationFeatureSpecification', 'name': '车辆自助检测' }
  ]
}

useSchemaOrg(driverHomeSchema)
useFAQPageSchema(faqData.map(f => ({ question: f.q, answer: f.a })))
</script>
