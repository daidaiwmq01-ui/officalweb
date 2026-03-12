import { defineEventHandler, getQuery, createError } from 'h3'
import { useRuntimeConfig } from '#imports'
import { md5 } from '@/utils/md5'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const base = config.proxyApi || config.public.proxyApi || 'https://api.chetuoche.net'
  const query = getQuery(event)

  const timestamp = Date.now().toString()
  const sign = md5(`${timestamp}web`)

  try {
    return await $fetch(`${base}/apis/order/vehicleOrder/captcha/img/check`, {
      method: 'GET',
      query,
      headers: {
        userType: 'web',
        timestamp,
        sign,
        'Content-Language': 'zh-CN',
        channelSource: '3017',
      }
    })
  } catch (err: any) {
    throw createError({
      statusCode: err.statusCode || err.status || 502,
      statusMessage: err.statusText || err.message || '验证码校验服务暂时不可用'
    })
  }
})
