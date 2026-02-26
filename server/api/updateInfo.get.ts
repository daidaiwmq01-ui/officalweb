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
  const proxyApi = config.public.proxyApi
  const apiBase = config.public.apiBase

  const baseCandidates = [
    proxyApi,
    apiBase,
    'https://test.chetuoche.net',
    'https://git.chetuoche.net/official-website-server',
  ].filter(Boolean) as string[]

  for (const base of baseCandidates) {
    try {
      const data: any = await $fetch(`${base}/apis/api/update/updateInfo`, {
        method: 'GET',
        timeout: 8000,
      })
      if (data?.data || data?.status === '0' || data?.status === 0) {
        return data
      }
    } catch (e) {
      console.warn('[updateInfo] 上游请求失败:', base, (e as Error)?.message)
    }
  }

  // 所有上游都失败时返回 fallback，保证页面可渲染
  return FALLBACK
})
