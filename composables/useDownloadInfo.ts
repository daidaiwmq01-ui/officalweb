import { useRuntimeConfig } from '#app'

/**
 * 统一获取 APP 下载信息的 composable
 *
 * 对应接口文档中的：
 * - 接口地址: /apis/api/update/updateInfo
 * - 返回类型: DownloadMsg
 *
 * 在全站任意组件中调用 useDownloadInfo()，即可拿到客户端 / 司机端的下载链接
 * 以及基于链接生成的二维码地址。
 */
export const useDownloadInfo = () => {
  const config = useRuntimeConfig()

  const state = useState('download-info', () => ({
    loaded: false,
    loading: false,
    error: null as string | null,
    // 客户端下载链接
    customerAndroidDownload: '',
    customerIosDownload: '',
    // 司机端下载链接
    driverAndroidDownload: '',
    driverIosDownload: '',
  }))

  const buildQr = (url: string, size = 160) => {
    if (!url) return ''
    // 使用第三方服务根据真实链接生成二维码图片
    return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(
      url,
    )}`
  }

  const fetchIfNeeded = async () => {
    if (state.value.loaded || state.value.loading) return

    state.value.loading = true
    state.value.error = null

    try {
      const data: any = await $fetch('/api/updateInfo', { method: 'GET' })

      const payload = (data as any)?.data || data || {}

      state.value.customerAndroidDownload =
        payload.customerAndroidDownload || ''
      state.value.customerIosDownload = payload.customerIosDownload || ''
      state.value.driverAndroidDownload =
        payload.driverAndroidDownload || ''
      state.value.driverIosDownload = payload.driverIosDownload || ''

      state.value.loaded = true
    } catch (e) {
      state.value.error = '获取下载信息失败，请稍后重试。'
    } finally {
      state.value.loading = false
    }
  }

  const customerAndroidQr = computed(() =>
    buildQr(state.value.customerAndroidDownload),
  )
  const customerIosQr = computed(() =>
    buildQr(state.value.customerIosDownload),
  )
  const driverAndroidQr = computed(() =>
    buildQr(state.value.driverAndroidDownload),
  )
  const driverIosQr = computed(() =>
    buildQr(state.value.driverIosDownload || state.value.driverAndroidDownload),
  )

  const openCustomerApp = (platform: 'ios' | 'android' = 'android') => {
    const url =
      platform === 'ios'
        ? state.value.customerIosDownload || state.value.customerAndroidDownload
        : state.value.customerAndroidDownload ||
          state.value.customerIosDownload

    if (url && typeof window !== 'undefined') {
      window.open(url, '_blank')
    }
  }

  const openDriverApp = (platform: 'ios' | 'android' = 'android') => {
    const url =
      platform === 'ios'
        ? state.value.driverIosDownload || state.value.driverAndroidDownload
        : state.value.driverAndroidDownload || state.value.driverIosDownload

    if (url && typeof window !== 'undefined') {
      window.open(url, '_blank')
    }
  }

  return {
    state,
    fetchIfNeeded,
    // 原始链接
    customerAndroidDownload: computed(
      () => state.value.customerAndroidDownload,
    ),
    customerIosDownload: computed(() => state.value.customerIosDownload),
    driverAndroidDownload: computed(
      () => state.value.driverAndroidDownload,
    ),
    driverIosDownload: computed(() => state.value.driverIosDownload),
    // 对应二维码
    customerAndroidQr,
    customerIosQr,
    driverAndroidQr,
    driverIosQr,
    // 打开链接的便捷方法
    openCustomerApp,
    openDriverApp,
  }
}
