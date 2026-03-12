/**
 * Fallback shim for "#internal/nuxt/paths".
 * Normally Nitro's dev worker resolves this as a virtual module; this file
 * serves as a fallback for Node.js environments that fall through to native
 * subpath-import resolution (e.g. Node ≥ 25 compatibility / direct execution).
 */
import { joinRelativeURL } from 'ufo'

const getAppConfig = () => ({
  baseURL: process.env.NUXT_APP_BASE_URL || '/',
  buildAssetsDir: process.env.NUXT_APP_BUILD_ASSETS_DIR || '/_nuxt/',
  cdnURL: process.env.NUXT_APP_CDN_URL || ''
})

export const baseURL = () => getAppConfig().baseURL
export const buildAssetsDir = () => getAppConfig().buildAssetsDir
export const buildAssetsURL = (...path) =>
  joinRelativeURL(publicAssetsURL(), buildAssetsDir(), ...path)
export const publicAssetsURL = (...path) => {
  const appConfig = getAppConfig()
  const publicBase = appConfig.cdnURL || appConfig.baseURL
  return path.length ? joinRelativeURL(publicBase, ...path) : publicBase
}

if (import.meta.client) {
  globalThis.__buildAssetsURL = buildAssetsURL
  globalThis.__publicAssetsURL = publicAssetsURL
}
