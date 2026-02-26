import { resolve } from 'node:path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/motion/nuxt',
    '@nuxtjs/sitemap'
  ],

  site: {
    url: 'https://www.ctcapp.com',
    name: '车拖车 - 智能汽车物流生态平台'
  },

  sitemap: {
    autoLastmod: true,
    experimentalCompression: true,
    defaults: {
      changefreq: 'monthly',
      priority: 0.5
    },
    exclude: [
      '/test-hero',
      '/api/**',
      '/admin/**'
    ],
    sources: [
      '/api/__sitemap__/urls'
    ]
  },

  routeRules: {
    '/': { sitemap: { changefreq: 'daily', priority: 1.0 } },
    '/big-carrier': { sitemap: { changefreq: 'weekly', priority: 0.9 } },
    '/small-carrier': { sitemap: { changefreq: 'weekly', priority: 0.9 } },
    '/rescue': { sitemap: { changefreq: 'weekly', priority: 0.9 } },
    '/valet': { sitemap: { changefreq: 'weekly', priority: 0.9 } },
    '/pricing': { sitemap: { changefreq: 'weekly', priority: 0.8 } },
    '/luxury-transport': { sitemap: { changefreq: 'weekly', priority: 0.8 } },
    '/supply-chain': { sitemap: { changefreq: 'weekly', priority: 0.8 } },
    '/personal-travel': { sitemap: { changefreq: 'weekly', priority: 0.8 } },
    '/transport': { sitemap: { changefreq: 'weekly', priority: 0.8 } },
    '/solutions': { sitemap: { changefreq: 'monthly', priority: 0.8 } },
    '/news': { sitemap: { changefreq: 'daily', priority: 0.8 } },
    '/about': { sitemap: { changefreq: 'monthly', priority: 0.7 } },
    '/contact': { sitemap: { changefreq: 'monthly', priority: 0.7 } },
    '/partners': { sitemap: { changefreq: 'monthly', priority: 0.7 } },
    '/truck-sales': { sitemap: { changefreq: 'weekly', priority: 0.7 } },
    '/partner-recruit': { sitemap: { changefreq: 'monthly', priority: 0.7 } },
    '/guide': { sitemap: { changefreq: 'monthly', priority: 0.6 } },
    '/careers': { sitemap: { changefreq: 'monthly', priority: 0.6 } },
    '/download': { sitemap: { changefreq: 'monthly', priority: 0.6 } },
    '/download/client': { sitemap: { changefreq: 'monthly', priority: 0.6 } },
    '/download/driver': { sitemap: { changefreq: 'monthly', priority: 0.6 } },
    '/driver': { sitemap: { changefreq: 'monthly', priority: 0.6 } },
    '/driver/home': { sitemap: { changefreq: 'monthly', priority: 0.6 } },
    '/cybersecurity': { sitemap: { changefreq: 'monthly', priority: 0.5 } }
  },

  css: [
    '~/assets/css/tailwind.css',
    '~/assets/css/fonts.css',
    '~/assets/css/qimoor-hide.css'
  ],


  app: {
    head: {
      title: '车拖车 - 智能汽车物流生态平台',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: '连接运力、货主与救援服务的综合性数字平台。自研 AI 智能调度系统，连接 70万+ 运力，已安全交付 2500万+ 台次。'
        }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.VITE_APP_API || '',
      proxyApi: process.env.VITE_APP_PROXY_API || '',
      tmapKey: process.env.TMAP_KEY || '',
      ga4MeasurementId: process.env.NUXT_PUBLIC_GA4_MEASUREMENT_ID || '',
      baiduHmId: process.env.NUXT_PUBLIC_BAIDU_HM_ID || ''
    }
  },



  typescript: {
    strict: true,
    typeCheck: false  // 暂时禁用，避免中文引号错误
  },

  vite: {
    resolve: {
      alias: process.env.NODE_ENV === 'development'
        ? {
            // Workaround for intermittent Vite import-analysis failure in dev:
            // Failed to resolve import "#app-manifest" from nuxt manifest composable.
            '#app-manifest': resolve(process.cwd(), '.nuxt/manifest/meta/dev.json')
          }
        : {}
    },
    plugins: [
      {
        name: 'ignore-nuxt-dir-request',
        apply: 'serve',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            const url = req.url?.split('?')[0]
            if (url === '/_nuxt' || url === '/_nuxt/') {
              res.statusCode = 204
              res.end()
              return
            }
            next()
          })
        }
      }
    ],
    server: {
      hmr: {
        protocol: 'ws',
        host: 'localhost'
      }
    }
  },

  nitro: {
    devProxy: {}
  },

  devServer: {
    port: 3001,
    host: '0.0.0.0'  // 允许局域网访问：本机用 localhost:3001，其他设备用 http://<本机IP>:3001
  }
})
