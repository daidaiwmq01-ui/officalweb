/**
 * Schema.org 结构化数据 Composable
 * 提供全局组织信息和各类页面的结构化数据生成器
 */

// 全局组织信息 - 所有页面共用
export const organizationSchema = {
  '@type': 'Organization',
  '@id': 'https://newweb.chetuoche.net/#organization',
  'name': '车拖车 (CheTuoChe)',
  'legalName': '山东车拖车网络科技有限公司',
  'url': 'https://newweb.chetuoche.net',
  'logo': 'https://newweb.chetuoche.net/image/logo/logo.webp',
  'slogan': '让汽车托运像发快递一样简单',
  'description': '国内领先的AI智能调度汽车托运平台，连接70万认证司机，服务280万用户。',
  'foundingDate': '2020',
  'contactPoint': {
    '@type': 'ContactPoint',
    'telephone': '400-075-1117',
    'contactType': 'customer service',
    'areaServed': 'CN',
    'availableLanguage': 'Chinese'
  },
  'sameAs': [
    'https://www.douyin.com/user/chetuoche'
  ]
}

/**
 * 使用 Schema.org 结构化数据
 * @param schema - Schema.org JSON-LD 数据对象或计算属性
 */
export function useSchemaOrg(schema: any) {
  useHead({
    script: [
      {
        type: 'application/ld+json',
        children: computed(() => {
          const schemaValue = typeof schema === 'function' ? schema() : unref(schema)
          return JSON.stringify(schemaValue)
        })
      }
    ]
  })
}

/**
 * 网站主页 Schema
 * 包含 Organization + WebSite + WebPage 三层实体
 * speakable 用于 GEO（语音搜索/AI 引用）
 */
export function useHomePageSchema() {
  const baseUrl = 'https://newweb.chetuoche.net'

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      organizationSchema,
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        'url': baseUrl,
        'name': '车拖车官网 - 全场景AI智能汽车托运调度平台',
        'description': '国内领先的AI智能调度汽车托运平台，连接70万认证司机，服务280万用户。',
        'publisher': { '@id': `${baseUrl}/#organization` },
        'inLanguage': 'zh-CN',
        'potentialAction': {
          '@type': 'SearchAction',
          'target': `${baseUrl}/pricing?q={search_term_string}`,
          'query-input': 'required name=search_term_string'
        }
      },
      {
        '@type': 'WebPage',
        '@id': `${baseUrl}/#webpage`,
        'url': baseUrl,
        'name': '车拖车(CheTuoChe)官网 - 全场景AI智能汽车托运调度平台',
        'isPartOf': { '@id': `${baseUrl}/#website` },
        'about': { '@id': `${baseUrl}/#organization` },
        'inLanguage': 'zh-CN',
        'description': '车拖车是国内领先的一站式汽车物流调度平台，依托自研AI智能调度系统，提供大板车干线集运、小板车1对1托运、专业代驾及24h道路救援服务。',
        'speakable': {
          '@type': 'SpeakableSpecification',
          'cssSelector': ['h1', 'h1 + p']
        },
        'primaryImageOfPage': {
          '@type': 'ImageObject',
          'url': `${baseUrl}/image/home/home-hero-bg.webp`
        }
      }
    ]
  }
  
  useSchemaOrg(schema)
}

/**
 * 服务页面 Schema 生成器
 */
export function useServiceSchema(config: {
  name: string
  description: string
  serviceType?: string
  areaServed?: string
  offers?: any
  faq?: Array<{ question: string; answer: string }>
}) {
  const schema: any = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        'name': config.name,
        'provider': { '@id': 'https://newweb.chetuoche.net/#organization' },
        'description': config.description,
        'serviceType': config.serviceType || 'Car Transport',
        'areaServed': config.areaServed || 'CN',
        'inLanguage': 'zh-CN',
        'speakable': {
          '@type': 'SpeakableSpecification',
          'cssSelector': ['h1', 'h1 + p', 'h2']
        }
      }
    ]
  }
  
  if (config.offers) {
    schema['@graph'][0].offers = config.offers
  }
  
  if (config.faq && config.faq.length > 0) {
    schema['@graph'].push({
      '@type': 'FAQPage',
      'mainEntity': config.faq.map(item => ({
        '@type': 'Question',
        'name': item.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': item.answer
        }
      }))
    })
  }
  
  useSchemaOrg(schema)
}

