<template>
  <section class="relative w-full h-[450px] overflow-hidden font-['Noto_Sans_SC']">
    <!-- Background with Premium Overlay -->
    <div class="absolute inset-0 z-0">
      <img
        loading="eager"
        src="/image/luxury-transport/hero.webp" 
        alt="Premium Luxury Enclosed Transport" 
        class="w-full h-full object-cover object-center"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-[#0B2747]/80 via-[#0B2747]/40 to-[#0B2747]/80" />
    </div>

    <div class="container mx-auto max-w-[1200px] relative z-10 px-4 lg:px-0 h-full flex flex-col justify-center">
      <!-- Breadcrumb -->
      <div class="absolute top-6 left-4 lg:left-0 z-20">
        <BreadcrumbNav :items="breadcrumbItems" variant="light" />
      </div>

      <!-- Content - Center Aligned for Premium Feel -->
      <div class="text-center max-w-[900px] mx-auto mt-16">
        <h1 
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 800, ease: 'easeOut' } }"
          class="text-2xl sm:text-3xl md:text-[40px] font-bold text-white mb-6"
          style="line-height: 1.5;"
        >
          <div>商业活动特种托运方案：</div>
          <div>针对车展与巡演的高端定制服务</div>
        </h1>
        
        <p 
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 200, ease: 'easeOut' } }"
          class="text-[18px] text-white/90 leading-relaxed mb-10 max-w-[700px] mx-auto"
        >
          专为概念车、超跑及老爷车打造。全封闭厢式运输，配备气囊减震与保密协议。
        </p>

        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 400, ease: 'easeOut' } }"
        >
          <Button
            class="h-14 px-12 rounded-full bg-[#006EFF] hover:bg-[#0056D6] text-white font-bold text-[18px] border-none cursor-pointer shadow-lg shadow-[#006EFF]/20"
            @click="scrollToQuoteForm"
          >
            预约特种运输
          </Button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import BreadcrumbNav from '@/components/common/BreadcrumbNav.vue'
import { getBreadcrumbsForRoute } from '@/config/breadcrumbs'

const breadcrumbItems = getBreadcrumbsForRoute('/luxury-transport')
import Button from '@/components/ui/Button.vue'
const scrollToQuoteForm = () => {
  if (typeof window === 'undefined') return
  const target = document.getElementById('luxury-quote-form')
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  } else {
    window.location.hash = '#luxury-quote-form'
  }
}
</script>
