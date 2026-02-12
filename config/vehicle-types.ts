/**
 * 车辆类型配置
 * 用于价格计算器等功能
 */

export interface VehicleType {
  label: string
  code: number
}

export const VEHICLE_TYPES: VehicleType[] = [
  { label: '摩托车', code: 0 },
  { label: '轿车', code: 1 },
  { label: '跑车', code: 2 },
  { label: 'SUV', code: 3 },
  { label: '面包车', code: 4 },
  { label: '皮卡', code: 5 },
  { label: '叉车', code: 6 },
  { label: '电四轮', code: 7 },
  { label: '餐车', code: 8 },
  { label: '房车', code: 9 },
  { label: '货车', code: 10 },
  { label: '拖拉机', code: 11 },
  { label: '挖掘机', code: 12 },
]

export const PRICE_CALCULATOR_FEATURES = [
  '拒绝加价：系统一口价，不包含等待费过路费',
  '极速调度：下单后最快 5 秒钟接单',
  '全额保险：太平洋保险实时承保',
]
