import { useRuntimeConfig } from '#app'
import { md5 } from '@/utils/md5'

export const useApi = () => {
  const config = useRuntimeConfig()
  const apiBase =
    config.public?.apiBase || 'https://git.chetuoche.net/official-website-server'

  const getAuthHeaders = () => {
    const timestamp = Date.now().toString()
    const sign = md5(`${timestamp}web`)

    return {
      userType: 'web',
      timestamp,
      sign,
      'Content-Language': 'zh-CN',
      channelSource: '3017',
      'Content-Type': 'application/json',
    }
  }

  return { apiBase, getAuthHeaders }
}
