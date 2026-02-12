import { defineEventHandler } from 'h3'
import { useRuntimeConfig } from '#imports'

/** 上游失败时的安全 fallback，避免页面 500 */
const FALLBACK = {
  data: {
    customerAndroidDownload: '',
    customerIosDownload: '',
    driverAndroidDownload: '',
    driverIosDownload: '',
  },
}

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const base = config.public.proxyApi || 'https://test.chetuoche.net'
  try {
    return await $fetch(`${base}/apis/api/update/updateInfo`, {
      method: 'GET',
      timeout: 8000,
    })
  } catch (e) {
    // 上游超时或不可达时返回 fallback，保证首页等依赖此接口的页面正常渲染
    console.warn('[updateInfo] 上游请求失败，返回默认值:', (e as Error)?.message)
    return FALLBACK
  }
})
