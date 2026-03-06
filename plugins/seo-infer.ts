import { InferSeoMetaPlugin } from 'unhead/plugins'
import { injectHead } from '#imports'

export default defineNuxtPlugin(() => {
  const head = injectHead()
  head.use(InferSeoMetaPlugin({ twitterCard: false }))

  const route = useRoute()
  const BASE_URL = 'https://newweb.chetuoche.net'

  useHead(computed(() => ({
    meta: [
      { property: 'og:url', content: `${BASE_URL}${route.path}` }
    ]
  })))
})
