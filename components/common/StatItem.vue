<template>
  <div :class="containerClass">
    <div v-if="icon" class="p-3 rounded-xl bg-white/5 border border-white/10">
      <component :is="icon" class="w-8 h-8 text-brand-blue" />
    </div>
    <div :class="textContainerClass">
      <div :class="valueClass">{{ value }}</div>
      <div :class="labelClass">{{ label }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  icon?: any
  value: string
  label: string
  variant?: 'simple' | 'with-icon'
  textAlign?: 'left' | 'center'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'simple',
  textAlign: 'center'
})

const containerClass = computed(() => {
  if (props.variant === 'with-icon' && props.icon) {
    return 'flex items-start gap-4'
  }
  return props.textAlign === 'center' ? 'text-center md:text-left' : 'text-left'
})

const textContainerClass = computed(() => {
  return props.variant === 'with-icon' && props.icon ? '' : ''
})

const valueClass = computed(() => {
  if (props.variant === 'with-icon' && props.icon) {
    return 'text-[28px] font-bold text-white mb-1'
  }
  return 'text-[32px] font-bold mb-1'
})

const labelClass = 'text-white/60 text-[14px]'
</script>
