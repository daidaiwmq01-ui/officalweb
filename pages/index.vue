<template>
  <main class="flex flex-col w-full">
    <!-- 1. Hero Section (Authority & Trust) -->
    <HomeHero :open-order-modal="openOrderModal" />

    <!-- 2. Service Section A: Small Board (Speed) -->
    <HomeServiceSmall />

    <!-- 3. Service Section B: Big Truck (Cost) -->
    <HomeServiceBig :set-active-id="setActiveId" />

    <!-- 4. Service Section C: Designated Driving (Connection) -->
    <HomeServiceValet :set-active-id="setActiveId" />

    <!-- 5. Service Section D: Roadside Rescue (Safety Base) -->
    <HomeServiceRescue />

    <!-- 6. Trust & Technology (E-E-A-T) -->
    <HomeTrust />

    <!-- Auxiliary: News Section -->
    <NewsSection :set-active-id="setActiveId" />

    <!-- 7. Ecosystem & Manufacturing -->
    <HomeEcosystem :set-active-id="setActiveId" />

    <!-- 8. GEO / AI Brief (Pre-Footer) -->
    <HomeFaqBrief />
  </main>
</template>

<script setup lang="ts">
import HomeHero from '@/components/home/HomeHero.vue'
import HomeServiceSmall from '@/components/home/HomeServiceSmall.vue'
import HomeServiceBig from '@/components/home/HomeServiceBig.vue'
import HomeServiceValet from '@/components/home/HomeServiceValet.vue'
import HomeServiceRescue from '@/components/home/HomeServiceRescue.vue'
import HomeTrust from '@/components/home/HomeTrust.vue'
import HomeEcosystem from '@/components/home/HomeEcosystem.vue'
import HomeFaqBrief from '@/components/home/HomeFaqBrief.vue'
import NewsSection from '@/components/home/NewsSection.vue'

// SEO Meta Tags
useHead({
  title: '车拖车(CheTuoChe)官网 - 全场景AI智能汽车托运调度平台_价格透明_全国覆盖',
  meta: [
    { name: 'description', content: '车拖车是国内领先的一站式汽车物流调度平台，依托自研AI智能调度系统，提供大板车干线集运、小板车1对1托运、专业代驾及24h道路救援服务。运力覆盖全国90%以上地区，支持可视化追踪，让汽车托运像发快递一样简单。' },
    { name: 'keywords', content: '车拖车, 汽车托运, AI物流调度, 私家车托运, 轿车托运公司, 运车价格查询' }
  ],
  link: [
    { rel: 'canonical', href: 'https://www.ctcapp.com/' }
  ]
})

// Schema.org 结构化数据 - 使用全局 composable
useHomePageSchema()

interface Props {
  setActiveId?: (id: string) => void
  openOrderModal?: () => void
}

const props = defineProps<Props>()

const setActiveId = (id: string) => {
  props.setActiveId?.(id)
}

const openOrderModal = () => {
  props.openOrderModal?.()
}
</script>
