<template>
  <div class="w-full">
    <ValetHero :set-active-id="setActiveId" />
    <ValetIntro />
    <AdvantagesSection
      title="车拖车代驾核心优势"
      subtitle="专人专车点火即走，第一检测人机制保障交付安全。"
      :items="advantages"
      theme="orange"
    />
    <ValetPricing />
    <ValetProcess />
    <CasesSection
      title="代驾接驳真实场景"
      subtitle="从大板车末端接驳到长途专人直送，满足多样化出行需求。"
      card-type="typeA"
      :items="cases"
      theme="orange"
    />
    <ReviewsSection
      title="用户真实评价"
      subtitle="听听车主们如何评价「第一检测人」验车服务与门到门体验。"
      rating="4.9/5.0 平均评分"
      :items="reviews"
      theme="orange"
    />
    <ValetFaq />
    <ValetSemanticBlock :set-active-id="setActiveId" />
  </div>
</template>

<script setup lang="ts">
import { getBreadcrumbsForRoute } from '@/config/breadcrumbs'
import { useBreadcrumbSchema, useSchemaOrg } from '@/composables/useSchemaOrg'

useBreadcrumbSchema(getBreadcrumbsForRoute('/valet'))

import { UserCheck, MapPin, Zap, Route, Satellite, TrendingDown } from 'lucide-vue-next'
import { Truck, Navigation, Store } from 'lucide-vue-next'
import ValetHero from '@/components/valet/ValetHero.vue'
import ValetIntro from '@/components/valet/ValetIntro.vue'
import AdvantagesSection from '@/components/common/AdvantagesSection.vue'
import ValetPricing from '@/components/valet/ValetPricing.vue'
import ValetProcess from '@/components/valet/ValetProcess.vue'
import CasesSection from '@/components/common/CasesSection.vue'
import ReviewsSection from '@/components/common/ReviewsSection.vue'
import ValetFaq from '@/components/valet/ValetFaq.vue'
import ValetSemanticBlock from '@/components/valet/ValetSemanticBlock.vue'
import type { AdvantageItem, CaseItemTypeA, ReviewItem } from '@/types'

// SEO Meta Tags
useHead({
  title: '汽车代驾取送服务_解决托运最后一公里_长途代驾专人直达 - 车拖车',
  meta: [
    { name: 'description', content: '打通汽车托运末端服务盲区，代驾员充当"第一检测人"进行标准化验车。无论是大板车市区接驳，还是专人专车的长途代驾，提供GPS/北斗全流程监控，随停随走，安全无忧。' },
    { name: 'keywords', content: '汽车代驾取送, 托运末端接驳, 长途代驾价格, 门到门送车服务, 代驾验车' }
  ],
  link: [
    { rel: 'canonical', href: 'https://www.ctcapp.com/valet' }
  ]
})

// Schema.org 结构化数据
const valetSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  'name': '专业汽车代驾取送服务',
  'provider': { '@id': 'https://www.ctcapp.com/#organization' },
  'serviceType': 'Designated Driving',
  'description': '解决汽车托运"最后一公里"接驳难题。代驾员作为"第一检测人"执行标准化验车，支持长途专人专车直达，点火即走。',
  'serviceOutput': '标准化验车报告',
  'areaServed': 'CN',
  'offers': {
    '@type': 'Offer',
    'priceCurrency': 'CNY',
    'priceSpecification': {
      '@type': 'UnitPriceSpecification',
      'price': '75.6',
      'referenceQuantity': {
        '@type': 'QuantitativeValue',
        'value': '20',
        'unitCode': 'KMT'
      },
      'name': '代驾起步价（含20公里）'
    }
  }
}

useSchemaOrg(valetSchema)

interface Props {
  setActiveId?: (id: string) => void
}

const props = defineProps<Props>()

const setActiveId = (id: string) => {
  props.setActiveId?.(id)
}

