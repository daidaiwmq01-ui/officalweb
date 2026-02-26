<template>
  <section class="relative h-[800px] w-full overflow-hidden">
    <!-- Background Image -->
    <div class="absolute inset-0 z-0">
      <img
        loading="eager"
        src="/image/home/home-hero-bg.png"
        alt="车拖车智能汽车物流生态平台-全国覆盖的托运调度服务"
        class="w-full h-full object-cover"
        @error="handleImageError"
      />
      <!-- Gradient Overlay for Text Readability -->
      <div
        class="absolute inset-0"
        :style="{
          background: 'linear-gradient(90deg, rgba(11, 39, 71, 0.9) 0%, rgba(11, 39, 71, 0.4) 60%, rgba(11, 39, 71, 0) 100%)'
        }"
      />
    </div>

    <!-- Content Container -->
    <div class="relative z-10 h-full max-w-[1200px] mx-auto px-4 flex flex-col justify-center items-start">
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 800 } }"
        class="max-w-[800px] text-white text-left"
      >
        <h1
          class="text-5xl md:text-[56px] font-bold leading-[1.6] mb-6 text-white"
          style="text-shadow: 0 4px 10px rgba(0,0,0,0.2)"
        >
          智能汽车物流生态平台
        </h1>
        <p class="text-[18px] md:text-[20px] text-[#E5E7EB] mb-8 font-normal max-w-[600px]">
          连接运力、货主与救援服务的综合性数字平台。自研 AI 智能调度系统，连接 70万+ 运力，已安全交付 2500万+ 台次。
        </p>

        <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <NuxtLink
            to="/pricing#pricing-calculator"
            class="bg-[#FF6B00] hover:bg-[#E56000] text-white rounded-full h-[56px] px-12 shadow-[0_10px_20px_-5px_rgba(255,107,0,0.5)] transition-all transform hover:-translate-y-1 active:scale-95 flex items-center gap-2 text-lg font-bold"
          >
            <Zap class="w-5 h-5 fill-current" />
            立即获取报价
          </NuxtLink>
          <div class="text-white/80 text-sm font-medium">
            7×24 小时智能调度，5 秒内生成报价
          </div>
        </div>
      </div>
    </div>

    <!-- Trust Bar (Bottom) -->
    <div class="absolute bottom-0 left-0 right-0 bg-[#0B2747]/80 backdrop-blur-md border-t border-white/10">
      <div class="max-w-[1200px] mx-auto px-4 h-16 flex items-center justify-between text-gray-300 text-sm md:text-base overflow-x-auto whitespace-nowrap scrollbar-hide">
        <div class="flex items-center gap-2">
          <ShieldCheck class="w-5 h-5 text-[#FF6B00]" />
          <span>太平洋/东海保险承保</span>
        </div>
        <div class="w-[1px] h-6 bg-white/20 mx-4 hidden sm:block" />
        <div class="flex items-center gap-2">
          <Lock class="w-5 h-5 text-[#FF6B00]" />
          <span>国家等保三级认证</span>
        </div>
        <div class="w-[1px] h-6 bg-white/20 mx-4 hidden sm:block" />
        <div class="flex items-center gap-2">
          <Factory class="w-5 h-5 text-[#FF6B00]" />
          <span>年产1500台自营工厂</span>
        </div>
      </div>
    </div>

    <!-- Mini Program Modal (Desktop Only) -->
    <Dialog v-model="isMiniProgramModalOpen">
      <div class="w-full max-w-[400px] bg-white rounded-2xl overflow-hidden shadow-2xl">
        <div class="p-8 flex flex-col items-center text-center">
          <DialogHeader class="mb-2 p-0 space-y-0">
            <DialogTitle class="text-[22px] font-bold text-[#0B2747] text-center">微信扫码 · 观看演示与报价</DialogTitle>
          </DialogHeader>
          <p class="text-[14px] text-gray-500 mb-8 max-w-[260px] leading-relaxed">
            扫码进入小程序，体验 5 秒极速接单演示，或直接获取精准报价。
          </p>

          <!-- QR Code Container -->
          <div class="relative w-[180px] h-[180px] bg-white border-2 border-[#0B2747]/5 rounded-xl flex items-center justify-center mb-6 shadow-inner">
            <img loading="lazy"
              src="/image/contectQR/liteprogress.webp"
              alt="车拖车微信小程序二维码-扫码获取报价"
              class="w-full h-full p-2"
            />
            <!-- Center Icon Overlay -->
          </div>

          <div class="text-[14px] text-gray-400 mb-6 font-medium">
            打开微信 [扫一扫]
          </div>
        </div>
      </div>
    </Dialog>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ShieldCheck, Lock, Factory, Zap } from 'lucide-vue-next'
import Dialog from '@/components/ui/Dialog.vue'
import DialogContent from '@/components/ui/DialogContent.vue'
import DialogHeader from '@/components/ui/DialogHeader.vue'
import DialogTitle from '@/components/ui/DialogTitle.vue'

const HOME_HERO_SRC = '/image/home/home-hero-bg.png'

const props = defineProps<{}>()

const isMiniProgramModalOpen = ref(false)

const handleImageError = (e: Event) => {
  const el = e.target as HTMLImageElement
  if (el && !el.src.includes('home-hero-bg.png')) el.src = HOME_HERO_SRC
}

</script>
