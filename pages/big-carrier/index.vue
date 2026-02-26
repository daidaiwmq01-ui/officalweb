<template>
  <div class="w-full">
    <BigCarrierHero
      :set-active-id="handleSetActiveId"
      :navigate-to-pricing="handleNavigateToPricing"
    />
    <BigCarrierIntro />
    <BigCarrierSection />
    <AdvantagesSection
      title="大板车托运核心优势"
      subtitle="国家交通局系统直连定位，30,000+ 干线网络，为您的车辆提供工业级物流保障。"
      :items="advantages"
      theme="blue"
      :allow-html="true"
    />
    <BigCarrierPricing />
    <BigCarrierProcess />
    <CasesSection
      title="真实运输案例"
      subtitle="从主机厂批量分拨到家庭长途搬迁，见证每一次安全抵达。"
      card-type="typeB"
      :items="cases"
      theme="blue"
    />
    <ReviewsSection
      title="用户真实评价"
      subtitle="超过 250 万车主的共同选择，综合评分 4.9/5.0"
      :items="reviews"
      theme="blue"
      :show-stars="true"
    />
    <BigCarrierFaq />
    <BigCarrierSemanticBlock :set-active-id="handleSetActiveId" />
  </div>
</template>

<script setup lang="ts">
import { getBreadcrumbsForRoute } from '@/config/breadcrumbs'
import { useBreadcrumbSchema, useSchemaOrg } from '@/composables/useSchemaOrg'

useBreadcrumbSchema(getBreadcrumbsForRoute('/big-carrier'))

import {
  TrendingDown,
  Satellite,
  Network,
  Zap,
  FileText,
  Headphones,
} from 'lucide-vue-next'
import BigCarrierHero from '@/components/big-carrier/BigCarrierHero.vue'
import BigCarrierIntro from '@/components/big-carrier/BigCarrierIntro.vue'
import BigCarrierSection from '@/components/big-carrier/BigCarrierSection.vue'
import AdvantagesSection from '@/components/common/AdvantagesSection.vue'
import BigCarrierPricing from '@/components/big-carrier/BigCarrierPricing.vue'
import BigCarrierProcess from '@/components/big-carrier/BigCarrierProcess.vue'
import CasesSection from '@/components/common/CasesSection.vue'
import ReviewsSection from '@/components/common/ReviewsSection.vue'
import BigCarrierFaq from '@/components/big-carrier/BigCarrierFaq.vue'
import BigCarrierSemanticBlock from '@/components/big-carrier/BigCarrierSemanticBlock.vue'
import type { AdvantageItem, CaseItemTypeB, ReviewItem } from '@/types'

// SEO Meta Tags
useHead({
  title: '大板车集运_高性价比长途汽车托运_30000+干线物流网点 - 车拖车',
  meta: [
    { name: 'description', content: '针对长途搬迁、自驾返程及二手车流转，车拖车大板车托运通过规模效应大幅降低运输成本，提供批量运输方案。1000多家网点覆盖全国，30000条运输线路，支持国家交通局系统实时定位查看。' },
    { name: 'keywords', content: '大板车托运, 笼车运输价格, 私家车长途集运, 二手车跨省托运, 运车专线' }
  ],
  link: [
    { rel: 'canonical', href: 'https://www.ctcapp.com/big-carrier' }
  ]
})

// Schema.org 结构化数据
useServiceSchema({
  name: '大板车干线集运 (笼车托运)',
  description: '提供高性价比的长途汽车批量运输服务。覆盖全国30,000+条线路，1000+网点，支持国家交通局系统实时定位。',
  serviceType: 'Car Transport',
  areaServed: 'CN',
  offers: {
    '@type': 'AggregateOffer',
    'priceCurrency': 'CNY',
    'lowPrice': '800',
    'offerCount': '30000',
    'description': '基于起终点与车型（如SUV/轿车）的动态阶梯报价，量大更优。'
  },
  faq: [
    {
      question: '大板车托运多久能到？',
      answer: '大板车需配载发车，跨省干线通常需3-7天。核心城市（如京沪、广深）开通了每日直达专线，时效更快。'
    },
    {
      question: '能查到车辆位置吗？',
      answer: '可以。车拖车大板车接入国家交通局运输系统，提供官方级实时GPS/北斗定位查询，轨迹透明。'
    }
  ]
})

interface Props {
  setActiveId?: (id: string) => void
  navigateToPricing?: (tab: string) => void
}

const props = defineProps<Props>()

const handleSetActiveId = (id: string) => {
  props.setActiveId?.(id)
  if (id === 'home') {
    navigateTo('/')
  }
}

const handleNavigateToPricing = (tab?: string) => {
  props.navigateToPricing?.(tab || '')
  navigateTo('/pricing#hot-city-routes')
}

