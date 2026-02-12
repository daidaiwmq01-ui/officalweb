/**
 * Hero 组件配置数据
 * 统一管理各个页面的 Hero 配置
 */

import { Calculator, TrendingUp, ShieldCheck, Users, Clock } from 'lucide-vue-next'
import type { BreadcrumbItem, ButtonConfig, FeatureItem } from '~/components/common/BaseHero.vue'

// ==================== 面包屑配置 ====================

export const createBreadcrumbs = (items: Array<{ label: string; path?: string }>): BreadcrumbItem[] => {
  return items.map((item, index) => ({
    label: item.label,
    link: index === 0, // 只有首页可点击
    onClick: index === 0 ? () => navigateTo('/') : undefined
  }))
}

// ==================== 大板车托运 Hero ====================

export const bigCarrierHero = {
  backgroundImage: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2000',
  imageAlt: '大板车干线集运',
  breadcrumbs: createBreadcrumbs([
    { label: '首页' },
    { label: '汽车托运' },
    { label: '大板车托运' }
  ]),
  title: `大板车干线集运：覆盖全国
<span class="text-brand-orange">30,000 条线路</span>
<br />的
<span class="text-brand-orange">高性价比</span>
托运方案`,
  subtitle: '1000+ 网点遍布全国，批量运输大幅降低成本，实时交通局系统定位保障车辆轨迹透明。',
  buttons: [
    {
      label: '获取干线报价',
      variant: 'primary' as const,
      href: '/pricing#pricing-calculator',
      icon: Calculator
    },
    {
      label: '查看热门线路',
      variant: 'secondary' as const,
      href: '/pricing#hot-city-routes',
      icon: TrendingUp
    }
  ],
  features: [
    {
      label: '太平洋/东海保险',
      icon: ShieldCheck,
      iconColor: 'text-brand-orange'
    },
    {
      label: '70万+ 认证运力',
      icon: Users,
      iconColor: 'text-brand-blue'
    },
    {
      label: '2500万+ 安全交付',
      icon: TrendingUp,
      iconColor: 'text-green-400'
    }
  ]
}

// ==================== 小板车托运 Hero ====================

export const smallCarrierHero = {
  backgroundImage: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2000',
  imageAlt: '车拖车小板车托运',
  breadcrumbs: createBreadcrumbs([
    { label: '首页' },
    { label: '汽车托运' },
    { label: '小板车托运' }
  ]),
  title: `小板车尊享托运：
<span class="text-brand-orange">5 秒接单</span>
<br />门到门专车直送的时效标杆`,
  subtitle: '即刻出发、无需拼车、零中转风险，依托自研 AI 智能 LBS 调度系统，实现 15 分钟极速响应。',
  buttons: [
    {
      label: '立即下单',
      variant: 'primary' as const,
      // onClick 需要在组件中定义
    },
    {
      label: '价格查询',
      variant: 'secondary' as const,
      href: '/pricing#pricing-calculator'
    }
  ],
  features: [
    {
      label: '太平洋/东海保险',
      icon: ShieldCheck,
      iconColor: 'text-brand-orange'
    },
    {
      label: '70万+ 认证运力',
      icon: Users,
      iconColor: 'text-brand-blue'
    },
    {
      label: '15分钟极速响应',
      icon: Clock,
      iconColor: 'text-green-400'
    }
  ]
}

// ==================== 代驾服务 Hero ====================

export const valetHero = {
  backgroundImage: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2000',
  imageAlt: 'Professional Valet Service',
  breadcrumbs: createBreadcrumbs([
    { label: '首页' },
    { label: '汽车托运' },
    { label: '代驾取送车' }
  ]),
  title: `专业代驾取送服务：打通汽车托运
<br />"<span class="text-brand-orange">最后一公里</span>"的数字化桥梁`,
  subtitle: '不仅是代驾取送，更是大板车末端接驳助手。专业"第一检测人"执行标准化验车，实现随停随走的定制化路线。',
  buttons: [
    {
      label: '预约代驾接驳',
      variant: 'primary' as const,
      // onClick 需要在组件中定义
    },
    {
      label: '查看接驳费用',
      variant: 'secondary' as const,
      // onClick 需要在组件中定义
      icon: Calculator
    }
  ],
  features: [
    {
      label: '专业代驾团队',
      icon: Users,
      iconColor: 'text-brand-blue'
    },
    {
      label: '标准化验车',
      icon: ShieldCheck,
      iconColor: 'text-brand-orange'
    },
    {
      label: '随停随走',
      icon: Clock,
      iconColor: 'text-green-400'
    }
  ]
}

// ==================== 导出所有配置 ====================

export const heroConfigs = {
  bigCarrier: bigCarrierHero,
  smallCarrier: smallCarrierHero,
  valet: valetHero,
}
