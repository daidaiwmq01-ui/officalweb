<template>
  <section id="price-calculator" class="bg-white py-24 font-['Noto_Sans_SC'] border-t border-gray-100">
    <div class="container mx-auto px-4 max-w-[1200px]">
      <div class="flex flex-col lg:flex-row gap-16 items-center">
        <div class="lg:w-1/2">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#006EFF] text-xs font-bold mb-6">
            <Calculator class="w-3 h-3" />
            <span>实时查价系统 v4.0</span>
          </div>
          <h2 class="text-2xl sm:text-[36px] font-bold text-[#0B2747] leading-[1.6] mb-6">
            透明计费，
            <br />
            一键获取小板车托运报价
          </h2>
          <p class="text-gray-500 text-lg mb-8 leading-relaxed">
            输入出发地与目的地，系统将根据实时运力分布及里程，秒级生成标准托运方案。
          </p>

          <ul class="space-y-4">
            <li
              v-for="(item, i) in features"
              :key="i"
              class="flex items-center gap-3 text-gray-700"
            >
              <div class="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                <ChevronRight class="w-3 h-3 text-green-600" />
              </div>
              <span class="text-sm font-medium">
                {{ item }}
              </span>
            </li>
          </ul>
        </div>

        <div class="lg:w-1/2 w-full">
          <div
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visible="{ opacity: 1, y: 0 }"
            :visibleOnce="true"
            class="w-full max-w-[480px] bg-white/98 border border-[#F3F4F6] rounded-2xl p-4 sm:p-8 shadow-xl relative"
          >
            <!-- Header Section -->
            <div class="mb-8">
              <h3 class="text-[20px] font-bold text-[#0B2747]">
                小板车托运在线估价
              </h3>
              <div class="flex items-center gap-2 mt-2 text-[12px] text-[#6B7280]">
                <Sparkles
                  :size="14"
                  class="text-[#006EFF]"
                />
                <span>
                  AI智能定价 · 拒绝隐形消费 · 5秒获取报价
                </span>
              </div>
            </div>

            <div class="space-y-6">
              <!-- Location Input Group -->
              <div class="relative space-y-4">
                <!-- Start Point -->
                <div class="relative">
                  <MapPin class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#10B981]" />
                  <input
                    type="text"
                    placeholder="请输入出发地 (例如: 北京朝阳区)"
                    class="w-full h-12 bg-gray-50 rounded-lg pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#006EFF] transition-all"
                    :value="fromCity"
                    @focus="() => openSuggestions('from')"
                    @blur="closeSuggestions"
                    @input="(e: Event) => handleLocationInput('from', e)"
                  />
                  <!-- Simulated Dropdown -->
                  <div
                    v-if="activeField === 'from' && suggestions.length > 0"
                    class="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-100 rounded-lg shadow-lg z-20 py-1 overflow-hidden"
                  >
                    <div
                      v-for="item in suggestions"
                      :key="item.id"
                      class="px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 cursor-pointer"
                      @click="() => handleSuggestionSelect('from', item)"
                    >
                      <div class="font-medium text-gray-700">
                        {{ item.title }}
                      </div>
                      <div v-if="item.address" class="text-[11px] text-gray-400 mt-1">
                        {{ item.address }}
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Connecting Line Visual -->
                <div class="absolute left-5 top-10 bottom-10 w-[1px] border-l border-dashed border-gray-300 pointer-events-none" />

                <!-- End Point -->
                <div class="relative">
                  <MapPin class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#FF6B00]" />
                  <input
                    type="text"
                    placeholder="请输入目的地"
                    class="w-full h-12 bg-gray-50 rounded-lg pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#006EFF] transition-all"
                    :value="toCity"
                    @focus="() => openSuggestions('to')"
                    @blur="closeSuggestions"
                    @input="(e: Event) => handleLocationInput('to', e)"
                  />
                  <div
                    v-if="activeField === 'to' && suggestions.length > 0"
                    class="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-100 rounded-lg shadow-lg z-20 py-1 overflow-hidden"
                  >
                    <div
                      v-for="item in suggestions"
                      :key="item.id"
                      class="px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 cursor-pointer"
                      @click="() => handleSuggestionSelect('to', item)"
                    >
                      <div class="font-medium text-gray-700">
                        {{ item.title }}
                      </div>
                      <div v-if="item.address" class="text-[11px] text-gray-400 mt-1">
                        {{ item.address }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Vehicle Type Selector -->
              <div class="space-y-2">
                <label class="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  选择托运车型
                </label>
                <div class="relative">
                  <div
                    @click="isVehicleOpen = !isVehicleOpen"
                    class="h-12 bg-gray-50 rounded-lg flex items-center justify-between px-4 cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                    <span
                      :class="carType ? 'text-sm font-medium text-gray-700' : 'text-sm text-gray-400'"
                    >
                      {{ carType || '请选择车型 (如: 轿车/SUV)' }}
                    </span>
                    <ChevronDown
                      :class="`w-4 h-4 text-gray-400 transition-transform ${isVehicleOpen ? 'rotate-180' : ''}`"
                    />
                  </div>

                  <!-- Dropdown Menu (Chips Grid) -->
                  <div
                    v-if="isVehicleOpen"
                    class="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-xl z-30 p-4"
                  >
                    <div v-if="vehicleLoading" class="text-xs text-gray-400 py-2">
                      正在加载车型...
                    </div>
                    <div v-else class="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      <button
                        v-for="type in vehicleOptions"
                        :key="type.label"
                        @click="() => { carType = type.label; carTypeCode = type.code; isVehicleOpen = false }"
                        :class="`py-2 rounded-lg text-xs font-medium transition-all border ${
                          carType === type.label
                            ? 'bg-blue-100 border-[#006EFF] text-[#006EFF]'
                            : 'bg-white border-gray-100 text-gray-500 hover:border-gray-200'
                        }`"
                      >
                        {{ type.label }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Carrier Board Selector -->
              <div class="space-y-2">
                <label class="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  承运板车
                </label>
                <div class="relative">
                  <div
                    @click="!isCarrierLocked && (isCarrierOpen = !isCarrierOpen)"
                    :class="`h-12 rounded-lg flex items-center justify-between px-4 transition-colors ${
                      isCarrierLocked ? 'bg-gray-100 cursor-not-allowed text-gray-300' : 'bg-gray-50 cursor-pointer hover:bg-gray-100'
                    }`"
                  >
                    <span
                      :class="carrierBoard ? 'text-sm font-medium text-gray-700' : 'text-sm text-gray-400'"
                    >
                      {{ carrierBoard || (isCarrierLocked ? '请先选择托运车型' : '请选择承运板车') }}
                    </span>
                    <ChevronDown
                      :class="`w-4 h-4 text-gray-400 transition-transform ${isCarrierOpen ? 'rotate-180' : ''}`"
                    />
                  </div>

                  <div
                    v-if="isCarrierOpen && !isCarrierLocked"
                    class="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-xl z-30 p-4 max-h-72 overflow-auto space-y-4"
                  >
                    <div v-if="carrierLoading" class="text-xs text-gray-400 py-2">
                      正在加载板车数据...
                    </div>
                    <div v-else-if="carrierTreeData.length === 0" class="text-xs text-gray-400 py-2">
                      暂无可选板车
                    </div>
                    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div class="space-y-2 border border-gray-100 rounded-lg p-3">
                        <div class="text-[11px] font-bold text-gray-400 uppercase tracking-wider">1. 板车类型</div>
                        <div class="grid grid-cols-2 gap-2">
                          <button
                            v-for="vehicle in carrierTreeData"
                            :key="vehicle.id"
                            @click="() => handleCarrierVehicleSelect(vehicle.id)"
                            :class="`py-2 rounded-lg text-xs font-medium transition-all border ${
                              selectedCarrierVehicleId === vehicle.id
                                ? 'bg-blue-100 border-[#006EFF] text-[#006EFF]'
                                : 'bg-white border-gray-100 text-gray-500 hover:border-gray-200'
                            }`"
                          >
                            {{ vehicle.name }}
                          </button>
                        </div>
                      </div>

                      <div class="space-y-2 border border-gray-100 rounded-lg p-3">
                        <div class="text-[11px] font-bold text-gray-400 uppercase tracking-wider">2. 吨位</div>
                        <div v-if="currentCarrierVehicleTypes.length > 0" class="grid grid-cols-2 gap-2">
                          <button
                            v-for="typeNode in currentCarrierVehicleTypes"
                            :key="typeNode.id"
                            @click="() => handleCarrierTypeSelect(typeNode.id)"
                            :class="`py-2 rounded-lg text-xs font-medium transition-all border ${
                              selectedCarrierTypeId === typeNode.id
                                ? 'bg-blue-100 border-[#006EFF] text-[#006EFF]'
                                : 'bg-white border-gray-100 text-gray-500 hover:border-gray-200'
                            }`"
                          >
                            {{ typeNode.name }}
                          </button>
                        </div>
                        <div v-else class="text-xs text-gray-400 py-2">
                          请先选择板车类型
                        </div>
                      </div>

                      <div class="space-y-2 border border-gray-100 rounded-lg p-3">
                        <div class="text-[11px] font-bold text-gray-400 uppercase tracking-wider">3. 牌照</div>
                        <div v-if="currentCarrierLicensePlates.length > 0" class="grid grid-cols-1 gap-2">
                          <button
                            v-for="plateNode in currentCarrierLicensePlates"
                            :key="plateNode.value"
                            @click="() => handleCarrierPlateSelect(plateNode)"
                            :class="`py-2 px-3 rounded-lg text-xs font-medium text-left transition-all border ${
                              carrierBoard === plateNode.label
                                ? 'bg-blue-100 border-[#006EFF] text-[#006EFF]'
                                : 'bg-white border-gray-100 text-gray-500 hover:border-gray-200'
                            }`"
                          >
                            {{ plateNode.label }}
                          </button>
                        </div>
                        <div v-else class="text-xs text-gray-400 py-2">
                          请先选择吨位
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Phone Input -->
              <div class="space-y-2">
                <label class="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  手机号
                </label>
                <div class="relative">
                  <input
                    type="tel"
                    inputmode="numeric"
                    placeholder="请输入手机号"
                    class="w-full h-12 bg-gray-50 rounded-lg px-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#006EFF] transition-all"
                    :value="phoneNumber"
                    @input="(e: Event) => phoneNumber = (e.target as HTMLInputElement).value"
                  />
                </div>
              </div>

              <!-- Action Area -->
              <div class="space-y-4 pt-2">
                <button
                  @click="handleCalculate"
                  :disabled="isCalculating || !fromCity || !toCity || !carType || !phoneNumber"
                  class="w-full h-[56px] bg-gradient-to-r from-[#FF6B00] to-[#E56000] text-white font-bold text-[18px] rounded-xl transition-all shadow-lg shadow-orange-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2"
                >
                  <div
                    v-if="isCalculating"
                    class="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"
                  />
                  <span v-else>立即获取报价</span>
                </button>

                <div v-if="errorMessage" class="text-xs text-red-500 text-center">
                  {{ errorMessage }}
                </div>

                <!-- Secondary Action -->
                <div class="flex items-center justify-center gap-2 text-xs text-gray-400">
                  <span>或使用微信扫码下单</span>
                  <button 
                    @click="handleQRClick"
                    class="flex items-center gap-1 text-[#006EFF] font-medium hover:underline bg-transparent border-none cursor-pointer p-0"
                  >
                    <QrCode :size="16" />
                    <span>点击弹出小程序码</span>
                  </button>
                </div>
              </div>

              <!-- Result Display -->
              <div
                v-if="result"
                v-motion
                :initial="{ opacity: 0, scale: 0.95 }"
                :enter="{ opacity: 1, scale: 1 }"
                class="mt-6 pt-6 border-t border-dashed border-gray-200"
              >
                <div class="flex justify-between items-end mb-4">
                  <div>
                    <p class="text-xs text-gray-400 mb-1">
                      预计里程
                    </p>
                    <p class="text-lg font-bold text-[#0B2747]">
                      {{ result.distance }} km
                    </p>
                  </div>
                  <div class="text-right">
                    <p class="text-xs text-gray-400 mb-1">
                      预估价格
                    </p>
                    <p class="text-2xl font-bold text-[#FF6B00]">
                      ¥{{ result.total }}
                    </p>
                  </div>
                </div>
                <div class="bg-green-50 rounded-xl p-3 flex items-start gap-3">
                  <ShieldCheck class="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                  <p class="text-[11px] text-gray-600">
                    价格包含全额物流责任险，最高赔付
                    <strong>¥500,000</strong>。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mini Program Modal (Desktop Only) -->
    <Dialog v-model="isMiniProgramModalOpen">
      <DialogContent class="sm:max-w-[400px] bg-white p-0 overflow-hidden rounded-2xl gap-0">
        <div class="p-8 flex flex-col items-center text-center">
          <DialogHeader class="mb-2 p-0 space-y-0">
            <DialogTitle class="text-[22px] font-bold text-[#0B2747] text-center">微信扫码 · 3秒获取报价</DialogTitle>
          </DialogHeader>
          <DialogDescription class="text-[14px] text-gray-500 mb-8 max-w-[260px] leading-relaxed">
            无需下载，支持小板车、大板车、救援实时测算
          </DialogDescription>
          
          <!-- QR Code Container -->
          <div class="relative w-[180px] h-[180px] bg-white border-2 border-[#0B2747]/5 rounded-xl flex items-center justify-center mb-6 shadow-inner">
            <ImageWithFallback 
              src="/image/contectQR/liteprogress.webp"
              alt="WeChat Mini Program QR"
              class="w-full h-full p-2"
            />
          </div>

          <div class="text-[14px] text-gray-400 mb-6 font-medium">
            打开微信 [扫一扫]
          </div>
        </div>
      </DialogContent>
    </Dialog>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'
import {
  Calculator,
  MapPin,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  QrCode,
  MessageCircle,
} from 'lucide-vue-next'
import Dialog from '@/components/ui/Dialog.vue'
import DialogContent from '@/components/ui/DialogContent.vue'
import DialogHeader from '@/components/ui/DialogHeader.vue'
import DialogTitle from '@/components/ui/DialogTitle.vue'
import DialogDescription from '@/components/ui/DialogDescription.vue'
import ImageWithFallback from '@/components/ImageWithFallback.vue'
import { VEHICLE_TYPES, PRICE_CALCULATOR_FEATURES } from '~/config/vehicle-types'

const fromCity = ref('')
const toCity = ref('')
const carType = ref('')
const carTypeCode = ref<number | null>(null)
const carrierBoard = ref('')
const phoneNumber = ref('')
const isCalculating = ref(false)
const isVehicleOpen = ref(false)
const isCarrierOpen = ref(false)
const isMiniProgramModalOpen = ref(false)
const isMobile = ref(false)
const activeField = ref<'from' | 'to' | null>(null)

const config = useRuntimeConfig()
const TMAP_KEY = config.public.tmapKey
const TMAP_SCRIPT_ID = 'tmap-js-sdk'
const TMAP_SCRIPT_SRC = `https://map.qq.com/api/gljs?v=1.exp&key=${TMAP_KEY}&libraries=service`

