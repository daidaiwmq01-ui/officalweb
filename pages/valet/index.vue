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
import { useBreadcrumbSchema, useSchemaOrg, useFAQPageSchema } from '@/composables/useSchemaOrg'

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

// SEO Meta Tags - 使用新的 usePageSeo
usePageSeo({
  title: '汽车代驾取送服务_解决托运最后一公里_长途代驾专人直达 - 车拖车',
  description: '打通汽车托运末端服务盲区，代驾员充当"第一检测人"进行标准化验车。无论是大板车市区接驳，还是专人专车的长途代驾，提供GPS/北斗全流程监控，随停随走，安全无忧。',
  keywords: '汽车代驾取送, 托运末端接驳, 长途代驾价格, 门到门送车服务, 代驾验车',
  image: '/image/valet/og-valet.webp'
})

// Schema.org 结构化数据
const valetSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  'name': '专业汽车代驾取送服务',
  'provider': { '@id': 'https://newweb.chetuoche.net/#organization' },
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

useFAQPageSchema([
  {
    question: '车拖车代驾和普通代驾（如滴滴/e代驾）有什么区别？',
    answer: '核心区别在于物流属性。普通代驾侧重于把人送回家，车拖车侧重于把车安全送达。我们的司机受过专业商品车物流培训，执行独有的"第一检测人"验车标准（含外观、随车物品及动态检测），且投保的是全额物流责任险而非普通代驾险。'
  },
  {
    question: '代驾费用是如何计算的？',
    answer: '费用由 "起步价 + 里程费" 组成。起步价为 75.6元（含20公里），超出部分按阶梯里程计费。相比大板车，短途接驳更划算；相比传统长途代驾，综合成本低约 30%。下单前输入起终点即可获得一口价。'
  },
  {
    question: '车辆在代驾过程中发生事故怎么办？',
    answer: '请完全放心。每笔订单均包含高额物流责任险。若发生交通事故或车辆剐蹭，由平台对接保险公司进行定损赔付，全程无需车主介入，保障您的资产安全。'
  },
  {
    question: '我可以指定行驶路线吗？',
    answer: '可以。与板车运输不同，代驾服务支持"随停随走"。您可以指定行驶路线，甚至在途中经停办事或接人。全程 GPS+北斗双模监控确保司机按您的指令行驶，杜绝私自绕路。'
  },
  {
    question: '代驾能帮我把车从物流园取回来吗？',
    answer: '当然可以。这是我们的核心场景之一。您只需提供大板车提车单或物流园联系方式，代驾员会作为您的代理人前往园区验车、提车，并直接送至您家楼下。'
  }
])

interface Props {
  setActiveId?: (id: string) => void
}

const props = defineProps<Props>()

const setActiveId = (id: string) => {
  props.setActiveId?.(id)
}

// HowTo Schema - 专业代驾流程
useSchemaOrg({
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  'name': '如何使用车拖车专业代驾服务',
  'description': '车拖车专业代驾提供门到门接驳服务，解决大板车无法进城的最后一公里难题。代驾员充当"第一检测人"执行标准化验车。',
  'step': [
    {
      '@type': 'HowToStep',
      'name': '预约代驾',
      'text': '通过车拖车APP或400电话预约代驾服务。提供取车和送车地址，系统自动计算费用（起步价150元含20公里）。',
      'position': 1
    },
    {
      '@type': 'HowToStep',
      'name': '上门取车',
      'text': '代驾员准时到达取车地点，进行360°视频验车，记录车辆外观、仪表里程和随车物品。签署电子合同。',
      'position': 2
    },
    {
      '@type': 'HowToStep',
      'name': '专人驾驶',
      'text': '代驾员点火即走，专人专车直达目的地。全程GPS+北斗双模定位，实时查看车速、轨迹及位置。',
      'position': 3
    },
    {
      '@type': 'HowToStep',
      'name': '门到门送达',
      'text': '代驾员将车辆直接送到指定地址（支持地下车库车位）。真正实现门到门无缝衔接，解决最后一公里难题。',
      'position': 4
    },
    {
      '@type': 'HowToStep',
      'name': '验车交接',
      'text': '到达后再次验车，核对车辆状态与里程。确认无误后在APP签收，完成服务。',
      'position': 5
    }
  ],
  'totalTime': 'PT4H'
})

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
    avatar: '/image/valet/avatar1.webp',
    content: '以前运车最怕去五环外的物流园取车，打车费劲还耽误时间。这次用了车拖车代驾，司机直接把车送到了我家地库。最让我放心的是验车特别仔细，车身的旧划痕都拍得清清楚楚，比我自己看得还细！',
    tags: ['#验车专业', '#省时省力']
  },
  {
    user: '赵先生',
    location: '上海',
    role: '商务人士',
    scenario: '上海→南京 紧急用车',
    avatar: '/image/valet/avatar2.webp',
    content: '因为临时要用车去南京，板车来不及，就试了长途代驾。司机师傅素质很高，穿制服戴白手套，全程没抽烟。APP上能看到车速和位置，3个半小时就到了，确实是时间确定性最高的选择。',
    tags: ['#时效极快', '#服务规范']
  },
  {
    user: '孙经理',
    location: '杭州',
    role: '某品牌4S店',
    scenario: '跨店调车',
    avatar: '/image/valet/avatar3.webp',
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
