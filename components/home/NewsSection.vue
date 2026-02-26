<template>
  <section class="py-20 bg-white">
    <div class="max-w-[1200px] mx-auto px-4">
      <div class="flex justify-between items-end mb-12">
        <div>
          <h2 class="text-3xl font-bold text-[#0B2747] mb-2">新闻资讯</h2>
          <p class="text-gray-500">了解车拖车最新动态与行业资讯</p>
        </div>
        <a
          href="#"
          @click.prevent="handleViewMore"
          class="flex items-center text-[#006EFF] font-semibold hover:underline cursor-pointer"
        >
          查看更多 <ArrowRight class="w-4 h-4 ml-1" />
        </a>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <article
          v-for="item in newsItems"
          :key="item.id"
          class="group cursor-pointer"
          @click="handleNewsClick(item)"
        >
          <div class="relative overflow-hidden rounded-xl mb-4 aspect-[16/10]">
            <img loading="lazy"
              :src="item.image"
              :alt="item.title"
              class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
            <div class="absolute top-4 left-4 bg-[#FF6B00] text-white text-xs px-2 py-1 rounded">
              {{ item.category }}
            </div>
          </div>
          <div class="flex items-center gap-4 text-gray-400 text-sm mb-2">
            <div class="flex items-center">
              <Calendar class="w-4 h-4 mr-1" />
              {{ item.date }}
            </div>
            <div class="flex items-center">
              <User class="w-4 h-4 mr-1" />
              {{ item.author }}
            </div>
          </div>
          <h3 class="text-xl font-bold text-[#0B2747] mb-2 group-hover:text-[#006EFF] transition-colors line-clamp-2">
            {{ item.title }}
          </h3>
          <p class="text-gray-600 text-sm line-clamp-2 leading-relaxed">
            {{ item.desc }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ArrowRight, Calendar, User } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import { makeNewsPath } from '@/utils/slug'

interface Props {
  setActiveId?: (id: string) => void
}

const props = defineProps<Props>()

interface HomeNewsItem {
  id: number | string
  title: string
  date: string
  author: string
  category: string
  image: string
  desc: string
  typeId?: number | string
}

const FALLBACK_NEWS_ITEMS: HomeNewsItem[] = [
  {
    id: 1,
    title: '车拖车完成 B 轮融资，加速 AI 智能调度系统升级',
    date: '2026-01-15',
    author: '车拖车研究院',
    category: '企业动态',
    image: '/image/home/home-hero-bg.png',
    desc: '本轮融资将用于进一步完善全国运力网络建设及 L4 级自动驾驶干线物流的技术预研。',
    typeId: 1
  },
  {
    id: 2,
    title: '2025 年度中国物流行业创新奖揭晓，车拖车荣获金奖',
    date: '2025-12-20',
    author: '品牌中心',
    category: '行业荣誉',
    image: '/image/solutions/hero.png',
    desc: '凭借独特的"AI+运力"双引擎模式，车拖车在降本增效方面的突出表现获得评审团一致认可。',
    typeId: 1
  },
  {
    id: 3,
    title: '春节期间运力保障方案发布：承诺不涨价、不拒单',
    date: '2026-01-28',
    author: '运营中心',
    category: '服务公告',
    image: '/image/transport/hero.webp',
    desc: '为保障春节期间车主返乡需求，平台已调度储备 3000+ 辆应急救援车与小板车运力。',
    typeId: 1
  }
]

interface NewsTypeItem {
  id: number | string
  newsType?: string
  name?: string
}

interface NewsItemRaw {
  id?: number | string
  title?: string
  briefIntroduction?: string
  desc?: string
  summary?: string
  coverImg?: string
  imgUrl?: string
  cover?: string
  publishTime?: string
  createTime?: string
  author?: string
  source?: string
  newsTypeId?: number
  newsTypeID?: number
  typeId?: number
}

const normalizeDate = (value?: string) => {
  if (!value) return new Date().toISOString().split('T')[0]
  return value.split('T')[0]
}

const mapHomeNewsItems = (rawList: NewsItemRaw[], typeMap: Map<string, string>) => {
  return rawList.map((item) => {
    const typeId = item.newsTypeId ?? item.newsTypeID ?? item.typeId
    const category = typeMap.get(String(typeId ?? '')) || '新闻资讯'
    return {
      id: item.id ?? `${typeId || 'news'}-${item.title}`,
      title: item.title || '暂无标题',
      date: normalizeDate(item.publishTime || item.createTime),
      author: item.source || item.author || '官方发布',
      category,
      image: item.coverImg || item.imgUrl || item.cover || FALLBACK_NEWS_ITEMS[0].image,
      desc: item.briefIntroduction || item.desc || item.summary || '暂无简介',
      typeId
    }
  })
}

const { data: apiData } = await useAsyncData('home-news', async () => {
  const typeResponse = await $fetch('/api/home/getAllNewsType')
  const types = Array.isArray(typeResponse)
    ? (typeResponse as NewsTypeItem[])
    : ((typeResponse as { data?: NewsTypeItem[] })?.data || [])

  const typeMap = new Map<string, string>()
  types.forEach((item) => {
    if (item?.id === undefined || item?.id === null) return
    typeMap.set(String(item.id), item.newsType || item.name || '新闻资讯')
  })

  const defaultTypeId = types?.[0]?.id
  const listResponse = await $fetch('/api/home/newsList/1/3', {
    method: 'POST',
    body: { newsTypeId: defaultTypeId }
  })

  const rawList = Array.isArray(listResponse)
    ? (listResponse as NewsItemRaw[])
    : ((listResponse as { data?: { list?: NewsItemRaw[] } | NewsItemRaw[]; list?: NewsItemRaw[] })?.data as
        | { list?: NewsItemRaw[] }
        | NewsItemRaw[]
        | undefined)?.list ||
      (listResponse as { list?: NewsItemRaw[] })?.list ||
      ((listResponse as { data?: NewsItemRaw[] })?.data || [])

  return mapHomeNewsItems(rawList as NewsItemRaw[], typeMap)
})

const newsItems = computed(() => {
  const list = apiData.value || []
  return list.length > 0 ? list : FALLBACK_NEWS_ITEMS
})

const router = useRouter()

const handleViewMore = () => {
  props.setActiveId?.('news')
}

const handleNewsClick = (item: HomeNewsItem) => {
  router.push({ path: makeNewsPath(item.id) })
}
</script>
