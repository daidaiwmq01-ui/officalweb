import { defineSitemapEventHandler, asSitemapUrl } from '#imports'
import { md5 } from '@/utils/md5'

interface NewsType {
  id?: number | string
  [key: string]: unknown
}

interface NewsItem {
  id?: number | string
  publishTime?: string
  createTime?: string
  updateTime?: string
  [key: string]: unknown
}

/**
 * Convert API date string like "2024-09-23 17:13:13" to W3C Datetime (ISO 8601).
 * Returns undefined for invalid input so the sitemap entry omits lastmod instead
 * of emitting an invalid value.
 */
function toW3CDate(dateStr?: string): string | undefined {
  if (!dateStr || typeof dateStr !== 'string') return undefined
  const trimmed = dateStr.trim()
  if (!trimmed) return undefined

  if (/^\d{4}-\d{2}-\d{2}T/.test(trimmed)) return trimmed

  const match = trimmed.match(/^(\d{4}-\d{2}-\d{2})\s+(\d{2}:\d{2}:\d{2})$/)
  if (match) return `${match[1]}T${match[2]}+08:00`

  const dateOnly = trimmed.match(/^(\d{4}-\d{2}-\d{2})$/)
  if (dateOnly) return dateOnly[1]

  return undefined
}

export default defineSitemapEventHandler(async () => {
  const config = useRuntimeConfig()
  const apiBase = config.public?.apiBase || 'https://git.chetuoche.net/official-website-server'

  const timestamp = Date.now().toString()
  const sign = md5(`${timestamp}web`)

  const headers: Record<string, string> = {
    userType: 'web',
    timestamp,
    sign,
    'Content-Language': 'zh-CN',
    channelSource: '3017',
    'Content-Type': 'application/json'
  }

  try {
    const typeResponse = await $fetch<{ data?: NewsType[] } | NewsType[]>(
      `${apiBase}/api/home/getAllNewsType`,
      { headers }
    )
    const types: NewsType[] = Array.isArray(typeResponse)
      ? typeResponse
      : (typeResponse?.data || [])

    const urls: ReturnType<typeof asSitemapUrl>[] = []

    for (const type of types) {
      const typeId = type?.id ? Number(type.id) : undefined
      if (!typeId) continue

      const listResponse = await $fetch<{ data?: { list?: NewsItem[] } | NewsItem[]; list?: NewsItem[] } | NewsItem[]>(
        `${apiBase}/api/home/newsList/1/100`,
        {
          method: 'POST',
          headers,
          body: { newsTypeId: typeId }
        }
      )

      const rawList: NewsItem[] = Array.isArray(listResponse)
        ? listResponse
        : ((listResponse as any)?.data?.list ||
          (listResponse as any)?.list ||
          (listResponse as any)?.data || [])

      for (const item of rawList) {
        if (!item.id) continue
        const lastmod = toW3CDate(item.updateTime || item.publishTime || item.createTime)
        urls.push(asSitemapUrl({
          loc: `/news/${item.id}.html`,
          ...(lastmod && { lastmod }),
          changefreq: 'weekly',
          priority: 0.6
        }))
      }
    }

    return urls
  } catch (e) {
    console.error('[sitemap] Failed to fetch news URLs:', e)
    return []
  }
})