/**
 * 文章/新闻详情 Schema
 * 符合 Google Rich Results 对 NewsArticle 的完整要求：
 * - publisher 包含 name + logo (ImageObject)
 * - image 使用绝对 URL
 * - datePublished / dateModified 使用 ISO 8601 格式
 * - inLanguage / articleSection / keywords 提升语义丰富度
 * - speakable 支持 GEO（语音搜索/AI 引用）
 * - isPartOf 建立页面层级关系
 */
export function useArticleSchema(article: {
  title: string
  description?: string
  image?: string
  url?: string
  datePublished?: string
  dateModified?: string
  author?: string
  articleSection?: string
  keywords?: string
}) {
  const baseUrl = 'https://newweb.chetuoche.net'

  function toAbsoluteUrl(path?: string): string | undefined {
    if (!path) return undefined
    if (/^https?:\/\//.test(path)) return path
    return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`
  }

  const schema = computed(() => {
    const headline = article.title.length > 110 ? article.title.slice(0, 110) : article.title
    const imageUrl = toAbsoluteUrl(article.image)

    return {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      ...(article.url && {
        'mainEntityOfPage': { '@type': 'WebPage', '@id': article.url }
      }),
      'headline': headline,
      'image': imageUrl ? [imageUrl] : undefined,
      'datePublished': article.datePublished,
      'dateModified': article.dateModified || article.datePublished,
      'author': {
        '@type': 'Organization',
        'name': article.author || '车拖车研究院',
        'url': baseUrl
      },
      'publisher': {
        '@type': 'Organization',
        'name': '车拖车 (CheTuoChe)',
        'logo': {
          '@type': 'ImageObject',
          'url': `${baseUrl}/image/logo/logo.webp`
        }
      },
      'description': article.description,
      'inLanguage': 'zh-CN',
      'articleSection': article.articleSection || '新闻资讯',
      'keywords': article.keywords || '车拖车, 汽车托运, 物流资讯',
      'isPartOf': {
        '@type': 'CollectionPage',
        '@id': `${baseUrl}/news`,
        'name': '车拖车行业资讯'
      },
      'speakable': {
        '@type': 'SpeakableSpecification',
        'cssSelector': ['h1', '.prose > p:first-of-type']
      }
    }
  })
  
  useSchemaOrg(schema)
}

/**
 * 关于我们页面 Schema
 */
export function useAboutPageSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    'inLanguage': 'zh-CN',
    'speakable': {
      '@type': 'SpeakableSpecification',
      'cssSelector': ['h1', 'h1 + p']
    },
    'mainEntity': {
      '@id': 'https://newweb.chetuoche.net/#organization',
      '@type': 'Organization',
      'foundingDate': '2020',
      'legalName': '山东车拖车网络科技有限公司',
      'description': '车拖车致力于用数字技术重塑汽车物流信任标准。现已连接70万认证司机，服务用户超280万，GMV近43亿。',
      'award': [
        '山东省首版次高端软件认证',
        '国家高新技术企业',
        '国家等保三级认证',
        'ISO9001质量认证'
      ],
      'memberOf': {
        '@type': 'Organization',
        'name': '临沂市汽车数智供应链重点实验室'
      }
    }
  }
  
  useSchemaOrg(schema)
}

/**
 * 独立 FAQPage Schema - 适用于任何含 FAQ 的页面
 */
export function useFAQPageSchema(faqs: Array<{ question: string; answer: string }>) {
  if (!faqs || faqs.length === 0) return

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(item => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.answer
      }
    }))
  }

  useSchemaOrg(schema)
}

/**
 * BreadcrumbList Schema - 面包屑结构化数据
 * @param items - 面包屑配置项数组
 * @param currentPath - 当前页面路径（用于末级 URL，可选）
 */
export function useBreadcrumbSchema(items: Array<{ label: string; path?: string }>, currentPath?: string) {
  if (!items || items.length === 0) return

  const route = useRoute()
  const baseUrl = 'https://newweb.chetuoche.net'
  const path = currentPath ?? route.path

  const schema = computed(() => {
    const listItem = items.map((item, index) => ({
      '@type': 'ListItem' as const,
      position: index + 1,
      name: item.label,
      item: item.path ? `${baseUrl}${item.path}` : `${baseUrl}${path}`,
    }))

    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: listItem,
    }
  })

  useSchemaOrg(schema)
}

/**
 * 联系我们页面 Schema
 */
export function useContactPageSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    'inLanguage': 'zh-CN',
    'speakable': {
      '@type': 'SpeakableSpecification',
      'cssSelector': ['h1', 'h1 + p']
    },
    'mainEntity': {
      '@type': 'Organization',
      '@id': 'https://newweb.chetuoche.net/#organization',
      'contactPoint': [
        {
          '@type': 'ContactPoint',
          'telephone': '400-075-1117',
          'contactType': 'customer service',
          'areaServed': 'CN',
          'availableLanguage': 'Chinese'
        },
        {
          '@type': 'ContactPoint',
          'telephone': '19078975678',
          'contactType': 'sales',
          'description': '板车销售专线'
        },
        {
          '@type': 'ContactPoint',
          'email': 'yunweishu8888@163.com',
          'contactType': 'technical support',
          'description': '技术与安全支持'
        }
      ]
    }
  }

  useSchemaOrg(schema)
}

/**
 * HowTo Schema - 流程/教程结构化数据
 * 适用于服务流程、操作指南等页面
 *
 * @param config - HowTo 配置对象
 * @param config.name - 流程名称
 * @param config.description - 流程描述
 * @param config.totalTime - 总耗时 (ISO 8601 格式,如 PT30M 表示 30 分钟, PT7D 表示 7 天)
 * @param config.steps - 步骤数组
 *
 * @example
 * ```typescript
 * useHowToSchema({
 *   name: '大板车托运流程',
 *   description: '从下单到交车的完整流程',
 *   totalTime: 'PT7D',
 *   steps: [
 *     {
 *       name: '在线下单',
 *       text: '通过微信小程序或APP输入起终点,系统自动计算价格',
 *       image: 'https://newweb.chetuoche.net/image/process/step1.jpg'
 *     }
 *   ]
 * })
 * ```
 */
export function useHowToSchema(config: {
  name: string
  description: string
  totalTime?: string
  estimatedCost?: {
    currency: string
    value: string
  }
  steps: Array<{
    name: string
    text: string
    image?: string
    url?: string
  }>
}) {
  const baseUrl = 'https://newweb.chetuoche.net'

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    'name': config.name,
    'description': config.description,
    'totalTime': config.totalTime || 'PT30M',
    'inLanguage': 'zh-CN',
    'estimatedCost': config.estimatedCost,
    'step': config.steps.map((step, index) => ({
      '@type': 'HowToStep',
      'position': index + 1,
      'name': step.name,
      'text': step.text,
      'image': step.image ? (step.image.startsWith('http') ? step.image : `${baseUrl}${step.image}`) : undefined,
      'url': step.url ? (step.url.startsWith('http') ? step.url : `${baseUrl}${step.url}`) : undefined
    }))
  }

  useSchemaOrg(schema)
}

/**
 * LocalBusiness Schema - 本地商业信息
 * 用于提升本地 SEO,在 Google Maps 等地图服务中展示
 *
 * @param config - LocalBusiness 配置对象 (可选,使用默认配置)
 *
 * @example
 * ```typescript
 * // 使用默认配置
 * useLocalBusinessSchema()
 *
 * // 自定义配置
 * useLocalBusinessSchema({
 *   name: '车拖车临沂总部',
 *   address: {
 *     streetAddress: '兰山区某某路123号',
 *     addressLocality: '临沂市',
 *     addressRegion: '山东省',
 *     postalCode: '276000'
 *   }
 * })
 * ```
 */
export function useLocalBusinessSchema(config?: {
  name?: string
  address?: {
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode: string
  }
  geo?: {
    latitude: string
    longitude: string
  }
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': config?.name || '车拖车 (CheTuoChe)',
    'image': 'https://newweb.chetuoche.net/image/logo/logo.webp',
    'telephone': '400-075-1117',
    'email': 'tech@autotrans.com',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': config?.address?.streetAddress || '兰山区',
      'addressLocality': config?.address?.addressLocality || '临沂市',
      'addressRegion': config?.address?.addressRegion || '山东省',
      'postalCode': config?.address?.postalCode || '276000',
      'addressCountry': 'CN'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': config?.geo?.latitude || '35.1041',
      'longitude': config?.geo?.longitude || '118.3563'
    },
    'url': 'https://newweb.chetuoche.net',
    'priceRange': '¥¥',
    'openingHoursSpecification': {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      'opens': '00:00',
      'closes': '23:59'
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.9',
      'bestRating': '5',
      'reviewCount': '15800'
    }
  }

  useSchemaOrg(schema)
}

/**
 * ItemList Schema - 列表页面结构化数据
 * 适用于新闻列表、服务列表、产品列表等
 *
 * @param items - 列表项数组
 *
 * @example
 * ```typescript
 * useItemListSchema([
 *   {
 *     name: '大板车托运服务',
 *     url: '/big-carrier',
 *     image: '/image/big-carrier/thumb.jpg',
 *     description: '高性价比的长途汽车批量运输'
 *   },
 *   {
 *     name: '小板车托运服务',
 *     url: '/small-carrier',
 *     image: '/image/small-carrier/thumb.jpg',
 *     description: '1对1专车托运服务'
 *   }
 * ])
 * ```
 */
export function useItemListSchema(items: Array<{
  name: string
  url: string
  image?: string
  description?: string
}>) {
  const baseUrl = 'https://newweb.chetuoche.net'

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'item': {
        '@type': 'Thing',
        'name': item.name,
        'url': item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`,
        'image': item.image ? (item.image.startsWith('http') ? item.image : `${baseUrl}${item.image}`) : undefined,
        'description': item.description
      }
    }))
  }

  useSchemaOrg(schema)
}