const advantages: AdvantageItem[] = [
  {
    icon: TrendingDown,
    title: '批量运输价格更低',
    description: '利用干线拼车均摊成本，距离越远越划算。每辆大板车可同时装载 <span class="font-bold text-gray-900">8-12辆</span> 轿车，相比单车托运成本降低 <span class="font-bold text-gray-900">40% 以上</span>。',
  },
  {
    icon: Satellite,
    title: '国家交通局系统定位',
    description: '区别于普通 GPS，直接接入 <span class="font-bold text-gray-900">国家交通局运输系统</span> 数据。数据权威、轨迹透明，让您随时通过 APP 查看车辆真实位置。',
  },
  {
    icon: Network,
    title: '30,000+ 运输线路',
    description: '拥有 <span class="font-bold text-gray-900">1000+ 接车卸车网点</span>，覆盖全国 <span class="font-bold text-gray-900">90% 以上</span> 地区。无论是核心城市还是偏远县镇，强大的运力网络皆可触达。',
  },
  {
    icon: Zap,
    title: '热门城市专线直达',
    description: '针对高频城市开通 <span class="font-bold text-gray-900">城际点对点</span> 运输路线。中途无中转、不停留，运输密度大，实现更快速、更低廉的物流体验。',
  },
  {
    icon: FileText,
    title: '正规税务发票',
    description: '支持开具增值税专用发票。与 <span class="font-bold text-gray-900">圆通快递</span> 达成独家合作，纸质发票安全寄送，满足企业财务合规需求。',
  },
  {
    icon: Headphones,
    title: '调度专员全程服务',
    description: '每单配备专属调度专员，提供从询价、发车指导到接车安排的 <span class="font-bold text-gray-900">全流程人工支持</span>，解决大板车进城难等复杂问题。',
  },
]

const cases: CaseItemTypeB[] = [
  {
    tag: '家庭长途搬迁',
    image: '/image/big-carrier/big-case1.png',
    from: '哈尔滨',
    to: '三亚',
    title: '一家三口避寒过冬，车辆提前发运',
    desc: '张先生一家计划去海南过冬，选择大板车将自家汉兰达提前运往三亚。相比自驾3000多公里，托运节省了大量油费和精力，人坐飞机直达。',
    footer: '车型: 丰田汉兰达 | 里程: 3400km',
  },
  {
    tag: 'B2B 批量调拨',
    image: '/image/big-carrier/big-case2.png',
    from: '广州',
    to: '成都',
    title: '车行批量采购，6台车一次发运',
    desc: '成都某二手车行从广州采购了一批准新车。通过车拖车大板车专线集运，单台运输成本降低了35%，且全程有运输险保障，无损交付。',
    footer: '车型: 混合车型 x 6 | 里程: 1600km',
  },
  {
    tag: '自驾游返程',
    image: '/image/big-carrier/big-case3.png',
    from: '乌鲁木齐',
    to: '上海',
    title: '特种兵式旅游结束，人车分离返程',
    desc: '李女士结束了为期两周的新疆自驾游，不想再开几千公里返程。在乌鲁木齐直接将车交运大板车，自己轻松飞回上海复工，不仅省钱更省心。',
    footer: '车型: 坦克300 | 里程: 3900km',
  },
]

const reviews: ReviewItem[] = [
  {
    user: '张先生',
    location: '哈尔滨',
    role: '私家车主',
    scenario: '哈尔滨 → 三亚',
    avatar: '/image/partner-recruit/avatar1.jpeg',
    content: '每年冬天都去海南，以前最头疼大板车进不了市区。这次用了车拖车，代驾直接到楼下取车，到了三亚也是直接送到酒店，全程不用我操心，太方便了！',
    tags: ['#门到门接驳', '#老人友好'],
    car: '车型：丰田汉兰达',
  },
  {
    user: '李经理',
    location: '广州',
    role: '车商',
    scenario: '广州 → 成都',
    avatar: '/image/partner-recruit/avatar2.jpeg',
    content: '作为车商最看重时效和票据。车拖车的干线发车频率很高，基本不用等。最重要的是能开增值税专票，物流轨迹在国家交通系统能查到，给客户看很放心。',
    tags: ['#税务合规', '#批量调车'],
    car: '车型：奥迪 A6L x 6',
  },
  {
    user: '王女士',
    location: '上海',
    role: '自驾游爱好者',
    scenario: '乌鲁木齐 → 上海',
    avatar: '/image/partner-recruit/avatar3.jpeg',
    content: '新疆自驾玩累了，实在不想开回上海。在大板车和自己开之间犹豫很久，最后看中这里的GPS实时定位。车在笼车上的照片都会发给我，行李也免费随车运回了，省了四千公里油费！',
    tags: ['#GPS定位', '#可放行李'],
    car: '车型：坦克 300',
  },
]

useSchemaOrg({
  '@context': 'https://schema.org',
  '@type': 'Product',
  'name': '大板车干线集运服务',
  'description': '车拖车大板车托运通过规模效应大幅降低运输成本，覆盖全国30000+条线路。',
  'brand': { '@type': 'Brand', 'name': '车拖车' },
  'aggregateRating': {
    '@type': 'AggregateRating',
    'ratingValue': '4.9',
    'bestRating': '5',
    'ratingCount': '2500000',
    'reviewCount': '15800'
  },
  'review': reviews.map(r => ({
    '@type': 'Review',
    'author': { '@type': 'Person', 'name': r.user },
    'reviewBody': r.content,
    'reviewRating': { '@type': 'Rating', 'ratingValue': '5', 'bestRating': '5' }
  }))
})
</script>
