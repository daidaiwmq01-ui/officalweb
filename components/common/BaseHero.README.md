# BaseHero 组件使用文档

## 📖 概述

`BaseHero` 是一个通用的页面顶部英雄区域组件，用于替代各个业务页面中重复的 Hero 组件代码。

## ✨ 特性

- 🎨 **高度可定制** - 支持通过 props 和 slots 灵活配置
- 📱 **响应式设计** - 完美适配移动端和桌面端
- 🎭 **动画效果** - 内置平滑的进入动画
- 🧩 **插槽支持** - 支持完全自定义内容
- 🎯 **类型安全** - 完整的 TypeScript 类型定义
- 🚀 **性能优化** - 图片懒加载和回退处理

## 📦 安装

组件已内置，无需额外安装。

```vue
import BaseHero from '~/components/common/BaseHero.vue'
```

## 🚀 基础用法

### 方式 1: 使用 Props（推荐用于简单场景）

```vue
<template>
  <BaseHero
    background-image="https://images.unsplash.com/photo-123456"
    image-alt="服务背景图"
    :breadcrumbs="breadcrumbs"
    title="您的标题内容"
    subtitle="您的副标题内容"
    :buttons="buttons"
    :features="features"
  />
</template>

<script setup lang="ts">
import { Calculator, ShieldCheck } from 'lucide-vue-next'

const breadcrumbs = [
  { label: '首页', link: true, onClick: () => navigateTo('/') },
  { label: '服务', link: false },
  { label: '详情', link: false }
]

const buttons = [
  {
    label: '立即咨询',
    variant: 'primary',
    href: '/contact'
  },
  {
    label: '查看价格',
    variant: 'secondary',
    href: '/pricing',
    icon: Calculator
  }
]

const features = [
  {
    label: '专业服务',
    icon: ShieldCheck,
    iconColor: 'text-brand-orange'
  }
]
</script>
```

### 方式 2: 使用配置文件（推荐用于复杂项目）

```vue
<template>
  <BaseHero v-bind="heroConfigs.bigCarrier" />
</template>

<script setup lang="ts">
import { heroConfigs } from '~/data/hero-configs'
</script>
```

### 方式 3: 使用 Slots（推荐用于高度自定义）

```vue
<template>
  <BaseHero
    background-image="https://images.unsplash.com/photo-123456"
    :breadcrumbs="breadcrumbs"
  >
    <template #title>
      <h1 class="text-[48px] font-bold text-white">
        自定义标题 <span class="text-brand-orange">高亮部分</span>
      </h1>
    </template>

    <template #subtitle>
      <p class="text-[18px] text-gray-100">
        自定义副标题内容
      </p>
    </template>

    <template #cta>
      <div class="flex gap-4">
        <button @click="handleClick">自定义按钮</button>
      </div>
    </template>

    <template #features>
      <div>自定义特性区域</div>
    </template>
  </BaseHero>
</template>
```

## 🎛️ Props 配置

### 背景相关

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `backgroundImage` | `string` | - | 背景图片 URL |
| `imageAlt` | `string` | `'Hero background'` | 图片 alt 文本 |
| `bgClass` | `string` | `'bg-brand-navy'` | 背景色类名 |
| `gradientClass` | `string` | `'bg-gradient-to-r from-[#0B2747]/90...'` | 渐变遮罩类名 |

### 尺寸相关

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `height` | `'small' \| 'medium' \| 'large'` | `'medium'` | 高度（400px / 520px / 640px） |
| `contentWidth` | `'narrow' \| 'normal' \| 'wide'` | `'normal'` | 内容宽度（640px / 752px / 960px） |
| `titleSize` | `'small' \| 'normal' \| 'large'` | `'normal'` | 标题大小（32px / 42px / 48px） |
| `subtitleSize` | `'small' \| 'normal' \| 'large'` | `'normal'` | 副标题大小（16px / 18px / 20px） |

### 内容相关

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | `string` | - | 标题（支持 HTML） |
| `subtitle` | `string` | - | 副标题 |
| `breadcrumbs` | `BreadcrumbItem[]` | `[]` | 面包屑导航配置 |
| `buttons` | `ButtonConfig[]` | `[]` | 按钮配置 |
| `features` | `FeatureItem[]` | `[]` | 特性/信任指标配置 |

### 类型定义

```typescript
interface BreadcrumbItem {
  label: string          // 显示文本
  link?: boolean        // 是否可点击
  onClick?: () => void  // 点击事件
}

interface ButtonConfig {
  label: string                      // 按钮文本
  variant?: 'primary' | 'secondary' // 按钮样式
  href?: string                     // 链接地址（使用 NuxtLink）
  onClick?: () => void              // 点击事件（使用 button）
  icon?: any                        // 图标组件
}

interface FeatureItem {
  label: string      // 特性文本
  icon?: any         // 图标组件
  iconColor?: string // 图标颜色类名
}
```

