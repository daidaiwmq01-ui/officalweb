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

// SEO Meta Tags - 使用新的 usePageSeo
usePageSeo({
  title: '小板车托运服务_5秒接单_门到门专车直送_价格透明按公里计费 - 车拖车',
  description: '车拖车小板车快运主打极致效率，提供1对1门到门、零等待、零中转服务。依托AI智能LBS调度，最快5秒接单，15分钟上门。太平洋/东海保险全程保障，适合豪车交付与紧急运输。提供5种下单方式，价格透明按公里计费，无中转风险。',
  keywords: '小板车托运价格, 单车救援拖车, 豪车托运, 专车运车, 门到门汽车快运',
  image: '/image/small-carrier/og-small-carrier.webp'
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
      question: '小板车托运比大板车贵多少？什么情况下值得选择？',
      answer: '小板车价格通常是大板车的 2-3 倍。但对于紧急送车（当天/次日必达）、豪车/新车（避免装卸风险）、短途运输（200km内性价比高）及隐私需求等场景强烈推荐。时效性、安全性是小板车的核心价值。'
    },
    {
      question: '15分钟上门是怎么做到的？',
      answer: '车拖车自研的AI智能LBS调度系统，实时追踪全国70万+运力位置。下单瞬间，系统自动匹配距您最近且空闲的运力。司机平均5秒接单，若在10公里范围内，最快15分钟即可上门。'
    },
    {
      question: '车辆运输过程中发生损伤怎么办？',
      answer: '每笔小板车订单均包含全额运输保险，最高赔付可达车辆评估价。若发生车损，司机取车前会完整拍照验车建立基准，运输途中如有损伤交付时立即拍照留证，平台介入保险理赔3-5个工作日赔付到账。'
    },
    {
      question: '能运输改装车、超跑或特殊车型吗？',
      answer: '可以。小板车支持绝大多数车型，包括低趴改装车（液压平板0°装卸）、超跑/跑车（全密封厢式运输）、皮卡/房车（定制化方案）及新能源车（配备专业固定装置）。下单时请备注车型特殊性。'
    },
    {
      question: '可以指定取车和送车的具体时间吗？',
      answer: '可以。小板车专车专送模式支持预约时间窗口。您可以在下单时选择取车时间和送达时间。司机会提前15分钟电话通知，确保无缝对接。'
    },
    {
      question: '小板车托运适合跨省长途吗？',
      answer: '非常适合。小板车专车直达，无需等待拼车或中转卸货，是所有托运方式中时效最确定的。跨省长途（如北京-上海 1200km）通常1-2天送达。若预算充足且追求效率，小板车是长途托运的最佳选择。'
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

// HowTo Schema - 小板车托运流程
useSchemaOrg({
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  'name': '如何使用小板车托运您的汽车',
  'description': '车拖车小板车托运提供1对1门到门专车直送服务，AI智能调度，5秒接单，15分钟上门。',
  'step': [
    {
      '@type': 'HowToStep',
      'name': '在线下单',
      'text': '通过车拖车APP、小程序、官网、400电话或微信客服任一渠道下单。输入起终点和车型，系统自动报价。',
      'position': 1
    },
    {
      '@type': 'HowToStep',
      'name': '极速接单',
      'text': 'AI LBS智能调度系统自动匹配最近的司机，最快5秒接单，平均15分钟内上门取车。',
      'position': 2
    },
    {
      '@type': 'HowToStep',
      'name': '视频验车',
      'text': '司机到达后进行360°环车视频录像，记录车辆状态。签署电子合同，确认随车物品。',
      'position': 3
    },
    {
      '@type': 'HowToStep',
      'name': '专车直送',
      'text': '1对1门到门运输，零中转零等待。全程GPS+北斗双模定位，实时查看车辆位置。',
      'position': 4
    },
    {
      '@type': 'HowToStep',
      'name': '验车签收',
      'text': '到达目的地后，核对车辆外观与里程。小板车应保持0里程增加。确认无误后在APP签收。',
      'position': 5
    }
  ],
  'totalTime': 'PT24H'
})
</script>
