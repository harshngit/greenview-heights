// Dates follow the chosen language (month and day names) but always use
// Latin digits so they match phone numbers, amounts and flat numbers.
const formatters = new Map()
const dtf = (locale, opts) => {
  const key = `${locale}|${JSON.stringify(opts)}`
  if (!formatters.has(key)) formatters.set(key, new Intl.DateTimeFormat(`${locale}-u-nu-latn`, opts))
  return formatters.get(key)
}

// Dates are stored as YYYY-MM-DD; parse at local noon to avoid timezone shifts.
export const toDate = (iso) => new Date(`${iso}T12:00:00`)
export const formatDate = (iso, locale = 'en-IN') => dtf(locale, { day: 'numeric', month: 'short', year: 'numeric' }).format(toDate(iso))
export const formatLongDate = (iso, locale = 'en-IN') =>
  dtf(locale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(toDate(iso))
export const dayOfMonth = (iso) => toDate(iso).getDate()
export const shortMonth = (iso, locale = 'en-IN') => dtf(locale, { month: 'short' }).format(toDate(iso))
export const todayISO = () => {
  const d = new Date()
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}
export const byNewest = (a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0)
export const slugify = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 48) || 'item'
