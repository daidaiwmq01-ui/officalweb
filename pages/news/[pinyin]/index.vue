<template>
  <div class="bg-white min-h-screen font-['Noto_Sans_SC'] text-[#0B2747]">
    <!-- Hero Section -->
    <section class="relative w-full h-[350px] overflow-hidden mt-[-80px] pt-[80px]">
      <div class="absolute inset-0 z-0">
        <img
          loading="eager"
          :src="ASSETS.HERO"
          :alt="`${categoryName} - 车拖车新闻资讯`"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-[#0B2747]/80" />
      </div>

      <div class="container mx-auto max-w-[1200px] relative z-10 px-4 lg:px-0 h-full flex flex-col justify-center">
        <div class="absolute top-6 left-4 lg:left-0 z-20">
          <BreadcrumbNav :items="breadcrumbItems" variant="light" />
        </div>

        <div class="text-center max-w-[800px] mx-auto mt-8">
          <h1
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0 }"
            class="text-2xl sm:text-3xl md:text-[40px] font-bold text-white mb-4"
          >
            {{ categoryName }}
          </h1>
          <p
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 100 } }"
            class="text-[18px] text-white/90 mb-8"
          >
            来自车拖车的{{ categoryName }}资讯
          </p>
        </div>
      </div>
    </section>

    <!-- Main Layout -->
    <div class="container mx-auto max-w-[1200px] py-16 px-4">
      <div class="flex flex-col lg:flex-row gap-12">
        <!-- Left Column: News Feed -->
        <main class="lg:w-[800px] shrink-0">
          <NewsFeedContainer :active-type-id="categoryId" />
        </main>

        <!-- Right Column: Sidebar -->
        <aside class="lg:w-[350px] space-y-10">
          <div class="sticky top-[100px] space-y-10">
            <!-- Categories -->
            <div class="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <h3 class="text-[18px] font-bold text-[#0B2747] mb-6 flex items-center gap-2">
                <span class="w-1.5 h-6 bg-[#006EFF] rounded-full" />
                资讯分类
              </h3>
              <div class="space-y-1">
                <NuxtLink
                  to="/news"
                  class="w-full flex justify-between items-center px-4 py-3 rounded-xl hover:bg-[#F0F7FF] group transition-all text-left block"
                >
                  <span class="text-[15px] transition-colors text-[#4B5563] group-hover:text-[#006EFF]">
                    全部资讯
                  </span>
                </NuxtLink>
                <NuxtLink
                  v-for="cat in allCategories"
                  :key="cat.code || cat.id"
                  :to="cat.code ? `/news/${cat.code}` : '/news'"
                  class="w-full flex justify-between items-center px-4 py-3 rounded-xl hover:bg-[#F0F7FF] group transition-all text-left block"
                >
                  <span
                    :class="[
                      'text-[15px] transition-colors',
                      cat.code === currentCode ? 'text-[#006EFF] font-semibold' : 'text-[#4B5563] group-hover:text-[#006EFF]'
                    ]"
                  >
                    {{ cat.name }}
                  </span>
                </NuxtLink>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import BreadcrumbNav from '@/components/common/BreadcrumbNav.vue'
import NewsFeedContainer from '@/components/news/NewsFeedContainer.vue'
import type { NewsTypeItem } from '@/types'

const ASSETS = {
  HERO: '/image/news/hero.webp',
}

const route = useRoute()
const currentCode = computed(() => String(route.params.pinyin || ''))

const { data: categoryData } = await useAsyncData(
  `news-category-${currentCode.value}`,
  async () => {
    const typeResponse = await $fetch('/api/home/getAllNewsType')
    const types = Array.isArray(typeResponse)
      ? (typeResponse as NewsTypeItem[])
      : ((typeResponse as { data?: NewsTypeItem[] })?.data || [])

    const matched = types.find((t) => t.code === currentCode.value)
    if (!matched || !matched.id) {
      throw createError({ statusCode: 404, statusMessage: '分类不存在' })
    }

    const allCategories = types
      .filter((item) => item?.id !== undefined && item?.id !== null)
      .map((item) => ({
        id: item.id as number | string,
        name: item.newsType || item.name || '新闻资讯',
        code: item.code || '',
      }))

    return {
      id: matched.id,
      name: matched.newsType || matched.name || '新闻资讯',
      code: matched.code || '',
      allCategories,
    }
  }
)

const categoryId = computed(() => categoryData.value?.id)
const categoryName = computed(() => categoryData.value?.name || '新闻资讯')
const allCategories = computed(() => categoryData.value?.allCategories || [])

const breadcrumbItems = computed(() => [
  { label: '首页', path: '/' },
  { label: '信息资讯', path: '/news' },
  { label: categoryName.value },
])

usePageSeo({
  title: `${categoryName.value} - 车拖车资讯`,
  description: `车拖车${categoryName.value}频道，为您提供最新的${categoryName.value}相关资讯与行业动态。`,
  keywords: `${categoryName.value}, 物流资讯, 车拖车`,
  image: '/image/news/og-news.jpg',
})

const categorySchema = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  'name': `${categoryName.value} - 车拖车资讯`,
  'description': `车拖车${categoryName.value}频道资讯列表`,
  'url': `https://newweb.chetuoche.net/news/${currentCode.value}`,
  'publisher': {
    '@type': 'Organization',
    'name': '车拖车 (CheTuoChe)',
    'logo': {
      '@type': 'ImageObject',
      'url': 'https://newweb.chetuoche.net/image/logo/logo.png',
    },
  },
}))

useSchemaOrg(categorySchema)
</script>
