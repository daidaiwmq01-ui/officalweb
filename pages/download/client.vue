<template>
  <article class="bg-white min-h-screen font-['Noto_Sans_SC']">
    
    <!-- 🚀 Hero Section: 移动端隐藏右侧手机画框 -->
    <section class="relative min-h-[480px] h-auto lg:h-[680px] overflow-hidden bg-gradient-to-b from-[#F0F7FF] to-[#FFFFFF]">
      <div class="container mx-auto max-w-[1200px] px-4 py-8 lg:py-0 lg:h-full relative flex flex-col justify-center">
        <!-- Breadcrumb - Absolute Positioned (Dark Text for Light BG) -->
        <div class="absolute top-6 left-4 lg:left-0 z-20">
          <BreadcrumbNav :items="breadcrumbItems" variant="dark" />
        </div>

        <div class="flex flex-col lg:flex-row items-stretch pt-16">
          <!-- Left Column：移动端全宽，桌面端 50% -->
          <div class="w-full lg:w-1/2 flex flex-col justify-center">
            <div>
              <h1
                v-motion
                :initial="{ opacity: 0, y: 20 }"
                :enter="{ opacity: 1, y: 0 }"
                class="text-2xl sm:text-3xl md:text-[40px] font-bold text-[#0B2747] mb-4"
                style="line-height: 1.5;"
              >
                <div>车拖车 APP：国内领先的</div>
                <div>AI 智能调度汽车托运平台</div>
              </h1>

              <p
                v-motion
                :initial="{ opacity: 0, y: 20 }"
                :enter="{ opacity: 1, y: 0, transition: { delay: 100 } }"
                class="text-[18px] text-gray-600 leading-[1.6] max-w-[560px]"
              >
                国内领先的数字化汽车物流平台，已为用户完成
                1000万次 托运。支持安卓、iOS及 鸿蒙
                (HarmonyOS) 系统。集成 AI
                智能报价与全流程可视化追踪，让汽车物流更简单、更高效。
              </p>

              <div class="flex items-center gap-4 mt-8">
                <button
                  class="h-14 px-10 bg-[#FF6B00] hover:bg-[#E56000] text-white rounded-2xl font-bold text-[18px] border-none shadow-xl shadow-orange-500/20 cursor-pointer"
                  @click="handleDownloadClick"
                >
                  下载车拖车 APP
                </button>
                <NuxtLink
                  to="/guide"
                  class="flex items-center gap-1 text-[#006EFF] font-bold text-[16px] hover:underline"
                >
                  阅读用户指南 <ChevronRight class="w-4 h-4" />
                </NuxtLink>
              </div>

              <div class="flex items-center gap-8 mt-8">
                <div class="flex flex-col items-center gap-2">
                  <div class="bg-white p-2.5 rounded-2xl border border-gray-100 shadow-md">
                    <ImageWithFallback
                      v-if="customerQr"
                      :src="customerQr"
                      alt="客户端下载二维码"
                      class="w-[90px] h-[90px]"
                    />
                  </div>
                  <span class="text-[11px] text-gray-400 font-bold">扫码下载客户端</span>
                </div>
                <div class="flex flex-wrap gap-3">
                  <button
                    @click="setCustomerPlatform('ios')"
                    :class="customerPlatform === 'ios'
                      ? 'h-10 px-4 bg-black text-white rounded-xl flex items-center gap-2 text-[13px] font-bold shadow-sm border-none cursor-pointer'
                      : 'h-10 px-4 bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 rounded-xl flex items-center gap-2 text-[13px] font-bold cursor-pointer'"
                  >
                    <Apple class="w-4 h-4" /> App Store
                  </button>
                  <button
                    @click="setCustomerPlatform('android')"
                    :class="customerPlatform === 'android'
                      ? 'h-10 px-4 bg-[#0B2747] text-white rounded-xl flex items-center gap-2 text-[13px] font-bold shadow-sm border-none cursor-pointer'
                      : 'h-10 px-4 bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 rounded-xl flex items-center gap-2 text-[13px] font-bold cursor-pointer'"
                  >
                    <Smartphone class="w-4 h-4" /> Android
                  </button>
                  <button
                    @click="setCustomerPlatform('android')"
                    class="h-10 px-4 bg-white hover:bg-gray-50 text-[#0B2747] border border-gray-200 rounded-xl flex items-center gap-2 text-[13px] font-bold cursor-pointer"
                  >
                    <Globe class="w-4 h-4" /> HarmonyOS
                  </button>
                </div>
              </div>

              <div class="flex items-center gap-6 mt-12 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all">
                <div class="flex items-center gap-2">
                  <Apple class="w-5 h-5" />
                  <span class="text-[12px] font-bold">App Store</span>
                </div>
                <div class="flex items-center gap-2">
                  <Smartphone class="w-5 h-5" />
                  <span class="text-[12px] font-bold">Android</span>
                </div>
                <div class="flex items-center gap-2">
                  <Globe class="w-5 h-5" />
                  <span class="text-[12px] font-bold">HarmonyOS</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column：手机端隐藏手机画框，仅桌面端显示 -->
          <div class="hidden lg:flex w-1/2 items-center justify-center relative">
            <div
              v-motion
              :initial="{ opacity: 0, scale: 0.9, rotate: 5 }"
              :enter="{ opacity: 1, scale: 1, rotate: 0, transition: { duration: 800 } }"
              class="relative z-10"
            >
              <HeroChatMockup />
            </div>
            <!-- Background Glow -->
            <div class="absolute w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-3xl -z-0" />
          </div>
        </div>
      </div>
    </section>

    <!-- 🏙️ Section A: AI Pricing & Efficiency -->
    <ClientAIPricing />

    <!-- 🛡️ Section B: Security & Ecosystem -->
    <ClientSecurityEcosystem />

    <!-- 🌐 Section C: Supported Entities (Static Grid) -->
    <ClientSupportedEntities />

    <!-- 📱 Section: App Functions -->
    <ClientAppFunctions />

    <!-- 📘 Section D: User Guide (Helpful Content) -->
    <ClientUserGuide />

    <!-- ⭐ Section E: User Reviews (Masonry) -->
    <ClientReviews />

    <!-- 📄 SEO Summary Footer -->
    <ClientFooter />

  </article>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import BreadcrumbNav from '@/components/common/BreadcrumbNav.vue'