/**
 * VideoObject Schema - 视频内容结构化数据
 * 用于视频内容在搜索结果中的展示
 *
 * @param config - 视频配置对象
 *
 * @example
 * ```typescript
 * useVideoObjectSchema({
 *   name: '大板车托运流程演示',
 *   description: '详细展示大板车托运的完整流程',
 *   thumbnailUrl: '/image/video/thumb.jpg',
 *   uploadDate: '2026-03-01',
 *   duration: 'PT5M30S',
 *   contentUrl: 'https://newweb.chetuoche.net/videos/big-carrier-process.mp4'
 * })
 * ```
 */
export function useVideoObjectSchema(config: {
  name: string
  description: string
  thumbnailUrl: string
  uploadDate: string
  duration?: string
  contentUrl?: string
  embedUrl?: string
}) {
  const baseUrl = 'https://newweb.chetuoche.net'

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    'name': config.name,
    'description': config.description,
    'thumbnailUrl': config.thumbnailUrl.startsWith('http') ? config.thumbnailUrl : `${baseUrl}${config.thumbnailUrl}`,
    'uploadDate': config.uploadDate,
    'duration': config.duration,
    'contentUrl': config.contentUrl,
    'embedUrl': config.embedUrl,
    'inLanguage': 'zh-CN',
    'publisher': {
      '@type': 'Organization',
      'name': '车拖车 (CheTuoChe)',
      'logo': {
        '@type': 'ImageObject',
        'url': `${baseUrl}/image/logo/logo.webp`
      }
    }
  }

  useSchemaOrg(schema)
}
