import { defineEventHandler } from 'h3'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const base = config.public.apiBase || 'https://git.chetuoche.net/official-website-server'

  return await $fetch(`${base}/apis/order/vehicleCombine/listRecommend`, {
    method: 'GET'
  })
})