interface Result {
  distance: number
  basePrice: number
  insurance: number
  total: number
}

const result = ref<Result | null>(null)

interface CarrierLicensePlateNode {
  id: string
  name: string
  info?: any
}

interface CarrierVehicleTypeNode {
  id: string
  name: string
  licensePlate: CarrierLicensePlateNode[]
}

interface CarrierVehicleNode {
  id: string
  name: string
  vehicleType: CarrierVehicleTypeNode[]
}

interface CarrierPlateOption {
  value: string
  label: string
}

interface SuggestionItem {
  id: string
  title: string
  address?: string
  adcode?: number
  city?: string
  province?: string
}

const suggestions = ref<SuggestionItem[]>([])
const suggestionService = ref<any>(null)
const tmapLoaded = ref(false)
let fromDebounceTimer: number | null = null
let toDebounceTimer: number | null = null
let blurTimer: number | null = null

const carrierTreeData = ref<CarrierVehicleNode[]>([])
const selectedCarrierVehicleId = ref<string>('')
const selectedCarrierTypeId = ref<string>('')
const carrierLoading = ref(false)
const vehicleOptions = ref<{ label: string; code: number }[]>([])
const vehicleLoading = ref(false)
const errorMessage = ref('')

const originMeta = ref<{ adcode?: number; city?: string; province?: string }>({})
const destMeta = ref<{ adcode?: number; city?: string; province?: string }>({})

