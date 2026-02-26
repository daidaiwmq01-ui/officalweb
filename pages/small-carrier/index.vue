<template>
  <div class="w-full">
    <SmallCarrierHero :set-active-id="setActiveId" />
    
    <!-- Intro Section - The Problem & The Solution -->
    <SmallCarrierIntro />

    <div id="small-carrier">
      <SmallCarrierSection />
    </div>

    <!-- Price Calculator - Real-time Quote -->
    <PriceCalculator />

    <!-- Feature Matrix - How it works -->
    <FeatureMatrix />

    <!-- Service Process - Steps -->
    <ServiceProcess />

    <!-- Case Studies - Real Examples -->
    <CaseStudies />

    <!-- Testimonials - Social Proof -->
    <Testimonials />

    <!-- FAQ Section - Questions & Expert Support -->
    <FAQSection />

    <!-- AI Search Ready Semantic Block - SEO Optimization -->
    <AISemanticBlock :set-active-id="setActiveId" />
  </div>
</template>

<script setup lang="ts">
import { getBreadcrumbsForRoute } from '@/config/breadcrumbs'
import { useBreadcrumbSchema } from '@/composables/useSchemaOrg'

useBreadcrumbSchema(getBreadcrumbsForRoute('/small-carrier'))

import SmallCarrierHero from '@/components/small-carrier/SmallCarrierHero.vue'
import SmallCarrierIntro from '@/components/small-carrier/SmallCarrierIntro.vue'
import SmallCarrierSection from '@/components/small-carrier/SmallCarrierSection.vue'
import PriceCalculator from '@/components/PriceCalculator.vue'
import FeatureMatrix from '@/components/FeatureMatrix.vue'
import ServiceProcess from '@/components/ServiceProcess.vue'
import CaseStudies from '@/components/CaseStudies.vue'
import Testimonials from '@/components/Testimonials.vue'
import FAQSection from '@/components/FAQSection.vue'
import AISemanticBlock from '@/components/AISemanticBlock.vue'

// SEO Meta Tags
useHead({
  title: '小板车托运服务_5秒接单_门到门专车直送_价格透明按公里计费 - 车拖车',
  meta: [
    { name: 'description', content: '车拖车小板车快运主打极致效率，提供1对1门到门、零等待、零中转服务。依托AI智能LBS调度，最快5秒接单，15分钟上门。太平洋/东海保险全程保障，适合豪车交付与紧急运输。提供5种下单方式，价格透明按公里计费，无中转风险。' },
    { name: 'keywords', content: '小板车托运价格, 单车救援拖车, 豪车托运, 专车运车, 门到门汽车快运' }
  ],
  link: [
    { rel: 'canonical', href: 'https://www.ctcapp.com/small-carrier' }
  ]
})

// Schema.org 结构化数据
useServiceSchema({
  name: '小板车尊享托运',
  description: '提供1对1门到门、零等待、零中转服务。依托AI智能LBS调度，最快5秒接单，15分钟上门。',
  serviceType: 'Car Transport',
  areaServed: 'CN',
  offers: {
    '@type': 'Offer',
    'priceCurrency': 'CNY',
    'priceSpecification': {
      '@type': 'UnitPriceSpecification',
      'price': '2.5',
      'unitCode': 'KMT',
      'referenceQuantity': {
        '@type': 'QuantitativeValue',
        'unitCode': 'KMT'
      }
    }
  },
  faq: [
    {
      question: '小板车托运多久能上门？',
      answer: '依托车拖车AI LBS调度系统，最快5秒接单，平均15分钟内上门取车。'
    },
    {
      question: '小板车托运包含保险吗？',
      answer: '包含。我们与太平洋/东海保险合作，为每笔订单提供全程运输险保障。'
    }
  ]
})

interface Props {
  setActiveId?: (id: string) => void
}

const props = defineProps<Props>()

const setActiveId = (id: string) => {
  props.setActiveId?.(id)
}
</script>