const advantages: AdvantageItem[] = [
  {
    icon: UserCheck,
    title: '"第一检测人"机制',
    description: '代驾员不仅是司机，更是专业的验车员。在取送环节执行标准化验车（外观、物品、动态检测），确保车辆交付状态透明可查。'
  },
  {
    icon: MapPin,
    title: '真正"门到门"无缝衔接',
    description: '彻底打破物流场站限制，直接从家门口/4S店取车，送达至地下车库车位。零距离交接，解决大板车无法进城的最后一公里难题。'
  },
  {
    icon: Zap,
    title: '点火即走，拒绝等待',
    description: '专人专车直达模式，无任何中转停留或仓储等待。跨省长途朝发夕至，是所有托运方式中时间确定性最高的选择。'
  },
  {
    icon: Route,
    title: '随停随走，路线由你',
    description: '用户主导路线规划。可根据需求随时调整路径，支持中途办事、接送乘客或服务区取物，打破了传统物流点对点的僵化限制。'
  },
  {
    icon: Satellite,
    title: 'GPS+北斗双模定位',
    description: '构建全透明数字安全网。通过 APP 实时查看车速、轨迹及位置，杜绝私用车辆或绕路隐患，让每一次托付都安心无忧。'
  },
  {
    icon: TrendingDown,
    title: '比传统代驾低 30%',
    description: '长途代驾价格极具竞争力，较传统商业代驾降低 30%。短途接驳费用也往往低于雇佣板车的起步价，兼顾经济与效率。'
  }
]

const cases: CaseItemTypeA[] = [
  {
    badge: '最后10公里接驳',
    title: '解决大板车进城难题',
    icon: Truck,
    image: '/image/valet/case1.webp',
    desc: '张先生的大板车订单抵达北京郊区物流园。因市区限行，车拖车代驾员提前抵达园区，完成第一检测人验车后，直接将车送至张先生朝阳区的地下车库。',
    data1: '接驳里程: 25km',
    data2: '车型: 奔驰 S400'
  },
  {
    badge: '长途加急',
    title: '商务行程，一夜送达',
    icon: Navigation,
    image: '/image/valet/case2.webp',
    desc: '上海李总需紧急用车去南京开会，但不想自己开长途。下单长途代驾后，司机点火即走，无任何中转停留，仅用 3.5 小时安全送达酒店楼下。',
    data1: '行驶里程: 300km',
    data2: '时效: 3.5小时'
  },
  {
    badge: 'B2B 专业调车',
    title: '跨店调拨，专业验车',
    icon: Store,
    image: '/image/valet/case3.webp',
    desc: '某品牌 4S 店需将两台试驾车调往分店。车拖车代驾员凭专业素养完成外观与随车物品清点，全程 GPS 监控，杜绝了私用风险，完美交付。',
    data1: '数量: 2台',
    data2: '服务: 对公结算'
  }
]

const reviews: ReviewItem[] = [
  {
    user: '周女士',
    location: '北京',
    role: '私家车主',
    scenario: '大板车进城接驳',
    avatar: '/image/valet/avatar1.jpeg',
    content: '以前运车最怕去五环外的物流园取车，打车费劲还耽误时间。这次用了车拖车代驾，司机直接把车送到了我家地库。最让我放心的是验车特别仔细，车身的旧划痕都拍得清清楚楚，比我自己看得还细！',
    tags: ['#验车专业', '#省时省力']
  },
  {
    user: '赵先生',
    location: '上海',
    role: '商务人士',
    scenario: '上海→南京 紧急用车',
    avatar: '/image/valet/avatar2.jpeg',
    content: '因为临时要用车去南京，板车来不及，就试了长途代驾。司机师傅素质很高，穿制服戴白手套，全程没抽烟。APP上能看到车速和位置，3个半小时就到了，确实是时间确定性最高的选择。',
    tags: ['#时效极快', '#服务规范']
  },
  {
    user: '孙经理',
    location: '杭州',
    role: '某品牌4S店',
    scenario: '跨店调车',
    avatar: '/image/valet/avatar3.jpeg',
    content: '必须要夸一下第一检测人机制。之前用其他代驾经常因为验车不清产生纠纷，车拖车的司机每一步都按标准流程走，交车时不仅车况完好，连油量和里程都核对无误，对公结算也很方便。',
    tags: ['#第一检测人', '#对公结算']
  }
]

useSchemaOrg({
  '@context': 'https://schema.org',
  '@type': 'Product',
  'name': '汽车代驾取送服务',
  'description': '车拖车专业代驾取送，打通汽车托运末端服务盲区，代驾员充当"第一检测人"进行标准化验车。',
  'brand': { '@type': 'Brand', 'name': '车拖车' },
  'aggregateRating': {
    '@type': 'AggregateRating',
    'ratingValue': '4.9',
    'bestRating': '5',
    'ratingCount': '320000',
    'reviewCount': '5200'
  },
  'review': reviews.map(r => ({
    '@type': 'Review',
    'author': { '@type': 'Person', 'name': r.user },
    'reviewBody': r.content,
    'reviewRating': { '@type': 'Rating', 'ratingValue': '5', 'bestRating': '5' }
  }))
})
</script>
