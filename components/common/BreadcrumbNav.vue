<template>
  <nav
    v-if="items && items.length > 0"
    class="flex items-center gap-2 text-[14px] z-20"
    :class="variant === 'light' ? 'text-white/80' : 'text-[#4B5563]'"
    aria-label="面包屑导航"
  >
    <template v-for="(item, index) in items" :key="index">
      <NuxtLink
        v-if="index < items.length - 1 && item.path"
        :to="item.path"
        :class="[
          'transition-colors',
          variant === 'light' ? 'hover:text-white text-white/60' : 'hover:text-[#006EFF] text-gray-500'
        ]"
      >
        {{ item.label }}
      </NuxtLink>
      <span
        v-else
        :class="[
          'font-medium',
          variant === 'light' ? 'text-white' : 'text-[#0B2747] font-bold'
        ]"
      >
        {{ item.label }}
      </span>
      <ChevronRight
        v-if="index < items.length - 1"
        :class="[
          'w-3.5 h-3.5 shrink-0',
          variant === 'light' ? 'text-white/40' : 'text-[#9CA3AF]'
        ]"
      />
    </template>
  </nav>
</template>

<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next'

export interface BreadcrumbNavItem {
  label: string
  path?: string
}

interface Props {
  /** 面包屑配置，末级为当前页 */
  items: BreadcrumbNavItem[]
  /** 样式变体：light=深色背景(白色文字)，dark=浅色背景(深色文字) */
  variant?: 'light' | 'dark'
}

withDefaults(defineProps<Props>(), {
  variant: 'light',
})
</script>
