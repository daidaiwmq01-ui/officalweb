export interface CaptchaImageResponse {
  data?: {
    uuid?: string
    img?: string
    captchaImg?: string
  }
  uuid?: string
  img?: string
}

export const useOrderCaptcha = () => {
  const fetchCaptchaImage = async () => {
    const res: CaptchaImageResponse = await $fetch('/api/order/captcha/img', {
      method: 'GET'
    })
    const payload = res?.data || res || {}
    const rawImg = payload.img || payload.captchaImg || ''
    const img = rawImg
      ? rawImg.startsWith('data:image')
        ? rawImg
        : `data:image/jpeg;base64,${rawImg}`
      : ''
    return {
      uuid: payload.uuid || '',
      img
    }
  }

  const checkCaptchaImage = async (uuid: string, captchaCode: string) => {
    return await $fetch('/api/order/captcha/img/check', {
      method: 'GET',
      query: { uuid, captchaCode }
    })
  }

  const sendSmsCode = async (payload: {
    phone: string
    captchaCode: string
    userType: string
    uuid: string
  }) => {
    return await $fetch('/api/order/captcha/phone', {
      method: 'POST',
      body: payload
    })
  }

  return {
    fetchCaptchaImage,
    checkCaptchaImage,
    sendSmsCode
  }
}
