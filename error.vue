<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#F8F9FB] to-white font-['Noto_Sans_SC']">
    <div class="max-w-[600px] mx-auto px-4 text-center">
      <!-- Error Code -->
      <div
        v-motion
        :initial="{ opacity: 0, scale: 0.8 }"
        :enter="{ opacity: 1, scale: 1, transition: { duration: 600 } }"
        class="mb-8"
      >
        <h1 class="text-[120px] md:text-[160px] font-black text-[#0B2747] leading-none mb-4">
          {{ error.statusCode }}
        </h1>
        <div class="w-32 h-1 bg-gradient-to-r from-[#FF6B00] to-[#006EFF] mx-auto rounded-full" />
      </div>

      <!-- Error Message -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: 200, duration: 600 } }"
      >
        <h2 class="text-[28px] md:text-[36px] font-bold text-[#0B2747] mb-4">
          {{ errorTitle }}
        </h2>
        <p class="text-[16px] text-gray-500 mb-12 leading-relaxed max-w-[480px] mx-auto">
          {{ errorMessage }}
        </p>
      </div>

      <!-- Action Buttons -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: 400, duration: 600 } }"
        class="flex flex-col sm:flex-row gap-4 justify-center items-center"
      >
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 h-14 px-8 bg-[#FF6B00] hover:bg-[#E56000] text-white rounded-full font-bold text-[16px] shadow-lg shadow-orange-500/20 transition-all transform hover:-translate-y-1"
        >
          <Home class="w-5 h-5" />
          返回首页
        </NuxtLink>
        
        <button
          @click="handleBack"
          class="inline-flex items-center gap-2 h-14 px-8 bg-white hover:bg-gray-50 text-[#0B2747] rounded-full font-bold text-[16px] border-2 border-gray-200 transition-all"
        >
          <ArrowLeft class="w-5 h-5" />
          返回上一页
        </button>
      </div>

      <!-- Help Section -->
      <div
        v-motion
        :initial="{ opacity: 0 }"
        :enter="{ opacity: 1, transition: { delay: 600, duration: 600 } }"
        class="mt-16 pt-8 border-t border-gray-200"
      >
        <p class="text-[14px] text-gray-400 mb-4">需要帮助？联系我们</p>
        <div class="flex justify-center gap-6">
          <a
            href="tel:4000751117"
            class="flex items-center gap-2 text-[#006EFF] hover:text-[#0058CC] transition-colors text-[14px] font-medium"
          >
            <Phone class="w-4 h-4" />
            400-075-1117
          </a>
          <NuxtLink
            to="/contact"
            class="flex items-center gap-2 text-[#006EFF] hover:text-[#0058CC] transition-colors text-[14px] font-medium"
          >
            <Mail class="w-4 h-4" />
            联系客服
          </NuxtLink>
        </div>
      </div>

      <!-- Decorative Elements -->
      <div class="absolute top-20 right-20 w-64 h-64 bg-[#006EFF]/5 rounded-full blur-3xl -z-10" />
      <div class="absolute bottom-20 left-20 w-64 h-64 bg-[#FF6B00]/5 rounded-full blur-3xl -z-10" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Home, ArrowLeft, Phone, Mail } from 'lucide-vue-next'

interface ErrorProps {
  statusCode: number
  statusMessage?: string
  message?: string
}

const props = defineProps<{
  error: ErrorProps
}>()

const errorTitle = computed(() => {
  switch (props.error.statusCode) {
    case 404:
      return '页面未找到'
    case 500:
      return '服务器错误'
    case 403:
      return '访问被拒绝'
    default:
      return '出错了'
  }
})

const errorMessage = computed(() => {
  switch (props.error.statusCode) {
    case 404:
      return '抱歉，您访问的页面不存在或已被移除。您可以返回首页继续浏览，或联系我们获取帮助。'
    case 500:
      return '服务器遇到了一些问题，我们正在紧急修复中。请稍后再试，或联系客服获取帮助。'
    case 403:
      return '您没有权限访问此页面。如需帮助，请联系我们的客服团队。'
    default:
      return props.error.message || '页面加载出现问题，请稍后重试。'
  }
})

const handleBack = () => {
  if (window.history.length > 1) {
    window.history.back()
  } else {
    navigateTo('/')
  }
}

// SEO Meta Tags for Error Page
useHead({
  title: `${props.error.statusCode} - ${errorTitle.value} | 车拖车`,
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})
</script>
