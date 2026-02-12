import { defineEventHandler, sendNoContent } from 'h3'

/**
 * 处理 GET /_nuxt（无尾部斜杠、无具体文件名）的请求。
 * 与 server/middleware/nuxt-path.ts 配合，避免对 /_nuxt 或 /_nuxt/ 的请求产生 404 错误日志。
 */
export default defineEventHandler((event) => {
  sendNoContent(event)
})
