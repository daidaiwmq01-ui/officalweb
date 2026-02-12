import { defineEventHandler, getRequestURL, sendNoContent } from 'h3'

/**
 * 处理对 GET /_nuxt 或 /_nuxt/ 的请求（无具体资源文件名）。
 * 某些客户端会请求该路径导致 404 并触发未处理的错误日志，
 * 此处直接返回 204 No Content，避免报错。
 */
export default defineEventHandler((event) => {
  const pathname = getRequestURL(event).pathname
  if ((pathname === '/_nuxt' || pathname === '/_nuxt/') && event.method === 'GET') {
    sendNoContent(event)
  }
})
