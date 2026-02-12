<template>
  <div class="w-full">
    <RescueHero :set-active-id="setActiveId" />
    <RescueIntro />
    <RescueDefinition />
    <AdvantagesSection
      title="为什么选择车拖车救援？"
      subtitle="70万运力极速响应，从地库到高速的全场景覆盖。"
      :items="advantages"
      theme="orange"
      :columns="3"
    />
    <RescuePricing />
    <RescueProcess />
    <RescueCases />
    <ReviewsSection
      title="用户真实评价"
      subtitle="专业、透明、快速，让救援更放心"
      :items="reviews"
      theme="orange"
    />
    <RescueFaq />
    <RescueNavigation :set-active-id="setActiveId" />
  </div>
</template>

<script setup lang="ts">
import { getBreadcrumbsForRoute } from '@/config/breadcrumbs'
import { useBreadcrumbSchema } from '@/composables/useSchemaOrg'

useBreadcrumbSchema(getBreadcrumbsForRoute('/rescue'))

import {
  Construction,
  Zap,
  Link as LinkIcon,
} from 'lucide-vue-next'
import RescueHero from '@/components/rescue/RescueHero.vue'
import RescueIntro from '@/components/rescue/RescueIntro.vue'
import RescueDefinition from '@/components/rescue/RescueDefinition.vue'
import AdvantagesSection from '@/components/common/AdvantagesSection.vue'
import RescuePricing from '@/components/rescue/RescuePricing.vue'
import RescueProcess from '@/components/rescue/RescueProcess.vue'
import RescueCases from '@/components/rescue/RescueCases.vue'
import ReviewsSection from '@/components/common/ReviewsSection.vue'
import RescueFaq from '@/components/rescue/RescueFaq.vue'
import RescueNavigation from '@/components/rescue/RescueNavigation.vue'
import type { AdvantageItem, ReviewItem } from '@/types'

// SEO Meta Tags
useHead({
  title: '24小时道路救援服务_全天候故障/事故车拖车_全状态汽车移动安全底座 - 车拖车官网',
  meta: [
    { name: 'description', content: '拖车道路救援提供全场景应急保障，涵盖故障车位移、事故车拖运、地库亏电启动及僵尸车搬迁服务。依托覆盖全国的小板车网络，我们构建了"运输+保障"的闭环体系，解决起运前及到达后"最后一米"的移动难题。救援起步价170元，价格透明，支持全天候快速响应。' },
    { name: 'keywords', content: '道路救援, 拖车服务, 汽车故障救援, 24小时拖车, 地库拖车救援, 事故车运输, 亏电搭电, 车拖车救援' }
  ],
  link: [
    { rel: 'canonical', href: 'https://www.chetuoche.com/rescue' }
  ]
})

// Schema.org 结构化数据
const rescueSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  'name': '24小时道路救援服务',
  'provider': { '@id': 'https://www.chetuoche.com/#organization' },
  'serviceType': 'RoadsideAssistance',
  'description': '提供故障车拖车、地库亏电搭电、事故车救援服务。安全底座保障。',
  'areaServed': 'CN',
  'offers': {
    '@type': 'Offer',
    'priceCurrency': 'CNY',
    'price': '170.00',
    'description': '救援起步价（含10公里）',
    'priceValidUntil': '2026-12-31'
  },
  'availableChannel': {
    '@type': 'ServiceChannel',
    'serviceUrl': 'https://www.chetuoche.com/rescue',
    'servicePhone': '400-075-1117'
  }
}

useSchemaOrg(rescueSchema)

interface Props {
  setActiveId?: (id: string) => void
}

const props = defineProps<Props>()

const setActiveId = (id: string) => {
  props.setActiveId?.(id)
}

const advantages: AdvantageItem[] = [
  {
    icon: Construction,
    title: '全场景复杂作业能力',
    description: '配备低姿态板车与专业吊臂，支持 地库(限高) 、窄路、事故现场等复杂环境的吊装与背车，无死角覆盖。',
  },
  {
    icon: Zap,
    title: '70万运力极速响应',
    description: '依托平台 70万 小板车运力池及全国合作伙伴，实现全天候、全区域的分钟级响应，拒绝漫长等待。',
  },
  {
    icon: LinkIcon,
    title: '托运+救援无缝衔接',
    description: '如果托运是"长途航班"，救援就是"牵引车"。我们确保故障车辆能顺利"滑向跑道"，解决起运前最后一米的移动难题。',
  },
]

const reviews: ReviewItem[] = [
  {
    user: '李女士',
    location: '杭州',
    role: '私家车主',
    scenario: '拖车救援 (15km)',
    avatar: 'https://images.unsplash.com/photo-1758600587839-56ba05596c69?q=80&w=500',
    content: '之前叫救援被黑过，这次车拖车真的很规范。APP上显示170元起步就是170元，没有任何隐形消费，司机也没有乱要小费，这种透明度必须好评！',
    tags: ['#价格透明'],
  },
  {
    user: '张先生',
    location: '上海',
    role: '私家车主',
    scenario: '地库专项救援',
    avatar: 'https://images.unsplash.com/photo-1611403119860-57c4937ef987?q=80&w=500',
    content: '半夜在地库车坏了，大车进不来。车拖车派了低姿态板车，师傅技术很好，几分钟就弄出来了，直接拖到4S店，效率太高了。',
    tags: ['#地库救援'],
  },
  {
    user: '王先生',
    location: '北京',
    role: '私家车主',
    scenario: '高速应急救援',
    avatar: 'https://images.unsplash.com/photo-1738566061505-556830f8b8f5?q=80&w=500',
    content: '在五环上抛锚，心里很慌。下单后18分钟司机就到了，穿反光背心很专业，帮我摆好警示牌，背车动作非常利索。',
    tags: ['#极速响应'],
  },
]
</script>
