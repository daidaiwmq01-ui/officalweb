import { defineEventHandler, readBody } from 'h3'
import { useRuntimeConfig } from '#imports'
import { md5 } from '@/utils/md5'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const apiBase = config.public?.apiBase || 'https://git.chetuoche.net/official-website-server'

  const timestamp = Date.now().toString()
  const sign = md5(`${timestamp}web`)
  const body = await readBody(event)

  const page = event.context.params?.page
  const limit = event.context.params?.limit

  return await $fetch(`${apiBase}/api/home/newsList/${page}/${limit}`, {
    method: 'POST',
    headers: {
      userType: 'web',
      timestamp,
      sign,
      'Content-Language': 'zh-CN',
      channelSource: '3017',
      'Content-Type': 'application/json'
    },
    body
  })
})
