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
    url: 'https://newweb.chetuoche.net',
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
    // 私有配置，仅服务端可用
    apiBase: process.env.NUXT_API_BASE || process.env.NUXT_PUBLIC_API_BASE || 'https://git.chetuoche.net/official-website-server',
    proxyApi: process.env.NUXT_PROXY_API || process.env.NUXT_PUBLIC_PROXY_API || 'https://api.chetuoche.net',
    // 公共配置，客户端和服务端都可用
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'https://git.chetuoche.net/official-website-server',
      proxyApi: process.env.NUXT_PUBLIC_PROXY_API || 'https://api.chetuoche.net',
      tmapKey: process.env.NUXT_PUBLIC_TMAP_KEY || '',
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
      alias: {
            // 使模板中 src="/image/..." 的解析指向 public/image，避免从项目根解析报错
            '/image': resolve(process.cwd(), 'public/image'),
            ...(process.env.NODE_ENV === 'development'
              ? {
                  '#app-manifest': resolve(process.cwd(), '.nuxt/manifest/meta/dev.json')
                }
              : {})
          }
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
    devProxy: {},
    rollupConfig: {
      plugins: [
        {
          name: 'node16-formdata-polyfill',
          renderChunk(code: string, chunk: { fileName: string }) {
            // Inject FormData as a module-level var so it's accessible as a bare
            // identifier in Node 16 ESM (globalThis properties are NOT reachable
            // as bare identifiers in ESM strict mode on Node 16).
            if (!chunk.fileName.endsWith('.mjs')) return null
            const polyfill = `var FormData=typeof globalThis!=="undefined"&&globalThis.FormData?globalThis.FormData:class FormData{constructor(){this._d=[]}append(k,v){this._d.push([k,v])}get(k){const e=this._d.find(([j])=>j===k);return e?e[1]:null}has(k){return this._d.some(([j])=>j===k)}getAll(k){return this._d.filter(([j])=>j===k).map(([,v])=>v)}delete(k){this._d=this._d.filter(([j])=>j!==k)}[Symbol.iterator](){return this._d[Symbol.iterator]()}};\n`
            return { code: polyfill + code, map: null }
          }
        }
      ]
    }
  },

  devServer: {
    port: 3001,
    host: '0.0.0.0'  // 允许局域网访问：本机用 localhost:3001，其他设备用 http://<本机IP>:3001
  }
})
