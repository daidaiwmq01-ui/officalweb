<template>
  <div class="bg-white min-h-screen font-['Noto_Sans_SC'] text-[#0B2747]">
    <section class="relative w-full h-[260px] overflow-hidden mt-[-80px] pt-[80px]">
      <div class="absolute inset-0 z-0">
        <img :src="detail.coverImg || FALLBACK_IMAGE" alt="News Cover" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-[#0B2747]/75" />
      </div>
      <div class="container mx-auto max-w-[1000px] relative z-10 px-4 lg:px-0 h-full flex flex-col justify-center">
        <div class="flex items-center gap-2 text-white/80 text-[14px]">
          <button
            @click="navigateTo('/news')"
            class="hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0"
          >
            新闻资讯
          </button>
          <ChevronRight class="w-4 h-4" />
          <span class="text-white font-bold">详情</span>
        </div>
        <h1 class="text-[32px] font-bold text-white mt-4">
          {{ detail.title || '新闻详情' }}
        </h1>
        <div class="flex items-center gap-4 text-white/80 text-[14px] mt-3">
          <span>{{ detail.newsTypeName || detail.category || '新闻资讯' }}</span>
          <span>{{ detail.publishTime || detail.createTime || '' }}</span>
          <span v-if="detail.source">来源：{{ detail.source }}</span>
        </div>
      </div>
    </section>

    <main class="container mx-auto max-w-[1000px] px-4 lg:px-0 py-12">
      <div class="prose max-w-none prose-headings:text-[#0B2747] prose-p:text-[#4B5563] prose-strong:text-[#0B2747]">
        <p v-if="detail.briefIntroduction" class="text-[18px] text-[#4B5563] leading-[1.8] mb-6">
          {{ detail.briefIntroduction }}
        </p>
        <div v-if="detail.content" v-html="detail.content" />
        <p v-else class="text-[#9CA3AF]">暂无正文内容。</p>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ChevronRight } from 'lucide-vue-next'
import { useRoute } from 'vue-router'
import { parseNewsId } from '@/utils/slug'

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1586880244406-556ebe35f282?auto=format&fit=crop&q=80&w=1200'

interface NewsItemRaw {
  id?: number | string
  title?: string
  briefIntroduction?: string
  content?: string
  coverImg?: string
  imgUrl?: string
  cover?: string
  publishTime?: string
  createTime?: string
  newsTypeId?: number
  newsTypeID?: number
  typeId?: number
  newsTypeName?: string
  source?: string
}

const route = useRoute()
const id = computed(() => parseNewsId(String(route.params.id || '')))

const { data: detail } = await useAsyncData('news-detail', async () => {
  const typeResponse = await $fetch('/api/home/getAllNewsType')
  const types = Array.isArray(typeResponse)
    ? typeResponse
    : ((typeResponse as { data?: Array<{ id?: number | string }> })?.data || [])

  for (const type of types) {
    const typeId = type?.id ? Number(type.id) : undefined
    if (!typeId) continue
    const listResponse = await $fetch('/api/home/newsList/1/50', {
      method: 'POST',
      body: { newsTypeId: typeId }
    })

    const rawList = Array.isArray(listResponse)
      ? (listResponse as NewsItemRaw[])
      : ((listResponse as { data?: { list?: NewsItemRaw[] } | NewsItemRaw[]; list?: NewsItemRaw[] })?.data as
          | { list?: NewsItemRaw[] }
          | NewsItemRaw[]
          | undefined)?.list ||
        (listResponse as { list?: NewsItemRaw[] })?.list ||
        ((listResponse as { data?: NewsItemRaw[] })?.data || [])

    const found = (rawList as NewsItemRaw[]).find((item) => String(item.id) === id.value)
    if (found) {
      return {
        ...found,
        coverImg: found.coverImg || found.imgUrl || found.cover || FALLBACK_IMAGE
      }
    }
  }

  return {}
})

// Schema.org 结构化数据 - 新闻详情（动态）
const newsArticleSchema = computed(() => {
  const d = detail.value || {}
  const title = d.title || '新闻详情'
  const image = d.coverImg || d.imgUrl || d.cover || FALLBACK_IMAGE
  const desc = d.briefIntroduction || title

  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    'headline': title,
    'image': [image],
    'datePublished': d.publishTime || d.createTime,
    'dateModified': d.updateTime || d.publishTime || d.createTime,
    'author': {
      '@type': 'Organization',
      'name': d.author || '车拖车研究院'
    },
    'publisher': { '@id': 'https://www.chetuoche.com/#organization' },
    'description': desc
  }
})

useSchemaOrg(newsArticleSchema)
</script>
