<template>
  <section class="relative w-full h-[450px] overflow-hidden font-['Noto_Sans_SC']">
    <!-- Background with Dark Overlay -->
    <div class="absolute inset-0 z-0">
      <img 
        :src="EXTERNAL_ASSETS.SUPPLY_CHAIN_HERO" 
        alt="Car Distribution Center" 
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-[#0B2747]/60" />
    </div>

    <div class="container mx-auto max-w-[1200px] relative z-10 px-4 lg:px-0 h-full flex flex-col justify-center">
      <!-- Breadcrumb -->
      <div class="absolute top-6 left-4 lg:left-0 z-20">
        <BreadcrumbNav :items="breadcrumbItems" variant="light" />
      </div>

      <!-- Content - Left Aligned for B2B -->
      <div class="max-w-[800px] mt-16 px-4 lg:px-0">
        <h1 
          v-motion
          :initial="{ opacity: 0, x: -20 }"
          :enter="{ opacity: 1, x: 0, transition: { duration: 0.6 } }"
          class="text-2xl sm:text-3xl md:text-[40px] font-bold text-white mb-6"
          style="line-height: 1.5;"
        >
          <div>汽车供应链数字化方案：</div>
          <div>缩短 OTD 周期并实现"零公里"交付</div>
        </h1>
        
        <p 
          v-motion
          :initial="{ opacity: 0, x: -20 }"
          :enter="{ opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.2 } }"
          class="text-[18px] text-white/90 leading-relaxed mb-10 max-w-[640px]"
        >
          深度整合智能分拨算法与多式联运，助力主机厂实现高周转、低损耗的数字化铺货。
        </p>

        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.4 } }"
        >
          <Button
            class="h-14 px-10 rounded-full bg-[#006EFF] hover:bg-[#0056D6] text-white font-bold text-[18px] border-none cursor-pointer"
            @click="scrollToLeadForm"
          >
            获取企业版方案
          </Button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import BreadcrumbNav from '@/components/common/BreadcrumbNav.vue'
import { getBreadcrumbsForRoute } from '@/config/breadcrumbs'

const breadcrumbItems = getBreadcrumbsForRoute('/supply-chain')
import Button from '@/components/ui/Button.vue'
import { EXTERNAL_ASSETS } from '@/utils/images'

const scrollToLeadForm = () => {
  const el = document.getElementById('supply-chain-lead-form')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>
