<template>
  <section id="luxury-quote-form" class="py-24 bg-white font-['Noto_Sans_SC']">
    <div class="container mx-auto max-w-[1200px] px-4">
      <div class="flex flex-col lg:flex-row items-center gap-20">
        
        <!-- Left Side: Text -->
        <div class="flex-1">
          <div
            v-motion
            :initial="{ opacity: 0, x: -30 }"
            :visible-once="{ opacity: 1, x: 0, transition: { duration: 600 } }"
          >
            <h2 class="text-2xl sm:text-3xl md:text-[40px] font-bold text-[#0B2747] mb-6 leading-[1.2]">
              开启您的定制托运方案
            </h2>
            <p class="text-[20px] text-[#4B5563] leading-relaxed max-w-[500px]">
              我们的行业专家将在 10 分钟内响应您的需求，并为您制定专属的高端运输方案。
            </p>
            <div class="mt-12 space-y-6">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-full bg-[#F0F7FF] flex items-center justify-center text-[#006EFF]">
                  <span class="font-bold">01</span>
                </div>
                <p class="text-[16px] font-medium text-[#0B2747]">1对1专属专家顾问全程跟进</p>
              </div>
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-full bg-[#F0F7FF] flex items-center justify-center text-[#006EFF]">
                  <span class="font-bold">02</span>
                </div>
                <p class="text-[16px] font-medium text-[#0B2747]">金融级NDA保密协议保障</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Side: Form -->
        <div class="flex-1 w-full max-w-[560px]">
          <div
            v-motion
            :initial="{ opacity: 0, x: 30 }"
            :visible-once="{ opacity: 1, x: 0, transition: { duration: 600 } }"
            class="bg-[#F8F9FB] p-10 rounded-3xl border border-[#E5E7EB] shadow-xl"
          >
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-2">
                  <label class="text-[14px] font-bold text-[#0B2747] ml-4">联系人姓名</label>
                  <input 
                    type="text" 
                    placeholder="您的姓名" 
                    v-model="formData.name"
                    class="w-full h-14 px-6 rounded-full bg-white border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#006EFF] transition-all"
                  />
                </div>
                <div class="space-y-2">
                  <label class="text-[14px] font-bold text-[#0B2747] ml-4">联系电话</label>
                  <input 
                    type="tel" 
                    placeholder="手机号码" 
                    v-model="formData.phone"
                    class="w-full h-14 px-6 rounded-full bg-white border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#006EFF] transition-all"
                  />
                </div>
              </div>
              <div class="space-y-2">
                <label class="text-[14px] font-bold text-[#0B2747] ml-4">托运车型</label>
                <input 
                  type="text" 
                  placeholder="例如：法拉利 296 GTB" 
                  v-model="formData.model"
                  class="w-full h-14 px-6 rounded-full bg-white border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#006EFF] transition-all"
                />
              </div>
              <div class="space-y-2">
                <label class="text-[14px] font-bold text-[#0B2747] ml-4">活动/用车日期</label>
                <input 
                  type="text" 
                  placeholder="YYYY-MM-DD" 
                  v-model="formData.date"
                  class="w-full h-14 px-6 rounded-full bg-white border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#006EFF] transition-all"
                />
              </div>
              <Button 
                type="submit"
                class="w-full h-16 rounded-full bg-[#FF6B00] hover:bg-[#E56000] text-white font-bold text-[18px] transition-all shadow-lg shadow-orange-500/20 border-none cursor-pointer mt-4"
              >
                立即咨询专家
              </Button>
            </form>
          </div>
        </div>

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
  name: "",
  phone: "",
  model: "",
  date: ""
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
  if (!formData.value.name || !formData.value.phone) {
    toast.error("请完整填写联系信息")
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
      remark: `联系人：${formData.value.name}; 车型：${formData.value.model || '未填写'}; 日期：${formData.value.date || '未填写'}`
    })

    if (response?.status !== 0 && response?.status !== '0') {
      toast.error(response?.msg || "提交失败，请稍后重试")
      return
    }

    toast.success("定制方案申请已提交，高级专家将尽快联系您！")
    formData.value = { name: "", phone: "", model: "", date: "" }
    showCaptcha.value = false
  } catch (error) {
    toast.error("提交失败，请稍后重试")
  }
}
</script>
