interface OrderFeePayload {
  channelSource: string
  orderType: number
  carTypeCode: number
  carType: string
  origin: number
  originCity: string
  originProvince: string
  destination: number
  destCity: string
  destProvince: string
  phone: string
  remark: string
}

export const useOrderFee = () => {
  const submitOrderFee = async (payload: OrderFeePayload) => {
    return await $fetch('/api/order/orderFeeV4', {
      method: 'POST',
      body: payload
    })
  }

  return { submitOrderFee }
}
