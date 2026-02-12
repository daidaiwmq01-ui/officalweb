/**
 * 路由配置文件
 * 统一管理所有页面路由
 */

export const ROUTES = {
  home: '/',
  about: '/about',
  contact: '/contact',
  careers: '/careers',
  
  // 业务线路由
  transport: '/transport',
  bigCarrier: '/big-carrier',
  smallCarrier: '/small-carrier',
  valet: '/valet',
  rescue: '/rescue',
  luxuryTransport: '/luxury-transport',
  personalTravel: '/personal-travel',
  supplyChain: '/supply-chain',
  
  // 功能页面
  pricing: '/pricing',
  solutions: '/solutions',
  news: '/news',
  guide: '/guide',
  
  // 下载页面
  download: '/download',
  downloadClient: '/download/client',
  downloadDriver: '/download/driver',
  
  // 合作伙伴
  partners: '/partners',
  partnerRecruit: '/partner-recruit',
  
  // 司机相关
  driver: '/driver',
  driverHome: '/driver/home',
  
  // 其他
  truckSales: '/truck-sales',
  cybersecurity: '/cybersecurity',
} as const
