<template>
  <div class="flex flex-col gap-6">
    <div class="flex items-center justify-between">
      <h2 class="text-[24px] font-bold text-[#0B2747]">最新资讯</h2>
    </div>

    <!-- Article List -->
    <div v-if="error" class="p-6 bg-red-50 text-red-600 rounded-lg text-sm">
      {{ error }}
      <p class="mt-2 text-xs opacity-70">提示：如果看到 CORS 错误，请尝试使用代理或在服务端允许跨域。</p>
    </div>
    <NewsArticleList v-else :loading="loading" :news-list="newsList" />

    <Pagination
      :show="!loading && !error && newsList.length > 0"
      :page="page"
      :total-pages="totalPages"
      @prev="handlePrevPage"
      @next="handleNextPage"
      @goto="handleGotoPage"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import NewsArticleList from './NewsArticleList.vue'
import Pagination from '@/components/ui/Pagination.vue'

import type { NewsItem, NewsItemAPI, NewsTypeItem } from '@/types'

interface Props {
  activeTypeId?: number | string
}

const props = defineProps<Props>()

const isAllMode = () => props.activeTypeId === 'all'

// --- State ---
const loading = ref(true)
const page = ref(1)
const pageSize = 10
const totalPages = ref(1)
const newsList = ref<NewsItem[]>([])
const error = ref<string | null>(null)

const allNewsCache = ref<NewsItem[]>([])

const mapRawToNewsItem = (item: NewsItemAPI): NewsItem => ({
  id: item.id,
  title: item.title,
  summary: (item as { briefIntroduction?: string }).briefIntroduction || item.desc || item.summary || "暂无简介",
  createTime: (item as { publishTime?: string }).publishTime || item.createTime || new Date().toISOString().split('T')[0],
  author: item.author || (item as { source?: string }).source || "官方发布",
  imgUrl: (item as { coverImg?: string }).coverImg || item.imgUrl || item.cover || "/image/home/home-hero-bg.png",
  typeId: (item as { newsTypeId?: number; newsTypeID?: number; typeId?: number }).newsTypeId
    ?? (item as { newsTypeID?: number }).newsTypeID
    ?? (item as { typeId?: number }).typeId
})

const extractList = (response: any): NewsItemAPI[] => {
  if (Array.isArray(response)) return response
  return response?.data?.list || response?.list || response?.data || []
}

const fetchAllNews = async () => {
  loading.value = true
  error.value = null

  try {
    const typeResponse = await $fetch('/api/home/getAllNewsType')
    const types: NewsTypeItem[] = Array.isArray(typeResponse)
      ? typeResponse
      : ((typeResponse as { data?: NewsTypeItem[] })?.data || [])

    const validTypes = types.filter((t) => t?.id !== undefined && t?.id !== null)

    const allItems: NewsItem[] = []
    await Promise.all(
      validTypes.map(async (cat) => {
        try {
          const response = await $fetch('/api/home/newsList/1/50', {
            method: 'POST',
            body: { newsTypeId: Number(cat.id) }
          })
          const rawList = extractList(response) as NewsItemAPI[]
          rawList.forEach((item) => {
            if (item?.id && item?.title) {
              allItems.push(mapRawToNewsItem(item))
            }
          })
        } catch { /* skip failed category */ }
      })
    )

    const seen = new Set<number>()
    allNewsCache.value = allItems
      .filter((item) => {
        if (seen.has(item.id)) return false
        seen.add(item.id)
        return true
      })
      .sort((a, b) => new Date(b.createTime).getTime() - new Date(a.createTime).getTime())

    totalPages.value = Math.max(1, Math.ceil(allNewsCache.value.length / pageSize))
    paginateAll()
  } catch {
    allNewsCache.value = []
    newsList.value = []
    totalPages.value = 1
  } finally {
    loading.value = false
  }
}

const paginateAll = () => {
  const start = (page.value - 1) * pageSize
  newsList.value = allNewsCache.value.slice(start, start + pageSize)
}

const fetchNewsByType = async () => {
  if (!props.activeTypeId || isAllMode()) return

  loading.value = true
  error.value = null

  try {
    const response = await $fetch(`/api/home/newsList/${page.value}/${pageSize}`, {
      method: 'POST',
      body: { newsTypeId: Number(props.activeTypeId) }
    })

    const rawList = extractList(response) as NewsItemAPI[]

    const total = Number((response as any)?.total ?? (response as any)?.data?.total)
    if (Number.isFinite(total) && total > 0) {
      totalPages.value = Math.max(1, Math.ceil(total / pageSize))
    } else {
      const pages = Number((response as any)?.pages ?? (response as any)?.data?.pages)
      totalPages.value = Number.isFinite(pages) && pages > 0 ? pages : 1
    }

    newsList.value = rawList.map(mapRawToNewsItem)
  } catch {
    newsList.value = []
    totalPages.value = 1
  } finally {
    loading.value = false
  }
}

const fetchNews = async () => {
  if (isAllMode()) {
    if (allNewsCache.value.length > 0) {
      paginateAll()
    } else {
      await fetchAllNews()
    }
  } else {
    await fetchNewsByType()
  }
}

// --- Handlers ---
const handlePrevPage = () => {
  if (page.value > 1) {
    page.value = page.value - 1
  }
}

const handleNextPage = () => {
  page.value = page.value + 1
}

const handleGotoPage = (nextPage: number) => {
  if (nextPage === page.value) return
  if (nextPage < 1 || nextPage > totalPages.value) return
  page.value = nextPage
}

watch(
  () => props.activeTypeId,
  (nextId, prevId) => {
    if (!nextId) return
    if (nextId !== prevId) {
      page.value = 1
      allNewsCache.value = []
    }
    fetchNews()
  },
  { immediate: true }
)

watch(page, () => {
  fetchNews()
})
</script>