## 🎨 Slots 插槽

| Slot 名称 | 说明 | 何时使用 |
|-----------|------|----------|
| `title` | 标题区域 | 需要复杂的标题样式或动画 |
| `subtitle` | 副标题区域 | 需要自定义副标题样式 |
| `cta` | CTA 按钮区域 | 需要特殊的按钮布局或交互 |
| `features` | 特性/信任指标区域 | 需要自定义特性展示方式 |
| `content` | 额外自定义内容 | 需要在底部添加其他内容 |

## 📝 使用示例

### 示例 1: 大板车托运页面

```vue
<template>
  <BaseHero
    background-image="https://images.unsplash.com/photo-1601584115197"
    image-alt="大板车干线集运"
    :breadcrumbs="breadcrumbs"
    :title="title"
    subtitle="1000+ 网点遍布全国，批量运输大幅降低成本"
    :buttons="buttons"
    :features="features"
  />
</template>

<script setup lang="ts">
import { Calculator, TrendingUp, ShieldCheck, Users } from 'lucide-vue-next'

const breadcrumbs = [
  { label: '首页', link: true, onClick: () => navigateTo('/') },
  { label: '汽车托运' },
  { label: '大板车托运' }
]

const title = `大板车干线集运：覆盖全国
<span class="text-brand-orange">30,000 条线路</span>
<br />的<span class="text-brand-orange">高性价比</span>托运方案`

const buttons = [
  { label: '获取干线报价', variant: 'primary', href: '/pricing', icon: Calculator },
  { label: '查看热门线路', variant: 'secondary', href: '/pricing#hot-routes', icon: TrendingUp }
]

const features = [
  { label: '太平洋/东海保险', icon: ShieldCheck, iconColor: 'text-brand-orange' },
  { label: '70万+ 认证运力', icon: Users, iconColor: 'text-brand-blue' }
]
</script>
```

### 示例 2: 使用配置文件（推荐）

```vue
<template>
  <BaseHero v-bind="heroConfig" />
</template>

<script setup lang="ts">
import { heroConfigs } from '~/data/hero-configs'

const heroConfig = heroConfigs.bigCarrier
</script>
```

### 示例 3: 自定义尺寸

```vue
<template>
  <BaseHero
    height="large"
    content-width="wide"
    title-size="large"
    subtitle-size="large"
    title="大标题"
    subtitle="大副标题"
  />
</template>
```

## 🎯 最佳实践

### 1. 使用配置文件

将 Hero 配置抽离到 `data/hero-configs.ts`：

```typescript
// data/hero-configs.ts
export const bigCarrierHero = {
  backgroundImage: '...',
  title: '...',
  // ... 其他配置
}

// 页面中使用
import { bigCarrierHero } from '~/data/hero-configs'
```

### 2. 动态内容

对于需要根据状态变化的内容，使用计算属性：

```vue
<script setup lang="ts">
const userLoggedIn = ref(false)

const buttons = computed(() => [
  {
    label: userLoggedIn.value ? '进入控制台' : '立即注册',
    variant: 'primary',
    href: userLoggedIn.value ? '/dashboard' : '/register'
  }
])
</script>
```

### 3. 响应式图片

使用不同尺寸的图片提升性能：

```typescript
const backgroundImage = computed(() => {
  return isMobile.value 
    ? 'https://example.com/hero-mobile.jpg'
    : 'https://example.com/hero-desktop.jpg'
})
```

## 🔧 自定义样式

### 自定义渐变

```vue
<BaseHero
  gradient-class="bg-gradient-to-br from-purple-900/90 via-blue-800/70 to-transparent"
/>
```

### 自定义背景色

```vue
<BaseHero
  bg-class="bg-gradient-to-r from-blue-600 to-purple-600"
/>
```

## 🚨 注意事项

1. **标题 HTML**: 使用 `title` prop 时支持 HTML，但要注意 XSS 安全
2. **按钮配置**: `href` 和 `onClick` 只能使用其中一个
3. **图标组件**: 需要从 `lucide-vue-next` 或其他库导入
4. **性能**: 大图片建议使用 CDN 并优化尺寸

## 📚 相关文件

- 组件源码: `components/common/BaseHero.vue`
- 配置示例: `data/hero-configs.ts`
- 使用示例: `components/common/BaseHero.example.vue`
- 类型定义: 在组件文件中

## 🆕 迁移指南

如果你有现有的 Hero 组件需要迁移：

1. 找到现有的 Hero 组件（如 `BigCarrierHero.vue`）
2. 将配置提取到 `data/hero-configs.ts`
3. 用 `<BaseHero>` 替换原组件
4. 测试所有功能是否正常
5. 删除旧的 Hero 组件文件

## 🤝 贡献

如果需要添加新功能或修复 bug，请：

1. 更新组件代码
2. 更新此文档
3. 添加使用示例
4. 进行充分测试
