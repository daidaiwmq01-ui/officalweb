<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
  htmlAttrs: {
    lang: 'zh-CN'
  },
  meta: [
    { property: 'og:site_name', content: '车拖车 - 智能汽车物流生态平台' },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: 'zh_CN' },
    { property: 'og:image', content: 'https://www.ctcapp.com/image/logo/logo.png' }
  ]
})
</script>
