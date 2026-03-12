<template>
  <section class="relative min-h-[480px] h-auto pt-[80px] pb-12 lg:pb-0 lg:h-[680px] overflow-hidden bg-gradient-to-b from-[#0B2747] to-[#0A223D]">
    <!-- Background Image Overlay -->
    <div class="absolute inset-0 z-0">
      <ImageWithFallback
        src="/image/driver/hero.webp"
        alt="CheTuoChe Driver"
        loading="eager"
        class="w-full h-full object-cover opacity-30 grayscale-[0.5]"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-[#0B2747] via-[#0B2747]/80 to-transparent" />
    </div>

    <div class="container mx-auto max-w-[1200px] px-4 min-h-0 h-full relative z-10 flex flex-col justify-center">
      <!-- Breadcrumb -->
      <div class="absolute top-6 left-4 lg:left-0 z-20">
        <BreadcrumbNav :items="breadcrumbItems" variant="light" />
      </div>

      <div class="flex flex-col lg:flex-row items-stretch pt-16">
        <div class="w-full lg:w-1/2 flex flex-col justify-center">
          <h1
            v-motion
            :initial="{ opacity: 0, x: -30 }"
            :enter="{ opacity: 1, x: 0 }"
            class="text-2xl sm:text-3xl md:text-[40px] font-bold text-white mb-4"
            style="line-height: 1.5;"
          >
            <div>车拖车司机端：汇聚 38 万</div>
            <div>认证司机的接单神器</div>
          </h1>

          <p
            v-motion
            :initial="{ opacity: 0, x: -30 }"
            :enter="{ opacity: 1, x: 0, transition: { delay: 100 } }"
            class="text-[18px] text-white/80 leading-[1.6] max-w-[560px] mb-8"
          >
            支持板车、代驾、救援三种接单模式。智能听单告别空驶，运费极速结算。38万+
            认证司机的共同选择。
          </p>

          <div class="flex gap-10 mb-8">
            <div class="text-white">
              <div class="text-[28px] font-black text-[#FF6B00]">
                38万+
              </div>
              <div class="text-[12px] text-white/60 uppercase font-bold">
                认证司机
              </div>
            </div>
            <div class="text-white">
              <div class="text-[28px] font-black text-[#FF6B00]">
                2000万+
              </div>
              <div class="text-[12px] text-white/60 uppercase font-bold">
                累计托运
              </div>
            </div>
            <div class="text-white">
              <div class="text-[28px] font-black text-[#FF6B00]">
                0元
              </div>
              <div class="text-[12px] text-white/60 uppercase font-bold">
                注册门槛
              </div>
            </div>
          </div>

          <div class="flex items-center gap-4">
            <Button
              class="h-14 px-10 bg-[#FF6B00] hover:bg-[#E56000] text-white rounded-2xl font-bold text-[18px] border-none shadow-xl shadow-orange-900/40"
              @click="handleDownloadClick"
            >
              下载司机端接单
            </Button>
            <button class="text-white font-bold text-[16px] underline bg-transparent border-none cursor-pointer hover:text-[#FF6B00] transition-colors">
              阅读接单规范
            </button>
          </div>

          <div class="flex items-center gap-8 mt-8">
            <div class="flex flex-col items-center gap-2">
              <div class="bg-white p-2.5 rounded-2xl border border-white/10 shadow-md">
                <ImageWithFallback
                  v-if="driverQr"
                  :src="driverQr"
                  alt="司机端下载二维码"
                  class="w-[90px] h-[90px]"
                />
              </div>
              <span class="text-[11px] text-white/70 font-bold">扫码下载司机端</span>
            </div>
            <div class="flex flex-wrap gap-3">
              <button
                @click="setDriverPlatform('ios')"
                :class="driverPlatform === 'ios'
                  ? 'h-10 px-4 bg-white text-[#0B2747] rounded-xl flex items-center gap-2 text-[13px] font-bold shadow-sm border-none cursor-pointer'
                  : 'h-10 px-4 bg-transparent text-white border border-white/30 rounded-xl flex items-center gap-2 text-[13px] font-bold cursor-pointer'"
              >
                <Apple class="w-4 h-4" /> App Store
              </button>
              <button
                @click="setDriverPlatform('android')"
                :class="driverPlatform === 'android'
                  ? 'h-10 px-4 bg-[#FF6B00] text-white rounded-xl flex items-center gap-2 text-[13px] font-bold shadow-sm border-none cursor-pointer'
                  : 'h-10 px-4 bg-transparent text-white border border-white/30 rounded-xl flex items-center gap-2 text-[13px] font-bold cursor-pointer'"
              >
                <Smartphone class="w-4 h-4" /> Android
              </button>
              <button
                @click="setDriverPlatform('android')"
                class="h-10 px-4 bg-transparent text-white border border-white/30 rounded-xl flex items-center gap-2 text-[13px] font-bold cursor-pointer"
              >
                <Globe class="w-4 h-4" /> HarmonyOS
              </button>
            </div>
          </div>

          <div class="flex items-center gap-6 mt-10 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
            <Apple class="w-5 h-5 text-white" />
            <Smartphone class="w-5 h-5 text-white" />
            <Globe class="w-5 h-5 text-white" />
            <span class="text-[12px] font-bold text-white uppercase tracking-widest">
              HarmonyOS
            </span>
          </div>
        </div>

        <!-- 手机端隐藏右侧接单画框，仅桌面端显示 -->
        <div class="hidden lg:flex w-1/2 items-center justify-center relative">
          <div
            v-motion
            :initial="{ opacity: 0, y: 50 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 800 } }"
          >
            <OrderDispatchMockup />
          </div>
          <div class="absolute w-[420px] h-[420px] bg-[#1D4ED8]/15 rounded-full blur-3xl -z-10" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { Apple, Smartphone, Globe } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'
import ImageWithFallback from '@/components/ImageWithFallback.vue'
import OrderDispatchMockup from '@/components/driver/OrderDispatchMockup.vue'
import BreadcrumbNav from '@/components/common/BreadcrumbNav.vue'
import { getBreadcrumbsForRoute } from '@/config/breadcrumbs'
import { useDownloadInfo } from '@/composables/useDownloadInfo'

interface BreadcrumbItem {
  label: string
  path?: string
}

interface Props {
  setActiveId?: (id: string) => void
  /** 面包屑配置，不传则根据当前路由自动获取 */
  breadcrumbItems?: BreadcrumbItem[]
}

const props = withDefaults(defineProps<Props>(), {
  breadcrumbItems: () => getBreadcrumbsForRoute(useRoute().path),
})

const { fetchIfNeeded, openDriverApp, driverAndroidQr, driverIosQr } = useDownloadInfo()

onMounted(() => {
  fetchIfNeeded()
})

const handleSetActiveId = (id: string) => {
  props.setActiveId?.(id)
}

const handleDownloadClick = () => {
  if (typeof navigator !== 'undefined' && /iphone|ipad|ipod/i.test(navigator.userAgent)) {
    openDriverApp('ios')
  } else {
    openDriverApp('android')
  }
}

const driverPlatform = ref<'ios' | 'android'>('android')
const driverQr = computed(() =>
  driverPlatform.value === 'ios' ? driverIosQr.value : driverAndroidQr.value
)

const isMobile = () =>
  typeof navigator !== 'undefined' && /iphone|ipad|ipod|android|mobile/i.test(navigator.userAgent)

const setDriverPlatform = (platform: 'ios' | 'android') => {
  driverPlatform.value = platform
  if (isMobile()) {
    openDriverApp(platform)
  }
}
</script>
