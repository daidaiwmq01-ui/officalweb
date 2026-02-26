<template>
  <main class="w-full">
    <LuxuryHero />
    <LuxuryGuarantees />
    <LuxuryProcess />
    <LuxuryGallery />
    <LuxuryLeadGen />
  </main>
</template>

<script setup lang="ts">
import { getBreadcrumbsForRoute } from '@/config/breadcrumbs'
import { useBreadcrumbSchema } from '@/composables/useSchemaOrg'

useBreadcrumbSchema(getBreadcrumbsForRoute('/luxury-transport'))


import LuxuryHero from '@/components/luxury/LuxuryHero.vue'
import LuxuryGuarantees from '@/components/luxury/LuxuryGuarantees.vue'
import LuxuryProcess from '@/components/luxury/LuxuryProcess.vue'
import LuxuryGallery from '@/components/luxury/LuxuryGallery.vue'
import LuxuryLeadGen from '@/components/luxury/LuxuryLeadGen.vue'

// SEO Meta Tags
useHead({
  title: '商业活动汽车物流_车展/巡演/豪车特种托运_全封闭厢式板车 - 车拖车',
  meta: [
    { name: 'description', content: '专为概念车、超跑、老爷车打造"保姆式"特种托运服务。采用配备气囊减震系统的全封闭厢式板车，确保无尘、无划痕运输。提供高保密协议、定额特种险及专业地勤团队，支持展位精准落位，保障高价值车辆非凡展程。' },
    { name: 'keywords', content: '车展托运, 高端车定制运输, 全封闭厢式板车, 赛道日托运, 豪车保险, 特种物流执行' }
  ],
  link: [
    { rel: 'canonical', href: 'https://www.ctcapp.com/luxury-transport' }
  ]
})

// Schema.org 结构化数据
const luxurySchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  'name': '商业活动特种托运方案',
  'provider': { '@id': 'https://www.ctcapp.com/#organization' },
  'serviceType': 'Specialized Freight',
  'description': '专为车展、巡演、超跑及概念车提供的保姆式运输服务。采用全封闭气囊减震厢式车，配备高保密协议团队。',
  'serviceArea': { '@type': 'Place', 'name': 'CN' },
  'areaServed': 'CN',
  'offers': {
    '@type': 'Offer',
    'description': '包含定额特种险与精准展位落位服务'
  }
}

useSchemaOrg(luxurySchema)
</script>
