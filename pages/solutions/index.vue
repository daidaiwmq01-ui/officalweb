<template>
  <main class="w-full">
    <SolutionsHero :set-active-id="handleSetActiveId" />
    
    <!-- Solution 1: Digital Supply Chain -->
    <SolutionZigZag 
      title="数字化汽车供应链解决方案"
      subtitle="面向新车从厂家到 4S 店的高效铺货"
      :features="[
        'OTD 全周期缩短：从订单到交付全流程数字化监控',
        '零公里交付标准：专业板车运输，确保新车完美状态',
        '库存预警与动态调拨：基于大数据算法的智能仓储建议'
      ]"
      cta-text="查看供应链方案"
      :image-src="EXTERNAL_ASSETS.SOLUTIONS_DASHBOARD"
      @cta-click="handleCtaClick('/supply-chain')"
    />
    
    <!-- Solution 2: Commercial & High-End -->
    <SolutionZigZag 
      title="商业活动与高端定制方案"
      subtitle="面向车展、巡演及车友会活动"
      :tags="['全封闭厢式板车', '保密协议', '定额特种险']"
      cta-text="定制车展方案"
      :image-src="EXTERNAL_ASSETS.SOLUTIONS_LUXURY"
      :reverse="true"
      bg-color="bg-[#F8F9FB]"
      @cta-click="handleCtaClick('/luxury-transport')"
    />

    <!-- Solution 3: Personal Tourism -->
    <SolutionZigZag 
      title="个人旅游与异地托运方案"
      subtitle='让"人机分离"的自驾生活更简单'
      :features="[
        '智能透明报价：拒绝隐形消费，系统自动计算最优路径',
        '360° AI 验车：全方位拍照存证，区块链技术不可篡改',
        '门到门取送：专业司机上门接送车，全程管家式服务'
      ]"
      cta-text="开始托运"
      :image-src="EXTERNAL_ASSETS.SOLUTIONS_FAMILY"
      @cta-click="handleCtaClick('/personal-travel')"
    />

    <SecurityMoat />
    <SolutionsFAQ />
    <FinalCTABox :set-active-id="handleSetActiveId" />
  </main>
</template>

<script setup lang="ts">
import { getBreadcrumbsForRoute } from '@/config/breadcrumbs'
import { useBreadcrumbSchema } from '@/composables/useSchemaOrg'

useBreadcrumbSchema(getBreadcrumbsForRoute('/solutions'))


import SolutionsHero from '@/components/solutions/SolutionsHero.vue'
import SolutionZigZag from '@/components/solutions/SolutionsZigzag.vue'
import SecurityMoat from '@/components/solutions/SecurityMoat.vue'
import SolutionsFAQ from '@/components/solutions/SolutionsFaq.vue'
import FinalCTABox from '@/components/solutions/FinalCTABox.vue'
import { EXTERNAL_ASSETS } from '@/utils/images'
import { useRouter } from 'vue-router'

// SEO Meta Tags
useHead({
  title: '汽车托运行业解决方案中心_数字化供应链/商业活动/个人旅游 - 车拖车',
  meta: [
    { name: 'description', content: '为主机厂、车展方及个人用户提供全场景物流支撑。涵盖OTD可视化供应链、保姆式特种车托运及等保三级金融级安全防护方案。数字化技术重塑汽车物流信任标准。' },
    { name: 'keywords', content: '汽车供应链方案, 车展物流托运, 高端车定制运输, 物流数据安全, 托运平台等保三级' }
  ],
  link: [
    { rel: 'canonical', href: 'https://www.chetuoche.com/solutions' }
  ]
})

// Schema.org 结构化数据
const solutionsSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  'name': '车拖车行业解决方案中心',
  'description': '面向主机厂、商业活动及个人提供全场景物流解决方案。涵盖OTD可视化供应链、保姆式特种车托运及等保三级安全防护。',
  'mainEntity': {
    '@type': 'ItemList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': '汽车供应链数字化解决方案',
        'url': 'https://www.chetuoche.com/supply-chain',
        'description': '缩短OTD周期，实现"零公里"交付，支持4S店动态调拨。'
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': '商业活动特种托运方案',
        'url': 'https://www.chetuoche.com/luxury-transport',
        'description': '全封闭厢式车运输，气囊减震，服务车展与超跑巡演。'
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': '个人旅游托运方案',
        'url': 'https://www.chetuoche.com/personal-travel',
        'description': '让远方触手可及，支持三亚过冬、进藏朝圣等场景。'
      }
    ]
  }
}

useSchemaOrg(solutionsSchema)

interface Props {
  setActiveId?: (id: string) => void
}

const props = defineProps<Props>()

const router = useRouter()

const handleSetActiveId = (id: string) => {
  props.setActiveId?.(id)
}

const handleCtaClick = (path: string) => {
  router.push(path)
}
</script>
