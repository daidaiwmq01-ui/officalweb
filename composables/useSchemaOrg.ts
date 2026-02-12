/**
 * Schema.org 结构化数据 Composable
 * 提供全局组织信息和各类页面的结构化数据生成器
 */

// 全局组织信息 - 所有页面共用
export const organizationSchema = {
  '@type': 'Organization',
  '@id': 'https://www.chetuoche.com/#organization',
  'name': '车拖车 (CheTuoChe)',
  'legalName': '山东车拖车网络科技有限公司',
  'url': 'https://www.chetuoche.com',
  'logo': 'https://www.chetuoche.com/logo.png',
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
        '@id': 'https://www.chetuoche.com/#website',
        'url': 'https://www.chetuoche.com',
        'name': '车拖车官网 - 全场景AI智能汽车托运调度平台',
        'publisher': { '@id': 'https://www.chetuoche.com/#organization' },
        'potentialAction': {
          '@type': 'SearchAction',
          'target': 'https://www.chetuoche.com/pricing?q={search_term_string}',
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
        'provider': { '@id': 'https://www.chetuoche.com/#organization' },
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
 */
export function useArticleSchema(article: {
  title: string
  description?: string
  image?: string
  datePublished?: string
  dateModified?: string
  author?: string
}) {
  const schema = computed(() => ({
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    'headline': article.title,
    'image': article.image ? [article.image] : undefined,
    'datePublished': article.datePublished,
    'dateModified': article.dateModified || article.datePublished,
    'author': {
      '@type': 'Organization',
      'name': article.author || '车拖车研究院'
    },
    'publisher': { '@id': 'https://www.chetuoche.com/#organization' },
    'description': article.description
  }))
  
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
      '@id': 'https://www.chetuoche.com/#organization',
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
 * BreadcrumbList Schema - 面包屑结构化数据
 * @param items - 面包屑配置项数组
 * @param currentPath - 当前页面路径（用于末级 URL，可选）
 */
export function useBreadcrumbSchema(items: Array<{ label: string; path?: string }>, currentPath?: string) {
  if (!items || items.length === 0) return

  const route = useRoute()
  const baseUrl = 'https://www.chetuoche.com'
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
      '@id': 'https://www.chetuoche.com/#organization',
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
