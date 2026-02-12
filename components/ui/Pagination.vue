<template>
  <div
    v-if="show"
    class="flex items-center justify-center gap-3 mt-8 pt-8 border-t border-gray-100"
  >
    <button
      @click="emit('prev')"
      :disabled="!hasPrev"
      class="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
    >
      <ChevronLeft class="w-4 h-4" />
      上一页
    </button>

    <div class="flex items-center gap-2">
      <button
        v-for="p in pageButtons"
        :key="p"
        @click="emit('goto', p)"
        :class="[
          'min-w-[36px] h-9 px-3 rounded-lg border text-sm font-medium transition-all',
          p === props.page ? 'border-[#006EFF] text-[#006EFF] bg-[#E6F2FF]' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
        ]"
      >
        {{ p }}
      </button>
    </div>

    <button
      @click="emit('next')"
      :disabled="!hasNext"
      class="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
    >
      下一页
      <ChevronRight class="w-4 h-4" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

interface Props {
  page: number
  totalPages: number
  show?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  show: true
})

const emit = defineEmits<{
  (e: 'prev'): void
  (e: 'next'): void
  (e: 'goto', page: number): void
}>()

const pageButtons = computed(() => {
  const total = Math.max(1, props.totalPages)
  const current = Math.min(Math.max(1, props.page), total)
  const windowSize = 5
  const half = Math.floor(windowSize / 2)
  let start = Math.max(1, current - half)
  let end = Math.min(total, start + windowSize - 1)
  start = Math.max(1, end - windowSize + 1)

  const pages: number[] = []
  for (let i = start; i <= end; i += 1) {
    pages.push(i)
  }
  return pages
})

const hasPrev = computed(() => props.page > 1)
const hasNext = computed(() => props.page < props.totalPages)
</script>
