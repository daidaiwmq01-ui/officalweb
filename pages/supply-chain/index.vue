<template>
  <main class="w-full">
    <SupplyChainHero />
    <SupplyChainContent />
    <SupplyChainLeadGen />
  </main>
</template>

<script setup lang="ts">
import { getBreadcrumbsForRoute } from '@/config/breadcrumbs'
import { useBreadcrumbSchema } from '@/composables/useSchemaOrg'

useBreadcrumbSchema(getBreadcrumbsForRoute('/supply-chain'))


import SupplyChainHero from '@/components/supply-chain/SupplyChainHero.vue'
import SupplyChainContent from '@/components/supply-chain/SupplyChainContent.vue'
import SupplyChainLeadGen from '@/components/supply-chain/SupplyChainLeadGen.vue'

// SEO Meta Tags
useHead({
  title: '汽车供应链物流数字化方案_OTD全周期缩短_4S店动态调拨服务 - 车拖车 (CheTuoChe)',
  meta: [
    { name: 'description', content: '车拖车为汽车生产商与经销商构建端到端可视化物流体系。通过智能分拨算法与多式联运，使交付周期缩短12%-18%，降低物流成本15%。支持"零公里"交付标准与店间余缺自动调拨，实现新车从生产线到4S店的零延时供货。' },
    { name: 'keywords', content: '汽车供应链解决方案, OTD交付体系, 整车物流数字化, 4S店补库运输, 智能路径规划, 数字化验车' }
  ],
  link: [
    { rel: 'canonical', href: 'https://www.ctcapp.com/supply-chain' }
  ]
})

// Schema.org 结构化数据
const supplyChainSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  'name': '汽车供应链数字化解决方案',
  'provider': { '@id': 'https://www.ctcapp.com/#organization' },
  'serviceType': 'Supply Chain Management',
  'description': '面向主机厂与4S店，提供从生产线到销售终端的OTD可视化物流服务。支持智能分拨、库存动态调拨及零公里交付。',
  'serviceOutput': '缩短OTD周期12%-18%',
  'areaServed': 'CN',
  'audience': {
    '@type': 'BusinessAudience',
    'audienceType': 'Automotive Manufacturers'
  }
}

useSchemaOrg(supplyChainSchema)
</script>
