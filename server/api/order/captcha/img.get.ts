import { defineEventHandler } from 'h3'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const base = config.public.proxyApi || 'https://test.chetuoche.net'
  return await $fetch(`${base}/apis/order/vehicleOrder/captcha/img`, { method: 'GET' })
})
