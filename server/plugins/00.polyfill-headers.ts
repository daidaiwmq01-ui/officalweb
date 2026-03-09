/**
 * Polyfill globalThis.Headers when missing (e.g. older Node or some edge runtimes).
 * Fixes: "Headers is not a constructor" when sitemap fetches /api/__sitemap__/urls.
 * Prefer Node 18+ in deployment so native fetch/Headers are available.
 */
export default defineNitroPlugin(async () => {
  if (typeof globalThis.Headers !== 'undefined') return
  try {
    // node-fetch-native/polyfill sets globalThis.Headers on load (Node only)
    await import('node-fetch-native/polyfill')
  } catch {
    // Fallback: undici (bundled in Node 18+)
    try {
      const undici = await import('undici')
      if (undici.Headers) (globalThis as any).Headers = undici.Headers
    } catch {
      // non-Node or no undici; leave Headers missing
    }
  }
})
