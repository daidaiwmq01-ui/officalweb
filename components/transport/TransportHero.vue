<template>
  <section class="relative w-full h-[450px] overflow-hidden flex flex-col items-center">
    <!-- Background Image with Parallax effect (simulated via scroll-attachment if possible or just fixed) -->
    <div class="absolute inset-0 z-0">
      <ImageWithFallback 
        :src="bgImage" 
        alt="Car carrier truck on highway" 
        class="w-full h-full object-cover"
      />
      <!-- Gradient Overlay -->
      <div 
        class="absolute inset-0 bg-gradient-to-b from-[#0B2747]/80 to-[#0B2747]/60"
      />
    </div>

    <!-- Content Container (1200px centered) -->
    <div class="relative z-10 w-full max-w-[1200px] h-full px-4 mx-auto flex flex-col">
      <!-- Breadcrumb Navigation -->
      <div class="pt-8 z-20">
        <BreadcrumbNav :items="breadcrumbItems" variant="light" />
      </div>

      <!-- Center-Aligned Content -->
      <div class="flex-grow flex flex-col items-center justify-center">
        <h1 class="text-2xl sm:text-3xl md:text-[40px] font-bold text-white mb-6 text-center leading-[1.6]">
          <span class="block mb-2">2026 汽车托运全场景服务百科：</span>
          <span class="block">大板车、小板车、代驾与救援深度解析</span>
        </h1>
        <p class="text-[18px] text-white/90 max-w-[800px] mb-8 leading-relaxed text-center">
          一站式掌握长途集运、专车直送及末端接驳方案，助您在"价格"与"时效"间找到最优解。
        </p>
        
        <!-- Visual Decoration -->
        <div class="w-16 h-1 bg-[#FF6B00] rounded-full" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import ImageWithFallback from '@/components/ImageWithFallback.vue'
import BreadcrumbNav from '@/components/common/BreadcrumbNav.vue'
import { getBreadcrumbsForRoute } from '@/config/breadcrumbs'

const breadcrumbItems = getBreadcrumbsForRoute('/transport')

const bgImage = "https://images.unsplash.com/photo-1644442076205-627648a62844?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBjYXJyaWVyJTIwdHJ1Y2slMjBoaWdod2F5JTIwc3VubnklMjBkYXl8ZW58MXx8fHwxNzY5MTM0ODA4fDA&ixlib=rb-4.1.0&q=80&w=1080"
</script>
