export const makeNewsPath = (id: number | string) => `/news/${id}.html`

export const parseNewsId = (value: string) => {
  if (!value) return value
  return value.replace(/\.html$/i, '')
}
