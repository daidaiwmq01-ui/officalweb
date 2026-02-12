import { defineEventHandler, getQuery } from 'h3'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const base = config.public.proxyApi || 'https://test.chetuoche.net'
  const query = getQuery(event)
  return await $fetch(`${base}/apis/order/vehicleOrder/captcha/img/check`, {
    method: 'GET',
    query
  })
})
