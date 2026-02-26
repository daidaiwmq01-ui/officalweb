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

import type { NewsItem, NewsItemAPI } from '@/types'

interface Props {
  activeTypeId?: number | string
}

const props = defineProps<Props>()

const MOCK_NEWS_LIST: NewsItem[] = [
  {
    id: 1,
    title: "车拖车数字化算法实验室：如何通过 AI 调度提升 15% 的汽车运输周转率？",
    summary: "在非标物流领域，空驶率一直是制约效率的瓶颈。临沂汽车数智供应链实验室最新发布的调度模型显示，通过多维度路径优化，可大幅降低车辆空载时间。",
    createTime: "2026-05-12",
    author: "车拖车研究院",
    imgUrl: "/image/home/home-hero-bg.png"
  },
  {
    id: 2,
    title: "2026年清障车市场趋势报告：从传统液压到全数智化驱动的跨越",
    summary: "随着新能源汽车渗透率提升，托运清障需求正发生结构性变化。本文深入分析了新一代数智化清障车的技术演进路径、核心零部件国产化进程。",
    createTime: "2026-05-10",
    author: "产品中心",
    imgUrl: "/image/solutions/hero.webp"
  },
  {
    id: 3,
    title: "信息安全升级公告：车拖车正式通过国家信息系统安全等级保护三级认证",
    summary: "车拖车平台在数据脱敏、加密传输及服务器深度加固方面完成全面升级，正式获得等保三级认证。这标志着平台在保障B端客户业务数据安全方面已达到金融级标准。",
    createTime: "2026-05-08",
    author: "信息安全部",
    imgUrl: "/image/transport/hero.webp"
  },
  {
    id: 4,
    title: "B2B汽车物流的标准化路径：临沂数智实验室的 300 条专家准则",
    summary: "非标服务标准化是物流行业的圣杯。我们总结了从交车验车到收车支付的 300 条核心作业准则，旨在打造行业级的透明度标杆与信任基础。",
    createTime: "2026-05-05",
    author: "专家组",
    imgUrl: "/image/home/home-hero-bg.png"
  }
]

// --- State ---
const loading = ref(true)
const page = ref(1)
const pageSize = 10
const totalPages = ref(1)
const newsList = ref<NewsItem[]>([])
const error = ref<string | null>(null)

// --- API Functions ---
const fetchNews = async () => {
  if (!props.activeTypeId) return

  loading.value = true
  error.value = null
  
  try {
    const response = await $fetch(`/api/home/newsList/${page.value}/${pageSize}`, {
      method: 'POST',
      body: { newsTypeId: Number(props.activeTypeId) }
    })
    
    const rawList = Array.isArray(response)
      ? response
      : (response?.data?.list || response?.list || response?.data || [])

    const total = Number((response as { total?: number })?.total ?? (response as { data?: { total?: number } })?.data?.total)
    if (Number.isFinite(total) && total > 0) {
      totalPages.value = Math.max(1, Math.ceil(total / pageSize))
    } else {
      const pages = Number((response as { pages?: number })?.pages ?? (response as { data?: { pages?: number } })?.data?.pages)
      totalPages.value = Number.isFinite(pages) && pages > 0 ? pages : 1
    }
    
    // Map API fields to UI fields
    const mappedList: NewsItem[] = rawList.map((item: NewsItemAPI) => ({
      id: item.id,
      title: item.title,
      summary: (item as { briefIntroduction?: string }).briefIntroduction || item.desc || item.summary || "暂无简介",
      createTime: (item as { publishTime?: string }).publishTime || item.createTime || new Date().toISOString().split('T')[0],
      author: (item as { source?: string }).source || item.author || "官方发布",
      imgUrl: (item as { coverImg?: string }).coverImg || item.imgUrl || item.cover || "/image/home/home-hero-bg.png",
      typeId: (item as { newsTypeId?: number; newsTypeID?: number; typeId?: number }).newsTypeId
        ?? (item as { newsTypeID?: number }).newsTypeID
        ?? (item as { typeId?: number }).typeId
    }))
    
    newsList.value = mappedList
  } catch (err) {
    // Fallback to mock data
    newsList.value = MOCK_NEWS_LIST
    totalPages.value = 1
  } finally {
    loading.value = false
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
    }
    fetchNews()
  },
  { immediate: true }
)

watch(page, () => {
  fetchNews()
})
</script>
