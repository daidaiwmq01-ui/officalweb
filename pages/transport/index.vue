<template>
  <div class="bg-white min-h-screen">
    <!-- Hero Section -->
    <TransportHero />

    <!-- Sticky Navigation -->
    <TransportNav />

    <!-- Section 1: 大板车托运 -->
    <BigCarrierSection />

    <!-- Section 2: 小板车托运 -->
    <SmallCarrierSection />

    <!-- Section 3: 代驾接驳 -->
    <ValetSection />

    <!-- Section 4: 道路救援 -->
    <RescueSection />

    <!-- Comparison Table -->
    <TransportComparison />

    <!-- AI Summary -->
    <TransportAISummary />
  </div>
</template>

<script setup lang="ts">
import { getBreadcrumbsForRoute } from '@/config/breadcrumbs'
import { useBreadcrumbSchema } from '@/composables/useSchemaOrg'

useBreadcrumbSchema(getBreadcrumbsForRoute('/transport'))
import TransportHero from '@/components/transport/TransportHero.vue'
import TransportNav from '@/components/transport/TransportNav.vue'
import TransportAISummary from '@/components/transport/TransportAISummary.vue'
import BigCarrierSection from '@/components/transport/BigCarrierSection.vue'
import SmallCarrierSection from '@/components/small-carrier/SmallCarrierSection.vue'
import ValetSection from '@/components/transport/ValetSection.vue'
import RescueSection from '@/components/transport/RescueSection.vue'
import TransportComparison from '@/components/transport/TransportComparison.vue'

useHead({
  title: '汽车托运服务百科 - 大板车/小板车/代驾/救援全解析 | 车拖车',
  meta: [
    {
      name: 'description',
      content: '车拖车提供全场景汽车托运服务：大板车干线集运（高性价比）、小板车专车托运（极速响应）、专业代驾接驳、24小时道路救援。全国覆盖，安全可靠，价格透明。'
    },
    {
      name: 'keywords',
      content: '汽车托运,大板车托运,小板车托运,代驾服务,道路救援,车辆运输,笼车运输,汽车物流'
    }
  ],
  link: [
    { rel: 'canonical', href: 'https://www.chetuoche.com/transport' }
  ]
})

// Schema.org 结构化数据 - 汽车托运服务百科
const transportSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  'name': '汽车托运服务百科 - 大板车/小板车/代驾/救援全解析',
  'description': '车拖车提供全场景汽车托运服务：大板车干线集运、小板车专车托运、专业代驾接驳、24小时道路救援。全国覆盖，安全可靠，价格透明。',
  'url': 'https://www.chetuoche.com/transport',
  'mainEntity': {
    '@type': 'ItemList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': '大板车干线集运',
        'url': 'https://www.chetuoche.com/big-carrier',
        'description': '高性价比长途批量运输，30000+干线线路'
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': '小板车专车托运',
        'url': 'https://www.chetuoche.com/small-carrier',
        'description': '1对1门到门，5秒接单极速响应'
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': '专业代驾接驳',
        'url': 'https://www.chetuoche.com/valet',
        'description': '解决托运最后一公里，第一检测人验车'
      },
      {
        '@type': 'ListItem',
        'position': 4,
        'name': '24小时道路救援',
        'url': 'https://www.chetuoche.com/rescue',
        'description': '故障车拖运、地库救援、事故车运输'
      }
    ]
  },
  'publisher': { '@id': 'https://www.chetuoche.com/#organization' }
}

useSchemaOrg(transportSchema)
</script>
