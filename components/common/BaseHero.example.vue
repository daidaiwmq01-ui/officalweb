<!--
  BaseHero 组件使用示例
  这个文件展示了如何使用 BaseHero 组件
-->

<template>
  <!-- 示例 1: 使用 Props 配置（推荐用于简单场景） -->
  <BaseHero
    background-image="https://images.unsplash.com/photo-1234567890"
    image-alt="大板车托运服务"
    :breadcrumbs="breadcrumbs"
    :title="title"
    subtitle="1000+ 网点遍布全国，批量运输大幅降低成本，实时交通局系统定位保障车辆轨迹透明。"
    :buttons="buttons"
    :features="features"
  />

  <!-- 示例 2: 使用 Slots 配置（推荐用于复杂场景） -->
  <BaseHero
    background-image="https://images.unsplash.com/photo-1234567890"
    image-alt="小板车托运服务"
    :breadcrumbs="breadcrumbs"
  >
    <template #title>
      <h1
        v-motion
        :initial="{ opacity: 0, y: 32 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="text-[42px] font-bold text-white leading-tight drop-shadow-lg"
      >
        小板车尊享托运：
        <span class="text-brand-orange">5 秒接单</span>
        <br />门到门专车直送的时效标杆
      </h1>
    </template>

    <template #subtitle>
      <p
        v-motion
        :initial="{ opacity: 0, y: 32 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 200 } }"
        class="text-[18px] text-gray-100 font-normal leading-relaxed drop-shadow-md"
      >
        即刻出发、无需拼车、零中转风险，依托自研 AI 智能 LBS 调度系统，实现 15 分钟极速响应。
      </p>
    </template>

    <template #cta>
      <div
        v-motion
        :initial="{ opacity: 0, y: 32 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 400 } }"
        class="flex flex-col sm:flex-row gap-4"
      >
        <button
          @click="handleOrder"
          class="h-14 px-8 rounded-full bg-brand-orange text-white font-bold text-lg flex items-center justify-center gap-2 transition-all hover:shadow-lg border-none cursor-pointer"
        >
          <span>立即下单</span>
          <Calculator :size="20" />
        </button>

        <NuxtLink
          to="/pricing"
          class="h-14 px-8 rounded-full border-2 border-white text-white font-bold text-lg flex items-center justify-center gap-2 bg-transparent transition-all hover:bg-white hover:text-brand-blue cursor-pointer"
        >
          <span>价格查询</span>
        </NuxtLink>
      </div>
    </template>

    <template #features>
      <div class="flex items-center gap-2 text-white/90">
        <ShieldCheck class="w-5 h-5 text-brand-orange" />
        <span class="text-[14px]">太平洋/东海保险</span>
      </div>
      <div class="w-[1px] h-4 bg-white/20 hidden sm:block" />
      <div class="flex items-center gap-2 text-white/90">
        <Users class="w-5 h-5 text-brand-blue" />
        <span class="text-[14px]">70万+ 认证运力</span>
      </div>
    </template>
  </BaseHero>
</template>

<script setup lang="ts">
import { Calculator, ShieldCheck, Users, TrendingUp } from 'lucide-vue-next'
import BaseHero from './BaseHero.vue'

// 面包屑配置
const breadcrumbs = [
  { label: '首页', link: true, onClick: () => navigateTo('/') },
  { label: '汽车托运', link: false },
  { label: '大板车托运', link: false }
]

// 标题（支持 HTML）
const title = `大板车干线集运：覆盖全国
<span class="text-brand-orange">30,000 条线路</span>
<br />的
<span class="text-brand-orange">高性价比</span>
托运方案`

// 按钮配置
const buttons = [
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
]

// 特性/信任指标配置
const features = [
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

const handleOrder = () => {
  // 处理下单逻辑
  console.log('下单')
}
</script>