const fallbackVehicleTypes = VEHICLE_TYPES
const features = PRICE_CALCULATOR_FEATURES

const isCarrierLocked = computed(() => !carType.value)
const currentCarrierVehicle = computed(() =>
  carrierTreeData.value.find((item) => item.id === selectedCarrierVehicleId.value)
)
const currentCarrierVehicleTypes = computed(
  () => currentCarrierVehicle.value?.vehicleType || []
)
const currentCarrierType = computed(() =>
  currentCarrierVehicleTypes.value.find((item) => item.id === selectedCarrierTypeId.value)
)
const currentCarrierLicensePlates = computed<CarrierPlateOption[]>(() => {
  if (!currentCarrierType.value) return []
  return currentCarrierType.value.licensePlate.map((plateNode) => {
    const infoDesc = String(plateNode.info?.infoDesc || '').trim()
    const label = infoDesc
      ? `${plateNode.name}（${infoDesc}）`
      : plateNode.name
    const value = String(plateNode.info?.id ?? plateNode.id)
    return { value, label }
  })
})

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
}

const handleQRClick = () => {
  if (isMobile.value) {
    window.location.href = 'weixin://dl/business/?t=chetuoche_quote'
  } else {
    isMiniProgramModalOpen.value = true
  }
}

const normalizeCarrierTree = (payload: any): CarrierVehicleNode[] => {
  const getTopLevelList = (input: any): any[] => {
    if (Array.isArray(input)) return input
    if (Array.isArray(input?.data)) return input.data
    if (Array.isArray(input?.data?.list)) return input.data.list
    if (Array.isArray(input?.data?.rows)) return input.data.rows
    return []
  }

  return getTopLevelList(payload).map((vehicleNode: any) => {
    const vehicleId = String(vehicleNode?.id ?? vehicleNode?.value ?? '')
    const vehicleName = String(vehicleNode?.name || vehicleNode?.title || vehicleNode?.label || '')
    const typeNodes = Array.isArray(vehicleNode?.vehicleType)
      ? vehicleNode.vehicleType
      : Array.isArray(vehicleNode?.children)
        ? vehicleNode.children
        : []

    const vehicleType = typeNodes.map((typeNode: any) => {
      const typeId = String(typeNode?.id ?? typeNode?.value ?? '')
      const typeName = String(typeNode?.name || typeNode?.title || typeNode?.label || '')
      const plateNodes = Array.isArray(typeNode?.licensePlate)
        ? typeNode.licensePlate
        : Array.isArray(typeNode?.children)
          ? typeNode.children
          : []

      const licensePlate = plateNodes.map((plateNode: any) => ({
        id: String(plateNode?.id ?? plateNode?.value ?? ''),
        name: String(plateNode?.name || plateNode?.title || plateNode?.label || ''),
        info: plateNode?.info || null,
      }))

      return {
        id: typeId,
        name: typeName,
        licensePlate,
      }
    })

    return {
      id: vehicleId,
      name: vehicleName,
      vehicleType,
    }
  }).filter((item: CarrierVehicleNode) => item.id && item.name)
}

