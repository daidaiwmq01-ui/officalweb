declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
    gtag?: (...args: unknown[]) => void
    _hmt?: unknown[]
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const ga4MeasurementId = config.public.ga4MeasurementId?.trim()
  const baiduHmId = config.public.baiduHmId?.trim()

  const hasGA4 = Boolean(ga4MeasurementId)
  const hasBaiduHm = Boolean(baiduHmId)

  if (!hasGA4 && !hasBaiduHm) {
    return
  }

  if (hasGA4 && ga4MeasurementId) {
    window.dataLayer = window.dataLayer || []
    window.gtag = window.gtag || function gtag(...args: unknown[]) {
      window.dataLayer!.push(args as unknown as Record<string, unknown>)
    }

    window.gtag('js', new Date())
    window.gtag('config', ga4MeasurementId, { send_page_view: false })

    const gaScript = document.createElement('script')
    gaScript.async = true
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${ga4MeasurementId}`
    document.head.appendChild(gaScript)
  }

  if (hasBaiduHm && baiduHmId) {
    window._hmt = window._hmt || []
    const hmScript = document.createElement('script')
    hmScript.async = true
    hmScript.src = `https://hm.baidu.com/hm.js?${baiduHmId}`
    document.head.appendChild(hmScript)
  }

  const trackPageView = (path: string) => {
    if (hasGA4 && ga4MeasurementId && window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: path
      })
    }

    if (hasBaiduHm && Array.isArray(window._hmt)) {
      window._hmt.push(['_trackPageview', path])
    }
  }

  nuxtApp.hook('page:finish', () => {
    const route = useRoute()
    const path = route.fullPath || '/'
    trackPageView(path)
  })
})
