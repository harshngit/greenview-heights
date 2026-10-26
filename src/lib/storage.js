// Small wrappers so a blocked or full localStorage never breaks the demo.
export const load = (key, fallback) => {
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export const save = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

export const remove = (key) => {
  try {
    window.localStorage.removeItem(key)
  } catch {
    /* ignore */
  }
}
