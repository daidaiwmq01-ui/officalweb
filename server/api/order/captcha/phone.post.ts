import { defineEventHandler, readBody } from 'h3'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const base = config.public.proxyApi || 'https://test.chetuoche.net'
  const body = await readBody(event)
  return await $fetch(`${base}/apis/order/vehicleOrder/captcha/phone`, {
    method: 'POST',
    body
  })
})
