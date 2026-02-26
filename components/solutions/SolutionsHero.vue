<template>
  <section class="relative w-full h-[450px] overflow-hidden font-['Noto_Sans_SC']">
    <!-- Background Image with Overlay -->
    <div class="absolute inset-0 z-0">
      <img
        loading="eager"
        src="/image/solutions/hero.png" 
        alt="Digital Logistics Network" 
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-black/40 bg-gradient-to-b from-black/20 to-[#0B2747]/60" />
    </div>

    <div class="container mx-auto max-w-[1200px] h-full relative z-10 px-4 lg:px-0 flex flex-col justify-center">
      <!-- Breadcrumb -->
      <div class="absolute top-6 left-4 lg:left-0 z-20">
        <BreadcrumbNav :items="breadcrumbItems" variant="light" />
      </div>

      <!-- Content -->
      <div class="text-center max-w-[800px] mx-auto">
        <h1
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 600 } }"
          class="text-2xl sm:text-3xl md:text-[40px] font-bold text-white mb-6"
          style="line-height: 1.5;"
        >
          <div>车拖车全场景行业解决方案：</div>
          <div>用数字技术赋能汽车流通生态</div>
        </h1>
        <p
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 200 } }"
          class="text-[18px] text-white/90 leading-relaxed"
        >
          无论是个性化旅游托运、高端车商业活动，还是主机厂数字化供应链，我们均提供全维度物流支撑。
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import BreadcrumbNav from '@/components/common/BreadcrumbNav.vue'
import { getBreadcrumbsForRoute } from '@/config/breadcrumbs'

const breadcrumbItems = getBreadcrumbsForRoute('/solutions')
</script>
