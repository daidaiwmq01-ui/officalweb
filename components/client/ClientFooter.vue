<template>
  <footer class="py-20 bg-[#0B2747] text-white">
    <div class="container mx-auto max-w-[1200px] px-4">
      <div class="flex flex-col md:flex-row items-center justify-between gap-10 opacity-70">
        <div class="text-[14px] leading-relaxed max-w-[600px]">
          <div class="font-bold mb-4 flex items-center gap-2">
            <Globe class="w-4 h-4" /> 数字化服务愿景
          </div>
          车拖车致力于通过数字化手段重塑汽车物流生态。客户端作为核心入口，集成了
          AI
          智能询价、实时订单追踪及全方位售后保障，为轿车、房车及工程机械等全车型提供标准化、透明化的托运服务。
        </div>
        <div class="flex gap-10 text-[12px]">
          <div class="flex flex-col items-center gap-2">
            <div class="bg-white p-2 rounded-lg">
              <ImageWithFallback
                v-if="customerAndroidQr || customerIosQr"
                :src="customerAndroidQr || customerIosQr"
                alt="客户端下载二维码"
                class="w-20 h-20"
              />
            </div>
            <span class="font-bold">扫码下载客户端</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { Globe } from 'lucide-vue-next'
import ImageWithFallback from '@/components/ImageWithFallback.vue'
import { useDownloadInfo } from '@/composables/useDownloadInfo'

const { fetchIfNeeded, customerAndroidQr, customerIosQr } = useDownloadInfo()

onMounted(() => {
  fetchIfNeeded()
})
</script>