const normalizeVehicleOptions = (payload: any): { label: string; code: number }[] => {
  const list: { label: string; code: number }[] = []
  const pushItem = (item: any) => {
    if (!item) return
    const label = String(item.carModel || item.name || item.title || item.label || item.value || item.carType || '')
    const code = Number(item.carModelCode ?? item.code ?? item.id ?? item.value ?? 0)
    if (!label) return
    list.push({ label, code })
  }
  if (Array.isArray(payload)) {
    payload.forEach(pushItem)
  } else if (Array.isArray(payload?.data)) {
    payload.data.forEach(pushItem)
  } else if (Array.isArray(payload?.data?.list)) {
    payload.data.list.forEach(pushItem)
  } else if (Array.isArray(payload?.data?.rows)) {
    payload.data.rows.forEach(pushItem)
  }
  const unique = new Map<string, { label: string; code: number }>()
  list.forEach((item) => {
    if (!unique.has(item.label)) {
      unique.set(item.label, item)
    }
  })
  return Array.from(unique.values())
}

const fetchVehicleOptions = async () => {
  vehicleLoading.value = true
  try {
    const res = await $fetch('/api/order/vehicleCombine/listRecommend', { method: 'GET' })
    const list = normalizeVehicleOptions(res)
    vehicleOptions.value = list.length > 0 ? list : fallbackVehicleTypes
  } catch (error) {
    vehicleOptions.value = fallbackVehicleTypes
  } finally {
    vehicleLoading.value = false
  }
}

