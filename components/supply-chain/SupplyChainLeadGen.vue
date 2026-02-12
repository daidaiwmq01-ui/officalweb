<template>
  <section
    id="supply-chain-lead-form"
    class="py-24 bg-[#0B2747] font-['Noto_Sans_SC'] relative overflow-hidden"
  >
    <!-- Decorative background flair -->
    <div class="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
      <div class="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-[#006EFF] rounded-full blur-[120px]" />
      <div class="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-[#006EFF] rounded-full blur-[120px]" />
    </div>

    <div class="container mx-auto max-w-[1200px] px-4 relative z-10">
      <div class="text-center mb-12">
        <h2 
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visible-once="{ opacity: 1, y: 0 }"
          class="text-2xl sm:text-[36px] font-bold text-white mb-4"
        >
          为您的企业定制供应链物流方案
        </h2>
        <p class="text-white/70 text-[18px]">留下您的联系方式，我们的供应链专家将在 24 小时内为您提供专业评估</p>
      </div>

      <div
        v-motion
        :initial="{ opacity: 0, scale: 0.98 }"
        :visible-once="{ opacity: 1, scale: 1 }"
        class="max-w-[900px] mx-auto"
      >
        <form @submit.prevent="handleSubmit" class="flex flex-col md:flex-row items-center gap-4">
          <div class="w-full md:flex-1">
            <input 
              type="text" 
              placeholder="输入企业名称" 
              v-model="formData.company"
              class="w-full h-16 px-8 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#006EFF] transition-all text-[16px]"
            />
          </div>
          <div class="w-full md:flex-1">
            <input 
              type="tel" 
              placeholder="输入联系电话" 
              v-model="formData.phone"
              class="w-full h-16 px-8 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#006EFF] transition-all text-[16px]"
            />
          </div>
          <div class="w-full md:w-auto">
            <Button 
              type="submit"
              class="w-full md:w-auto h-16 px-12 rounded-full bg-[#FF6B00] hover:bg-[#E56000] text-white font-bold text-[18px] transition-all shadow-xl shadow-orange-500/20 border-none cursor-pointer"
            >
              立即咨询专家
            </Button>
          </div>
        </form>
      </div>
    </div>

    <div v-if="showCaptcha" class="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
      <div class="bg-white rounded-2xl w-full max-w-[420px] p-6 shadow-2xl">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-[18px] font-bold text-[#0B2747]">短信验证</h3>
          <button class="text-gray-400 hover:text-gray-600" @click="showCaptcha = false">✕</button>
        </div>
        <p class="text-[13px] text-gray-500 mb-4">验证码将发送至：{{ formData.phone }}</p>

        <div class="space-y-3">
          <div v-if="captchaEnabled" class="space-y-3">
            <div class="flex items-center gap-3">
              <input
                v-model="captchaCode"
                type="text"
                placeholder="输入图片验证码"
                class="flex-1 h-11 px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#006EFF]"
              />
              <button
                class="w-[120px] h-11 rounded-xl border border-gray-200 bg-gray-50 text-sm"
                @click="openCaptcha"
                :disabled="captchaLoading"
              >
                {{ captchaLoading ? '加载中...' : '刷新' }}
              </button>
            </div>
            <div class="flex items-center gap-3">
              <img
                v-if="captchaImg"
                :src="captchaImg"
                alt="验证码"
                class="h-11 rounded-lg border border-gray-200"
              />
              <span v-else class="text-xs text-gray-400">暂无验证码图片</span>
            </div>
          </div>
          <div v-else class="text-xs text-gray-400">
            当前无需图形验证码
          </div>

          <div class="flex items-center gap-3">
            <input
              v-model="smsCode"
              type="text"
              placeholder="输入短信验证码"
              class="flex-1 h-11 px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#006EFF]"
            />
            <button
              class="w-[120px] h-11 rounded-xl bg-[#006EFF] text-white text-sm font-bold disabled:opacity-60"
              @click="handleSendSms"
              :disabled="smsSending"
            >
              {{ smsSending ? '发送中...' : '获取验证码' }}
            </button>
          </div>
        </div>

        <div class="flex items-center justify-end gap-3 mt-6">
          <button class="px-4 h-10 rounded-xl border border-gray-200 text-gray-600" @click="showCaptcha = false">
            取消
          </button>
          <button class="px-5 h-10 rounded-xl bg-[#FF6B00] text-white font-bold" @click="handleConfirm">
            确认提交
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Button from '@/components/ui/Button.vue'
import { useToast } from '@/composables/useToast'
import { useOrderFee } from '@/composables/useOrderFee'
import { useOrderCaptcha } from '@/composables/useOrderCaptcha'

const toast = useToast()
const { submitOrderFee } = useOrderFee()
const { fetchCaptchaImage, sendSmsCode, checkCaptchaImage } = useOrderCaptcha()

const formData = ref({
  company: "",
  phone: ""
})

const showCaptcha = ref(false)
const captchaLoading = ref(false)
const captchaImg = ref("")
const captchaUuid = ref("")
const captchaCode = ref("")
const smsCode = ref("")
const smsSending = ref(false)
const captchaEnabled = ref(true)

const openCaptcha = async () => {
  showCaptcha.value = true
  captchaCode.value = ""
  smsCode.value = ""
  captchaLoading.value = true
  try {
    const res = await fetchCaptchaImage()
    captchaImg.value = res.img
    captchaUuid.value = res.uuid
    captchaEnabled.value = Boolean(res.img)
  } catch (error) {
    toast.error("获取验证码失败，请稍后重试")
    captchaEnabled.value = false
  } finally {
    captchaLoading.value = false
  }
}

const handleSubmit = async () => {
  if (!formData.value.company || !formData.value.phone) {
    toast.error("请完整填写企业信息")
    return
  }
  await openCaptcha()
}

const handleSendSms = async () => {
  if (!formData.value.phone) {
    toast.error("请先填写手机号")
    return
  }
  if (captchaEnabled.value && (!captchaCode.value || !captchaUuid.value)) {
    toast.error("请先填写图片验证码")
    return
  }
  smsSending.value = true
  try {
    if (captchaEnabled.value) {
      const checkRes: any = await checkCaptchaImage(captchaUuid.value, captchaCode.value)
      if (checkRes?.status !== 0 && checkRes?.status !== '0') {
        toast.error(checkRes?.msg || "图片验证码校验失败")
        return
      }
    }
    const response: any = await sendSmsCode({
      phone: formData.value.phone,
      captchaCode: captchaEnabled.value ? captchaCode.value : "",
      userType: "customer",
      uuid: captchaEnabled.value ? captchaUuid.value : ""
    })
    if (response?.status !== 0 && response?.status !== '0') {
      toast.error(response?.msg || "发送验证码失败")
      return
    }
    toast.success("短信验证码已发送")
    if (response?.data?.uuid) {
      captchaUuid.value = response.data.uuid
    }
  } catch (error) {
    toast.error("发送验证码失败")
  } finally {
    smsSending.value = false
  }
}

const handleConfirm = async () => {
  if (!smsCode.value) {
    toast.error("请输入短信验证码")
    return
  }

  try {
    const response: any = await submitOrderFee({
      channelSource: "3017",
      orderType: 0,
      carTypeCode: 1,
      carType: "轿车",
      origin: 110000,
      originCity: "北京",
      originProvince: "北京",
      destination: 440000,
      destCity: "广州",
      destProvince: "广东",
      phone: formData.value.phone,
      remark: `企业名称：${formData.value.company}`
    })

    if (response?.status !== 0 && response?.status !== '0') {
      toast.error(response?.msg || "提交失败，请稍后重试")
      return
    }

    toast.success("咨询申请已提交，专家将尽快与您联系！")
    formData.value = { company: "", phone: "" }
    showCaptcha.value = false
  } catch (error) {
    toast.error("提交失败，请稍后重试")
  }
}
</script>
