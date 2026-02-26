<template>
  <header 
    role="banner" 
    :class="[
      'relative w-full overflow-hidden font-sans',
      heightClass,
      bgClass
    ]"
  >
    <!-- Background Image with Gradient Overlay -->
    <div class="absolute inset-0 z-0">
      <ImageWithFallback
        v-if="backgroundImage"
        :src="backgroundImage"
        :alt="imageAlt"
        loading="eager"
        class="w-full h-full object-cover"
      />
      <!-- Gradient Overlay -->
      <div 
        :class="[
          'absolute inset-0',
          gradientClass
        ]"
      />
    </div>

    <!-- Content Container -->
    <div class="relative z-10 w-full max-w-[1200px] mx-auto px-4 lg:px-0 h-full flex flex-col justify-start pt-14">
      <!-- Breadcrumb Navigation -->
      <nav 
        v-if="breadcrumbs && breadcrumbs.length > 0"
        class="absolute top-6 left-4 lg:left-0 flex items-center gap-2 text-[14px] text-white/80 z-20"
        aria-label="面包屑导航"
      >
        <template v-for="(item, index) in breadcrumbs" :key="index">
          <component
            :is="item.link ? 'button' : 'span'"
            :class="[
              'transition-colors',
              item.link ? 'hover:text-white cursor-pointer bg-transparent border-none p-0' : '',
              index === breadcrumbs.length - 1 ? 'text-white font-medium' : 'text-white/60'
            ]"
            @click="item.link && item.onClick ? item.onClick() : null"
          >
            {{ item.label }}
          </component>
          <ChevronRight 
            v-if="index < breadcrumbs.length - 1"
            class="w-3.5 h-3.5 text-white/40"
          />
        </template>
      </nav>

      <!-- Main Content：与面包屑保持间距，PC/移动端均不重叠 -->
      <div :class="['pt-6 lg:pt-8 px-4 lg:px-0', contentWidthClass]">
        <!-- Title Section -->
        <div v-if="$slots.title || title">
          <h1
            v-if="!$slots.title"
            v-motion
            :initial="{ opacity: 0, y: 32 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 600 } }"
            :class="[
              'font-bold text-white leading-[1.6] tracking-tight drop-shadow-lg',
              titleSizeClass
            ]"
            v-html="title"
          />
          <slot v-else name="title" />
        </div>

        <!-- Subtitle Section -->
        <div v-if="$slots.subtitle || subtitle" class="mt-6">
          <p
            v-if="!$slots.subtitle"
            v-motion
            :initial="{ opacity: 0, y: 32 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 200 } }"
            :class="[
              'font-medium leading-relaxed text-gray-100 drop-shadow-md',
              subtitleSizeClass
            ]"
          >
            {{ subtitle }}
          </p>
          <slot v-else name="subtitle" />
        </div>

        <!-- CTA Buttons Section -->
        <div v-if="$slots.cta || buttons.length > 0" class="mt-10">
          <div 
            v-if="!$slots.cta"
            v-motion
            :initial="{ opacity: 0, y: 32 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 400 } }"
            class="flex flex-col sm:flex-row gap-4"
          >
            <component
              v-for="(button, index) in buttons"
              :key="index"
              :is="button.href ? 'NuxtLink' : 'button'"
              :to="button.href"
              :class="[
                'h-14 px-8 rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-all cursor-pointer',
                button.variant === 'primary' 
                  ? 'bg-brand-orange text-white hover:bg-[#E56000] hover:shadow-lg hover:shadow-orange-500/30 border-none'
                  : 'border-2 border-white text-white bg-transparent hover:bg-white hover:text-brand-blue'
              ]"
              @click="button.onClick"
            >
              <span>{{ button.label }}</span>
              <component v-if="button.icon" :is="button.icon" :size="20" />
            </component>
          </div>
          <slot v-else name="cta" />
        </div>

        <!-- Trust Indicators / Features Bar -->
        <div 
          v-if="$slots.features || features.length > 0"
          class="mt-16 flex flex-wrap items-center gap-8 border-t border-white/10 pt-8"
        >
          <template v-if="!$slots.features">
            <template v-for="(feature, index) in features" :key="index">
              <div class="flex items-center gap-2 text-white/90">
                <component 
                  v-if="feature.icon"
                  :is="feature.icon" 
                  class="w-5 h-5"
                  :class="feature.iconColor || 'text-brand-orange'"
                />
                <span class="text-[14px]">{{ feature.label }}</span>
              </div>
              <div 
                v-if="index < features.length - 1"
                class="w-[1px] h-4 bg-white/20 hidden sm:block"
              />
            </template>
          </template>
          <slot v-else name="features" />
        </div>

        <!-- Custom Content Slot -->
        <slot name="content" />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next'
import ImageWithFallback from '@/components/ImageWithFallback.vue'

export interface BreadcrumbItem {
  label: string
  link?: boolean
  onClick?: () => void
}

export interface ButtonConfig {
  label: string
  variant?: 'primary' | 'secondary'
  href?: string
  onClick?: () => void
  icon?: any
}

export interface FeatureItem {
  label: string
  icon?: any
  iconColor?: string
}

interface Props {
  // 背景相关
  backgroundImage?: string
  imageAlt?: string
  bgClass?: string
  gradientClass?: string
  
  // 尺寸相关
  height?: 'small' | 'medium' | 'large'
  contentWidth?: 'narrow' | 'normal' | 'wide'
  
  // 内容相关
  title?: string
  titleSize?: 'small' | 'normal' | 'large'
  subtitle?: string
  subtitleSize?: 'small' | 'normal' | 'large'
  
  // 导航和交互
  breadcrumbs?: BreadcrumbItem[]
  buttons?: ButtonConfig[]
  features?: FeatureItem[]
}

const props = withDefaults(defineProps<Props>(), {
  bgClass: 'bg-brand-navy',
  gradientClass: 'bg-gradient-to-r from-[#0B2747]/90 via-[#0B2747]/60 to-[#0B2747]/30',
  height: 'medium',
  contentWidth: 'normal',
  titleSize: 'normal',
  subtitleSize: 'normal',
  imageAlt: 'Hero background',
  breadcrumbs: () => [],
  buttons: () => [],
  features: () => []
})

const heightClass = computed(() => {
  switch (props.height) {
    case 'small': return 'h-[400px]'
    case 'large': return 'h-[640px]'
    default: return 'h-[520px]'
  }
})

const contentWidthClass = computed(() => {
  switch (props.contentWidth) {
    case 'narrow': return 'max-w-[640px]'
    case 'wide': return 'max-w-[960px]'
    default: return 'max-w-[752px]'
  }
})

const titleSizeClass = computed(() => {
  switch (props.titleSize) {
    case 'small': return 'text-2xl sm:text-[32px]'
    case 'large': return 'text-2xl sm:text-3xl md:text-[48px]'
    default: return 'text-2xl sm:text-3xl md:text-[42px]'
  }
})

const subtitleSizeClass = computed(() => {
  switch (props.subtitleSize) {
    case 'small': return 'text-[16px]'
    case 'large': return 'text-[20px]'
    default: return 'text-[18px]'
  }
})
</script>
