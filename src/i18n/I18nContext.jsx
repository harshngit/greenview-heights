import { createContext, Fragment, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { DOCUMENTS, GALLERY, NOTICES } from '../data/mockData'
import { SITE } from '../data/site'
import { load, save } from '../lib/storage'
import { formatDate, formatLongDate, shortMonth } from '../lib/format'
import en from './en'
import hi from './hi'
import mr from './mr'

// Site language: English, Hindi or Marathi. Every translation is
// hand-written in en.js / hi.js / mr.js; nothing is machine-translated
// at runtime. The choice is remembered in this browser.

export const LANGUAGES = [
  { code: 'en', short: 'EN', name: 'English', locale: 'en-IN' },
  { code: 'hi', short: 'हिं', name: 'हिंदी', locale: 'hi-IN' },
  { code: 'mr', short: 'मरा', name: 'मराठी', locale: 'mr-IN' },
]

const DICTS = { en, hi, mr }
const STORAGE_KEY = 'greenview-lang'

const initialLang = () => {
  const saved = load(STORAGE_KEY, null)
  if (DICTS[saved]) return saved
  const browser = (typeof navigator !== 'undefined' && navigator.language) || ''
  return browser.startsWith('mr') ? 'mr' : browser.startsWith('hi') ? 'hi' : 'en'
}

const lookup = (obj, path) => path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj)

const fill = (value, vars) => {
  if (!vars) return value
  if (typeof value === 'string') return value.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m))
  if (Array.isArray(value)) return value.map((v) => fill(v, vars))
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, fill(v, vars)]))
  return value
}

// Sample notices, documents and photos can be edited in the Admin Preview.
// A translation is used only while the English text still matches the
// original sample, so an edited item never shows an outdated translation.
const BASE = {
  notices: new Map(NOTICES.map((n) => [n.id, n])),
  documents: new Map(DOCUMENTS.map((d) => [d.id, d])),
  gallery: new Map(GALLERY.map((g) => [g.id, g])),
}
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b)

// Renders *text* as the accent <em> used in headings.
export function Rich({ text, emClassName = 'text-forest-700' }) {
  return text.split(/\*(.+?)\*/g).map((part, i) =>
    i % 2 ? <em key={i} className={emClassName}>{part}</em> : <Fragment key={i}>{part}</Fragment>,
  )
}

const I18nContext = createContext(null)

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(initialLang)
  const dict = DICTS[lang]
  const meta = LANGUAGES.find((l) => l.code === lang)

  const setLang = useCallback((code) => {
    if (!DICTS[code]) return
    setLangState(code)
    save(STORAGE_KEY, code)
  }, [])

  const t = useCallback((key, vars) => fill(lookup(dict, key) ?? lookup(en, key) ?? key, vars), [dict])

  const cat = useCallback((name) => dict.categories?.[name] ?? name, [dict])

  // One item from an editable collection (notices, documents, gallery).
  const tr = useCallback(
    (collection, item) => {
      if (!item) return item
      const tx = dict.data?.[collection]?.[item.id]
      if (!tx) return item
      const base = BASE[collection]?.get(item.id)
      const { attachment, ...fields } = tx
      if (base && Object.keys(fields).some((k) => !same(item[k], base[k]))) return item
      const out = { ...item, ...fields }
      if (attachment && item.attachment && item.attachment.label === base?.attachment?.label) out.attachment = { ...item.attachment, label: attachment }
      return out
    },
    [dict],
  )

  // A fixed list from mockData: matched by id, or by position when the
  // translation is an array.
  const list = useCallback(
    (collection, items) => {
      const tx = dict.data?.[collection]
      if (!tx) return items
      return items.map((item, i) => {
        const x = Array.isArray(tx) ? tx[i] : tx[item.id]
        if (x == null) return item
        return typeof item === 'string' ? x : { ...item, ...x }
      })
    },
    [dict],
  )

  const site = useMemo(() => {
    const s = { ...en.site, ...dict.site }
    return { ...SITE, ...s, address: { ...SITE.address, ...s.address }, officeHours: s.officeHours ?? SITE.officeHours }
  }, [dict])

  const fmt = useMemo(
    () => ({
      date: (iso) => formatDate(iso, meta.locale),
      longDate: (iso) => formatLongDate(iso, meta.locale),
      month: (iso) => shortMonth(iso, meta.locale),
    }),
    [meta],
  )

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = t('meta.title')
  }, [lang, t])

  const value = useMemo(() => ({ lang, setLang, t, cat, tr, list, site, fmt }), [lang, setLang, t, cat, tr, list, site, fmt])
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export const useI18n = () => {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used inside I18nProvider')
  return ctx
}
