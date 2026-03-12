import { defineEventHandler, createError } from 'h3'
import { useRuntimeConfig } from '#imports'
import { md5 } from '@/utils/md5'

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const base = config.apiBase || config.public.apiBase

  const timestamp = Date.now().toString()
  const sign = md5(`${timestamp}web`)

  try {
    return await $fetch(`${base}/apis/order/vehicleCombine/listTree/v2`, {
      method: 'GET',
      headers: {
        userType: 'web',
        timestamp,
        sign,
        'Content-Language': 'zh-CN',
        channelSource: '3017'
      }
    })
  } catch (err: any) {
    throw createError({
      statusCode: err.statusCode || err.status || 502,
      statusMessage: err.statusText || err.message || '获取车型列表失败'
    })
  }
})
