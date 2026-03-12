/**
 * Polyfill globalThis.Headers/fetch for Node.js < 18.
 * Pure inline implementation — no external packages required.
 */
export default defineNitroPlugin(() => {
  if (typeof globalThis.Headers !== 'undefined') return

  // Minimal Headers polyfill compatible with Node.js 16
  class HeadersPolyfill {
    private _map: Map<string, string>

    constructor(init?: Record<string, string> | [string, string][] | HeadersPolyfill) {
      this._map = new Map()
      if (!init) return
      if (init instanceof HeadersPolyfill) {
        init._map.forEach((v, k) => this._map.set(k, v))
      } else if (Array.isArray(init)) {
        for (const [k, v] of init) this._map.set(k.toLowerCase(), v)
      } else {
        for (const [k, v] of Object.entries(init)) this._map.set(k.toLowerCase(), v)
      }
    }

    append(name: string, value: string) { this._map.set(name.toLowerCase(), value) }
    delete(name: string) { this._map.delete(name.toLowerCase()) }
    get(name: string) { return this._map.get(name.toLowerCase()) ?? null }
    has(name: string) { return this._map.has(name.toLowerCase()) }
    set(name: string, value: string) { this._map.set(name.toLowerCase(), value) }
    forEach(cb: (value: string, key: string) => void) { this._map.forEach((v, k) => cb(v, k)) }
    entries() { return this._map.entries() }
    keys() { return this._map.keys() }
    values() { return this._map.values() }
    [Symbol.iterator]() { return this._map.entries() }
  }

  (globalThis as any).Headers = HeadersPolyfill
})
