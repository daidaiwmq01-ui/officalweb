import { defineEventHandler } from 'h3'
import { useRuntimeConfig } from '#imports'
import { md5 } from '@/utils/md5'

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const apiBase = config.public?.apiBase || 'https://git.chetuoche.net/official-website-server'

  const timestamp = Date.now().toString()
  const sign = md5(`${timestamp}web`)

  return await $fetch(`${apiBase}/api/home/getAllNewsType`, {
    method: 'GET',
    headers: {
      userType: 'web',
      timestamp,
      sign,
      'Content-Language': 'zh-CN',
      channelSource: '3017',
      'Content-Type': 'application/json'
    }
  })
})