const fetchCarrierOptions = async () => {
  carrierLoading.value = true
  try {
    const res = await $fetch('/api/order/vehicleCombine/listTree/v2', { method: 'GET' })
    carrierTreeData.value = normalizeCarrierTree(res)
  } catch (error) {
    carrierTreeData.value = []
  } finally {
    carrierLoading.value = false
  }
}

const handleCarrierVehicleSelect = (vehicleId: string) => {
  selectedCarrierVehicleId.value = vehicleId
  selectedCarrierTypeId.value = ''
  carrierBoard.value = ''
}

const handleCarrierTypeSelect = (typeId: string) => {
  selectedCarrierTypeId.value = typeId
  carrierBoard.value = ''
}

const handleCarrierPlateSelect = (plate: CarrierPlateOption) => {
  const vehicleName = currentCarrierVehicle.value?.name || ''
  const typeName = currentCarrierType.value?.name || ''
  carrierBoard.value = [vehicleName, typeName, plate.label].filter(Boolean).join(' · ')
  isCarrierOpen.value = false
}

const loadTMap = () => {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('TMap only runs in browser'))
  }
  if ((window as any).TMap?.service) {
    return Promise.resolve((window as any).TMap)
  }

  const existingScript = document.getElementById(TMAP_SCRIPT_ID) as HTMLScriptElement | null
  if (existingScript) {
    return new Promise((resolve, reject) => {
      existingScript.addEventListener('load', () => resolve((window as any).TMap))
      existingScript.addEventListener('error', () => reject(new Error('TMap script failed to load')))
    })
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.id = TMAP_SCRIPT_ID
    script.src = TMAP_SCRIPT_SRC
    script.async = true
    script.onload = () => resolve((window as any).TMap)
    script.onerror = () => reject(new Error('TMap script failed to load'))
    document.head.appendChild(script)
  })
}

