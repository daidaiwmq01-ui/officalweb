/**
 * Schema.org 结构化数据 Composable
 * 提供全局组织信息和各类页面的结构化数据生成器
 */

// 全局组织信息 - 所有页面共用
export const organizationSchema = {
  '@type': 'Organization',
  '@id': 'https://www.ctcapp.com/#organization',
  'name': '车拖车 (CheTuoChe)',
  'legalName': '山东车拖车网络科技有限公司',
  'url': 'https://www.ctcapp.com',
  'logo': 'https://www.ctcapp.com/image/logo/logo.png',
  'slogan': '让汽车托运像发快递一样简单',
  'description': '国内领先的AI智能调度汽车托运平台，连接167万用户与45万运力伙伴。',
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
 */
export function useHomePageSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      organizationSchema,
      {
        '@type': 'WebSite',
        '@id': 'https://www.ctcapp.com/#website',
        'url': 'https://www.ctcapp.com',
        'name': '车拖车官网 - 全场景AI智能汽车托运调度平台',
        'publisher': { '@id': 'https://www.ctcapp.com/#organization' },
        'potentialAction': {
          '@type': 'SearchAction',
          'target': 'https://www.ctcapp.com/pricing?q={search_term_string}',
          'query-input': 'required name=search_term_string'
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
        'provider': { '@id': 'https://www.ctcapp.com/#organization' },
        'description': config.description,
        'serviceType': config.serviceType || 'Car Transport',
        'areaServed': config.areaServed || 'CN'
      }
    ]
  }
  
  // 添加报价信息
  if (config.offers) {
    schema['@graph'][0].offers = config.offers
  }
  
  // 添加 FAQ
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
 */
export function useArticleSchema(article: {
  title: string
  description?: string
  image?: string
  url?: string
  datePublished?: string
  dateModified?: string
  author?: string
}) {
  const baseUrl = 'https://www.ctcapp.com'

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
          'url': `${baseUrl}/image/logo/logo.png`
        }
      },
      'description': article.description
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
    'mainEntity': {
      '@id': 'https://www.ctcapp.com/#organization',
      '@type': 'Organization',
      'foundingDate': '2020',
      'legalName': '山东车拖车网络科技有限公司',
      'description': '车拖车致力于用数字技术重塑汽车物流信任标准。现已服务用户超167万，GMV近20亿。',
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
  const baseUrl = 'https://www.ctcapp.com'
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
    'mainEntity': {
      '@type': 'Organization',
      '@id': 'https://www.ctcapp.com/#organization',
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
          'email': 'tech@autotrans.com',
          'contactType': 'technical support',
          'description': '系统对接与安全咨询'
        }
      ]
    }
  }
  
  useSchemaOrg(schema)
}
