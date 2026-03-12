<template>
  <div class="bg-white min-h-screen font-['Noto_Sans_SC'] text-[#0B2747]">
    <!-- Hero Section -->
    <section class="relative w-full h-[260px] overflow-hidden mt-[-80px] pt-[80px]">
      <div class="absolute inset-0 z-0">
        <img
          loading="eager"
          :src="ASSETS.HERO"
          :alt="`${decodedLabel} - 车拖车新闻话题`"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-[#0B2747]/80" />
      </div>

      <div class="container mx-auto max-w-[1200px] relative z-10 px-4 lg:px-0 h-full flex flex-col justify-center">
        <div class="absolute top-6 left-4 lg:left-0 z-20">
          <BreadcrumbNav :items="breadcrumbItems" variant="light" />
        </div>

        <div class="max-w-[800px]">
          <p class="text-sm text-white/70 mb-2">话题分类</p>
          <h1 class="text-2xl sm:text-3xl md:text-[36px] font-bold text-white mb-3">
            {{ decodedLabel || '热门话题' }}
          </h1>
          <p class="text-[14px] text-white/80">
            正在查看带有「{{ decodedLabel || '全部' }}」话题标签的新闻文章列表。
          </p>
        </div>
      </div>
    </section>

    <!-- List -->
    <main class="container mx-auto max-w-[1200px] px-4 lg:px-0 py-12">
      <NewsFeedContainer :active-type-id="'all'" :active-label="decodedLabel" />
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import BreadcrumbNav from '@/components/common/BreadcrumbNav.vue'
import NewsFeedContainer from '@/components/news/NewsFeedContainer.vue'
import { useBreadcrumbSchema } from '@/composables/useSchemaOrg'

const route = useRoute()

const labelCode = computed(() => {
  const raw = route.params.label
  const value = typeof raw === 'string' ? raw : Array.isArray(raw) ? raw[0] : ''
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
})

const { data: labelMeta } = await useAsyncData('news-label-meta', async () => {
  try {
    const res = await $fetch('/api/home/allNewsLabels')
    const list = Array.isArray((res as any)?.data) ? (res as any).data as Array<any> : []
    return list.find((item) => item && item.labelCode === labelCode.value) || null
  } catch {
    return null
  }
})

const decodedLabel = computed(() => {
  const name = (labelMeta.value as any)?.labelName
  return typeof name === 'string' && name.trim() ? name.trim() : labelCode.value
})

const breadcrumbItems = computed(() => [
  { label: '首页', path: '/' },
  { label: '信息资讯', path: '/news' },
  { label: decodedLabel.value || '热门话题' }
])

useBreadcrumbSchema(breadcrumbItems.value)

const ASSETS = {
  HERO: '/image/news/hero.webp'
}

usePageSeo({
  title: `${decodedLabel.value || '热门话题'} - 车拖车资讯`,
  description: `查看带有「${decodedLabel.value || '热门话题'}」标签的汽车物流行业资讯与技术公告。`,
  keywords: `${decodedLabel.value || '热门话题'}, 物流资讯, 车拖车新闻`,
  image: '/image/news/og-news.webp'
})

const BASE_URL = 'https://newweb.chetuoche.net'

const labelCollectionSchema = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  'name': `${decodedLabel.value || '热门话题'} - 车拖车资讯`,
  'description': `查看带有「${decodedLabel.value || '热门话题'}」标签的汽车物流行业资讯与技术公告。`,
  'url': `${BASE_URL}/news/label/${encodeURIComponent(labelCode.value)}`,
  'inLanguage': 'zh-CN',
  'isPartOf': {
    '@type': 'CollectionPage',
    '@id': `${BASE_URL}/news`,
    'name': '车拖车行业资讯'
  },
  'publisher': {
    '@type': 'Organization',
    'name': '车拖车 (CheTuoChe)',
    'logo': {
      '@type': 'ImageObject',
      'url': `${BASE_URL}/image/logo/logo.webp`
    }
  },
  'about': {
    '@type': 'Thing',
    'name': decodedLabel.value || '热门话题'
  },
  'speakable': {
    '@type': 'SpeakableSpecification',
    'cssSelector': ['h1', 'h1 + p']
  }
}))

useSchemaOrg(labelCollectionSchema)
</script>

