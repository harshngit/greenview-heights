import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { DOCUMENTS, GALLERY, NOTICES } from '../data/mockData'
import { load, remove, save } from '../lib/storage'

// Demo content store. Notices, documents and gallery images start from
// mockData and any changes made in the Admin Preview are kept in this
// browser's localStorage only. Nothing is sent to a server.

const STORAGE_KEY = 'greenview-demo-content-v1'

const defaults = () => ({
  notices: NOTICES,
  documents: DOCUMENTS,
  gallery: GALLERY,
  activity: [
    { id: 'a0', kind: 'loaded', at: new Date().toISOString() },
  ],
})

const ContentContext = createContext(null)

export function ContentProvider({ children }) {
  const [state, setState] = useState(() => {
    const saved = load(STORAGE_KEY, null)
    if (!saved?.notices || !saved?.documents || !saved?.gallery) return defaults()
    // Built image URLs change between builds, so re-link sample photos by id.
    const baseSrc = new Map(GALLERY.map((g) => [g.id, g.src]))
    return { ...saved, gallery: saved.gallery.map((g) => (baseSrc.has(g.id) ? { ...g, src: baseSrc.get(g.id) } : g)) }
  })
  const [storageOk, setStorageOk] = useState(true)
  // Files picked in the admin preview live only for this browser session.
  const sessionFiles = useRef(new Map())
  const [, forceRender] = useState(0)

  useEffect(() => {
    setStorageOk(save(STORAGE_KEY, state))
  }, [state])

  // Activity entries store a kind (loaded, reset, added, updated, deleted)
  // so the Admin Preview can show them in the chosen language.
  const log = (kind, label) => ({ id: `a${Date.now()}${Math.random().toString(16).slice(2, 6)}`, kind, label, at: new Date().toISOString() })

  const upsert = useCallback((collection, item) => {
    setState((s) => {
      const exists = s[collection].some((x) => x.id === item.id)
      const list = exists ? s[collection].map((x) => (x.id === item.id ? item : x)) : [item, ...s[collection]]
      const label = item.title || item.caption || 'item'
      return { ...s, [collection]: list, activity: [log(exists ? 'updated' : 'added', label), ...s.activity].slice(0, 30) }
    })
  }, [])

  const removeItem = useCallback((collection, id) => {
    setState((s) => {
      const item = s[collection].find((x) => x.id === id)
      const label = item?.title || item?.caption || 'item'
      return { ...s, [collection]: s[collection].filter((x) => x.id !== id), activity: [log('deleted', label), ...s.activity].slice(0, 30) }
    })
  }, [])

  const attachSessionFile = useCallback((id, file) => {
    const url = URL.createObjectURL(file)
    sessionFiles.current.set(id, { url, name: file.name, size: file.size })
    forceRender((n) => n + 1)
  }, [])

  const getSessionFile = useCallback((id) => sessionFiles.current.get(id), [])

  const resetDemo = useCallback(() => {
    remove(STORAGE_KEY)
    sessionFiles.current.forEach((f) => URL.revokeObjectURL(f.url))
    sessionFiles.current.clear()
    setState({ ...defaults(), activity: [log('reset')] })
  }, [])

  const value = useMemo(
    () => ({ ...state, storageOk, upsert, removeItem, attachSessionFile, getSessionFile, resetDemo }),
    [state, storageOk, upsert, removeItem, attachSessionFile, getSessionFile, resetDemo],
  )

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}

export const useContent = () => {
  const ctx = useContext(ContentContext)
  if (!ctx) throw new Error('useContent must be used inside ContentProvider')
  return ctx
}