const initSuggestionService = async () => {
  try {
    const TMap = await loadTMap()
    if (!TMap?.service?.Suggestion) {
      return
    }
    suggestionService.value = new TMap.service.Suggestion({
      pageSize: 6,
      policy: 1,
    })
    tmapLoaded.value = true
  } catch (error) {
    console.warn('[PriceCalculator] Tencent map init failed', error)
  }
}

const scheduleSuggestionFetch = (field: 'from' | 'to', keyword: string) => {
  const trimmed = keyword.trim()
  if (!trimmed) {
    suggestions.value = []
    return
  }

  const timerRef = field === 'from' ? fromDebounceTimer : toDebounceTimer
  if (timerRef) {
    window.clearTimeout(timerRef)
  }

  const timeoutId = window.setTimeout(() => {
    void fetchSuggestions(field, trimmed)
  }, 250)

  if (field === 'from') {
    fromDebounceTimer = timeoutId
  } else {
    toDebounceTimer = timeoutId
  }
}

const fetchSuggestions = async (field: 'from' | 'to', keyword: string) => {
  if (!suggestionService.value || !tmapLoaded.value) {
    return
  }
  try {
    const response = await suggestionService.value.getSuggestions({
      keyword,
    })
    if (activeField.value !== field) {
      return
    }
    if (response?.status === 0 && Array.isArray(response.data)) {
      suggestions.value = response.data.map((item: any, index: number) => ({
        id: `${field}-${item.id || item.title || index}`,
        title: item.title || item.name || keyword,
        address: item.address || item.district || '',
        adcode: Number(item.adcode || 0) || undefined,
        city: item.city || item.cityname || '',
        province: item.province || item.prov || '',
      }))
    } else {
      suggestions.value = []
    }
  } catch (error) {
    suggestions.value = []
  }
}

