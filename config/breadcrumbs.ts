/**
 * 面包屑导航配置
 * 与 TheHeader 导航栏结构保持一致，用于面包屑展示和 BreadcrumbList Schema
 */

export interface BreadcrumbConfigItem {
  /** 显示文本，与导航栏一致 */
  label: string
  /** 链接路径，末级可不填（表示当前页） */
  path?: string
}

const BASE_URL = 'https://www.ctcapp.com'

/** 路由到面包屑的映射 */
export const BREADCRUMB_CONFIG: Record<string, BreadcrumbConfigItem[]> = {
  // 首页 - 无面包屑
  '/': [],

  // ========== 汽车托运 ==========
  '/transport': [
    { label: '首页', path: '/' },
    { label: '汽车托运', path: '/transport' },
  ],
  '/small-carrier': [
    { label: '首页', path: '/' },
    { label: '汽车托运', path: '/transport' },
    { label: '小板车托运', path: '/small-carrier' },
  ],
  '/big-carrier': [
    { label: '首页', path: '/' },
    { label: '汽车托运', path: '/transport' },
    { label: '大板车托运', path: '/big-carrier' },
  ],
  '/rescue': [
    { label: '首页', path: '/' },
    { label: '汽车托运', path: '/transport' },
    { label: '汽车救援', path: '/rescue' },
  ],
  '/valet': [
    { label: '首页', path: '/' },
    { label: '汽车托运', path: '/transport' },
    { label: '代驾', path: '/valet' },
  ],
  '/pricing': [
    { label: '首页', path: '/' },
    { label: '汽车托运', path: '/transport' },
    { label: '价格查询', path: '/pricing' },
  ],
  '/guide': [
    { label: '首页', path: '/' },
    { label: '汽车托运', path: '/transport' },
    { label: '用户指南', path: '/guide' },
  ],

  // ========== 解决方案 ==========
  '/solutions': [
    { label: '首页', path: '/' },
    { label: '解决方案', path: '/solutions' },
  ],
  '/supply-chain': [
    { label: '首页', path: '/' },
    { label: '解决方案', path: '/solutions' },
    { label: '汽车供应链', path: '/supply-chain' },
  ],
  '/luxury-transport': [
    { label: '首页', path: '/' },
    { label: '解决方案', path: '/solutions' },
    { label: '商业活动物流', path: '/luxury-transport' },
  ],
  '/personal-travel': [
    { label: '首页', path: '/' },
    { label: '解决方案', path: '/solutions' },
    { label: '个人旅游托运', path: '/personal-travel' },
  ],
  '/cybersecurity': [
    { label: '首页', path: '/' },
    { label: '解决方案', path: '/solutions' },
    { label: '网络安全防护', path: '/cybersecurity' },
  ],

  // ========== 清障车销售 ==========
  '/truck-sales': [
    { label: '首页', path: '/' },
    { label: '清障车销售', path: '/truck-sales' },
  ],

  // ========== 生态合作 ==========
  '/partners': [
    { label: '首页', path: '/' },
    { label: '生态合作', path: '/partners' },
  ],
  '/partner-recruit': [
    { label: '首页', path: '/' },
    { label: '生态合作', path: '/partners' },
    { label: '城市合伙人招募', path: '/partner-recruit' },
  ],
  '/driver': [
    { label: '首页', path: '/' },
    { label: '生态合作', path: '/partners' },
    { label: '司机入驻', path: '/driver' },
  ],

  // ========== 信息资讯 ==========
  '/news': [
    { label: '首页', path: '/' },
    { label: '信息资讯', path: '/news' },
  ],

  // ========== 关于我们 ==========
  '/about': [
    { label: '首页', path: '/' },
    { label: '关于我们', path: '/about' },
  ],
  '/contact': [
    { label: '首页', path: '/' },
    { label: '关于我们', path: '/about' },
    { label: '联系我们', path: '/contact' },
  ],
  '/careers': [
    { label: '首页', path: '/' },
    { label: '关于我们', path: '/about' },
    { label: '人才招聘', path: '/careers' },
  ],
  '/driver/home': [
    { label: '首页', path: '/' },
    { label: '关于我们', path: '/about' },
    { label: '司机之家', path: '/driver/home' },
  ],

  // ========== APP下载 ==========
  '/download': [
    { label: '首页', path: '/' },
    { label: 'APP下载', path: '/download' },
  ],
  '/download/client': [
    { label: '首页', path: '/' },
    { label: 'APP下载', path: '/download' },
    { label: '客户端下载', path: '/download/client' },
  ],
  '/download/driver': [
    { label: '首页', path: '/' },
    { label: 'APP下载', path: '/download' },
    { label: '司机端下载', path: '/download/driver' },
  ],
}

/**
 * 根据路由路径获取面包屑配置
 */
export function getBreadcrumbsForRoute(routePath: string): BreadcrumbConfigItem[] {
  // 标准化路径：去除末尾斜杠、query、hash
  const path = routePath.replace(/#.*$/, '').replace(/\?.*$/, '').replace(/\/$/, '') || '/'
  return BREADCRUMB_CONFIG[path] ?? []
}

/**
 * 生成 BreadcrumbList Schema.org JSON-LD
 */
export function createBreadcrumbListSchema(items: BreadcrumbConfigItem[], currentPath: string) {
  if (!items || items.length === 0) return null

  const listItem = items.map((item, index) => {
    const position = index + 1
    const url = item.path ? `${BASE_URL}${item.path}` : `${BASE_URL}${currentPath}`
    return {
      '@type': 'ListItem',
      position,
      name: item.label,
      item: url,
    }
  })

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: listItem,
  }
}
