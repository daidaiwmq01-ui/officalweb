/**
 * SEO Meta 标签统一管理 Composable
 *
 * @description
 * 提供统一的 SEO meta 标签配置,包括:
 * - 基础 meta 标签 (title, description, keywords)
 * - Open Graph 标签 (社交媒体分享)
 * - Twitter Card 标签
 * - Canonical 链接
 * - Article 特定标签
 *
 * @example
 * ```typescript
 * // 基础页面
 * usePageSeo({
 *   title: '大板车集运 - 车拖车',
 *   description: '提供高性价比的长途汽车批量运输服务',
 *   keywords: '大板车托运, 笼车运输',
 *   image: '/image/big-carrier/og-image.jpg'
 * })
 *
 * // 文章页面
 * usePageSeo({
 *   title: '如何选择汽车托运服务',
 *   description: '详细介绍汽车托运的注意事项',
 *   type: 'article',
 *   publishedTime: '2026-03-04T10:00:00+08:00',
 *   modifiedTime: '2026-03-04T15:00:00+08:00'
 * })
 * ```
 */

interface SeoMetaConfig {
  /** 页面标题 (建议 50-60 字符) */
  title: string
  /** 页面描述 (建议 150-160 字符) */
  description: string
  /** 关键词 (可选,多个关键词用逗号分隔) */
  keywords?: string
  /** 社交媒体分享图片 (建议 1200x630px) */
  image?: string
  /** 页面类型 */
  type?: 'website' | 'article'
  /** 文章发布时间 (ISO 8601 格式) */
  publishedTime?: string
  /** 文章修改时间 (ISO 8601 格式) */
  modifiedTime?: string
  /** 作者名称 */
  author?: string
  /** Twitter 账号 (可选) */
  twitterSite?: string
}

/**
 * 统一的页面 SEO meta 标签配置
 *
 * @param config - SEO 配置对象
 *
 * @description
 * 自动生成以下标签:
 * - title, description, keywords
 * - Open Graph (og:*) 标签
 * - Twitter Card (twitter:*) 标签
 * - canonical 链接
 * - article 特定标签 (如果 type='article')
 *
 * 图片处理:
 * - 如果提供相对路径,自动转换为绝对 URL
 * - 如果未提供图片,使用默认 OG 图片
 *
 * URL 处理:
 * - 自动从当前路由获取 URL
 * - 自动生成 canonical 链接
 */
export function usePageSeo(config: SeoMetaConfig) {
  const baseUrl = 'https://newweb.chetuoche.net'
  const route = useRoute()
  const url = `${baseUrl}${route.path}`

  // 处理图片 URL
  const getImageUrl = (imagePath?: string): string => {
    if (!imagePath) {
      // 默认 OG 图片
      return `${baseUrl}/image/og-default.jpg`
    }

    // 如果已经是完整 URL,直接返回
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath
    }

    // 相对路径转换为绝对 URL
    const path = imagePath.startsWith('/') ? imagePath : `/${imagePath}`
    return `${baseUrl}${path}`
  }

  const imageUrl = getImageUrl(config.image)

  // 构建 meta 标签数组
  const metaTags: any[] = [
    // 基础 meta 标签
    { name: 'description', content: config.description },

    // Open Graph 标签
    { property: 'og:title', content: config.title },
    { property: 'og:description', content: config.description },
    { property: 'og:image', content: imageUrl },
    { property: 'og:url', content: url },
    { property: 'og:type', content: config.type || 'website' },
    { property: 'og:site_name', content: '车拖车' },
    { property: 'og:locale', content: 'zh_CN' },

    // Twitter Card 标签
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: config.title },
    { name: 'twitter:description', content: config.description },
    { name: 'twitter:image', content: imageUrl },

    // 其他 meta 标签
    { name: 'robots', content: 'index, follow, max-image-preview:large' },
  ]

  // 添加 keywords (如果提供)
  if (config.keywords) {
    metaTags.push({ name: 'keywords', content: config.keywords })
  }

  // 添加 author (如果提供)
  if (config.author) {
    metaTags.push({ name: 'author', content: config.author })
  }

  // 添加 Twitter 账号 (如果提供)
  if (config.twitterSite) {
    metaTags.push({ name: 'twitter:site', content: config.twitterSite })
  }

  // 添加 article 特定标签
  if (config.type === 'article') {
    if (config.publishedTime) {
      metaTags.push({ property: 'article:published_time', content: config.publishedTime })
    }
    if (config.modifiedTime) {
      metaTags.push({ property: 'article:modified_time', content: config.modifiedTime })
    }
    if (config.author) {
      metaTags.push({ property: 'article:author', content: config.author })
    }
  }

  // 应用 meta 标签
  useHead({
    title: config.title,
    meta: metaTags,
    link: [
      { rel: 'canonical', href: url }
    ]
  })
}

/**
 * 简化版 SEO 配置 (仅用于快速配置)
 *
 * @param title - 页面标题
 * @param description - 页面描述
 *
 * @example
 * ```typescript
 * useSimpleSeo('关于我们 - 车拖车', '了解车拖车的发展历程和企业文化')
 * ```
 */
export function useSimpleSeo(title: string, description: string) {
  usePageSeo({ title, description })
}