const openSuggestions = (field: 'from' | 'to') => {
  if (blurTimer) {
    window.clearTimeout(blurTimer)
  }
  activeField.value = field
  const currentValue = field === 'from' ? fromCity.value : toCity.value
  if (currentValue.trim()) {
    scheduleSuggestionFetch(field, currentValue)
  }
}

const closeSuggestions = () => {
  if (blurTimer) {
    window.clearTimeout(blurTimer)
  }
  blurTimer = window.setTimeout(() => {
    activeField.value = null
  }, 200)
}

const handleLocationInput = (field: 'from' | 'to', event: Event) => {
  const value = (event.target as HTMLInputElement).value
  if (field === 'from') {
    fromCity.value = value
    originMeta.value = {}
  } else {
    toCity.value = value
    destMeta.value = {}
  }
  activeField.value = field
  scheduleSuggestionFetch(field, value)
}

const handleSuggestionSelect = (field: 'from' | 'to', item: SuggestionItem) => {
  if (field === 'from') {
    fromCity.value = item.title
    originMeta.value = {
      adcode: item.adcode,
      city: item.city,
      province: item.province,
    }
  } else {
    toCity.value = item.title
    destMeta.value = {
      adcode: item.adcode,
      city: item.city,
      province: item.province,
    }
  }
  suggestions.value = []
  activeField.value = null
}

const handleCalculate = () => {
  if (!fromCity.value || !toCity.value) return

  isCalculating.value = true
  errorMessage.value = ''
  const originCode = originMeta.value.adcode
  const destCode = destMeta.value.adcode

  if (!carType.value || carTypeCode.value === null) {
    errorMessage.value = '请选择托运车型'
    isCalculating.value = false
    return
  }

  if (!originCode || !destCode) {
    errorMessage.value = '请从下拉建议中选择出发地与目的地'
    isCalculating.value = false
    return
  }

  if (!phoneNumber.value.trim()) {
    errorMessage.value = '请输入手机号'
    isCalculating.value = false
    return
  }

  const remarkParts = []
  if (carrierBoard.value) {
    remarkParts.push(`承运板车:${carrierBoard.value}`)
  }

  const payload = {
    channelSource: '3017',
    orderType: 0,
    carTypeCode: carTypeCode.value,
    carType: carType.value,
    origin: originCode,
    originCity: originMeta.value.city || '',
    originProvince: originMeta.value.province || '',
    destination: destCode,
    destCity: destMeta.value.city || '',
    destProvince: destMeta.value.province || '',
    phone: phoneNumber.value.trim(),
    remark: remarkParts.join('；'),
  }

  $fetch('/api/order/orderFeeV4', {
    method: 'POST',
    body: payload,
  })
    .then((response: any) => {
      const data = response?.data ?? response?.result ?? response
      const total =
        Number(data?.totalFee ?? data?.total ?? data?.amount ?? data?.price ?? data?.fee ?? 0) || 0
      const distance = Number(data?.distance ?? data?.mile ?? data?.km ?? 0) || 0
      const insurance = Number(data?.insuranceFee ?? data?.insurance ?? 0) || 0
      const basePrice = Number(data?.baseFee ?? data?.basePrice ?? Math.max(total - insurance, 0))

      if (!total) {
        errorMessage.value = response?.msg || response?.message || '未获取到有效运费'
        result.value = null
        return
      }

      result.value = {
        distance,
        basePrice,
        insurance,
        total,
      }
    })
    .catch((error) => {
      errorMessage.value = error?.message || '运费请求失败'
      result.value = null
    })
    .finally(() => {
      isCalculating.value = false
    })
}

onMounted(() => {
  checkMobile()
  void initSuggestionService()
  void fetchVehicleOptions()
  void fetchCarrierOptions()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
  if (fromDebounceTimer) window.clearTimeout(fromDebounceTimer)
  if (toDebounceTimer) window.clearTimeout(toDebounceTimer)
  if (blurTimer) window.clearTimeout(blurTimer)
})

watch(
  () => carType.value,
  () => {
    if (!carType.value) {
      carTypeCode.value = null
    }
    selectedCarrierVehicleId.value = ''
    selectedCarrierTypeId.value = ''
    carrierBoard.value = ''
    isCarrierOpen.value = false
  }
)
</script>