import { getBreadcrumbsForRoute } from '@/config/breadcrumbs'
import { useBreadcrumbSchema } from '@/composables/useSchemaOrg'
import { usePageSeo } from '@/composables/useSeoMeta'

useBreadcrumbSchema(getBreadcrumbsForRoute('/download/client'))

const breadcrumbItems = getBreadcrumbsForRoute('/download/client')

usePageSeo({
  title: '车拖车客户端 - AI智能汽车托运平台',
  description: '车拖车客户端是国内领先的数字化汽车物流平台，已为用户完成1000万次托运。支持安卓、iOS及鸿蒙系统。集成AI智能报价与全流程可视化追踪，让汽车物流更简单、更高效。',
  keywords: '车拖车APP, 汽车托运APP, AI智能报价, 实时轨迹追踪, 电子发票, 买卖板车, 违章处理',
  ogImage: '/image/download/og-client.webp',
  canonicalUrl: 'https://newweb.chetuoche.net/download/client'
})

import { 
  ChevronRight,
  Apple,
  Smartphone,
  Globe
} from 'lucide-vue-next'
import HeroChatMockup from '@/components/client/HeroChatMockup.vue'
import ImageWithFallback from '@/components/ImageWithFallback.vue'
import ClientAIPricing from '@/components/client/ClientAIPricing.vue'
import ClientSecurityEcosystem from '@/components/client/ClientSecurityEcosystem.vue'
import ClientSupportedEntities from '@/components/client/ClientSupportedEntities.vue'
import ClientAppFunctions from '@/components/client/ClientAppFunctions.vue'
import ClientUserGuide from '@/components/client/ClientUserGuide.vue'
import ClientReviews from '@/components/client/ClientReviews.vue'
import ClientFooter from '@/components/client/ClientFooter.vue'
import { useDownloadInfo } from '@/composables/useDownloadInfo'

const schemaMarkup = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "车拖车客户端",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Android, iOS, HarmonyOS",
  featureList: "AI智能报价, 实时轨迹追踪, 电子发票, 买卖板车, 违章处理",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "10000000",
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "CNY",
  },
})

const { fetchIfNeeded, openCustomerApp, customerAndroidQr, customerIosQr } = useDownloadInfo()

onMounted(() => {
  fetchIfNeeded()
})

const handleDownloadClick = () => {
  if (typeof navigator !== 'undefined' && /iphone|ipad|ipod/i.test(navigator.userAgent)) {
    openCustomerApp('ios')
  } else {
    openCustomerApp('android')
  }
}

const customerPlatform = ref<'ios' | 'android'>('android')
const customerQr = computed(() =>
  customerPlatform.value === 'ios' ? customerIosQr.value : customerAndroidQr.value
)

const isMobile = () =>
  typeof navigator !== 'undefined' && /iphone|ipad|ipod|android|mobile/i.test(navigator.userAgent)

const setCustomerPlatform = (platform: 'ios' | 'android') => {
  customerPlatform.value = platform
  if (isMobile()) {
    openCustomerApp(platform)
  }
}

useHead({
  script: [
    {
      type: 'application/ld+json',
      children: schemaMarkup
    }
  ]
})
</script>
