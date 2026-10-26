import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Activity, ArrowLeft, ExternalLink, FileText, ImagePlus, Images, Languages, Megaphone, Pencil, Plus, RotateCcw, ShieldAlert, Trash2, Upload,
} from 'lucide-react'
import { LogoMark } from '../components/Logo'
import Modal from '../components/Modal'
import Badge from '../components/Badge'
import Photo from '../components/Photo'
import LanguageSwitcher from '../components/LanguageSwitcher'
import { DOCUMENT_CATEGORIES, GALLERY_CATEGORIES, NOTICE_CATEGORIES } from '../data/mockData'
import { useContent } from '../context/ContentContext'
import { useI18n } from '../i18n/I18nContext'
import { byNewest, slugify, todayISO } from '../lib/format'
import { EASE } from '../lib/motion'

const TABS = [
  { id: 'notices', icon: Megaphone },
  { id: 'documents', icon: FileText },
  { id: 'gallery', icon: Images },
]

const timeAgo = (iso, t) => {
  const s = Math.round((Date.now() - new Date(iso).getTime()) / 1000)
  if (s < 60) return t('admin.ago.now')
  if (s < 3600) return t('admin.ago.min', { n: Math.floor(s / 60) })
  if (s < 86400) return t('admin.ago.h', { n: Math.floor(s / 3600) })
  return t('admin.ago.d', { n: Math.floor(s / 86400) })
}

// Downscale an uploaded image so it can be kept in localStorage.
const toDataUrl = (file, max = 1400) =>
  new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      const scale = Math.min(1, max / Math.max(img.width, img.height))
      const c = document.createElement('canvas')
      c.width = Math.round(img.width * scale)
      c.height = Math.round(img.height * scale)
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height)
      URL.revokeObjectURL(url)
      resolve(c.toDataURL('image/jpeg', 0.82))
    }
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('unreadable image')) }
    img.src = url
  })

function DeleteButton({ onConfirm, label }) {
  const { t } = useI18n()
  const [armed, setArmed] = useState(false)
  return armed ? (
    <span className="inline-flex items-center gap-1">
      <button type="button" onClick={onConfirm} className="rounded-full bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700">{t('admin.delete')}</button>
      <button type="button" onClick={() => setArmed(false)} className="rounded-full px-3 py-1.5 text-xs font-medium text-ink-soft hover:bg-sand">{t('admin.cancel')}</button>
    </span>
  ) : (
    <button type="button" onClick={() => setArmed(true)} className="flex h-9 w-9 items-center justify-center rounded-full text-ink-muted hover:bg-red-50 hover:text-red-600" aria-label={t('admin.deleteAria', { label })}>
      <Trash2 className="h-4 w-4" aria-hidden="true" />
    </button>
  )
}

function Field({ label, id, children, hint }) {
  return (
    <div>
      <label htmlFor={id} className="field-label">{label}</label>
      {children}
      {hint && <p className="mt-1.5 text-xs text-ink-muted">{hint}</p>}
    </div>
  )
}

// Form errors are stored as dictionary keys so they follow the language.
function FormError({ error }) {
  const { t } = useI18n()
  return error ? <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{t(error)}</p> : null
}

function NoticeForm({ initial, onSave, onCancel }) {
  const { t, cat } = useI18n()
  const [v, setV] = useState(
    initial ?? { title: '', category: 'General', date: todayISO(), excerpt: '', bodyText: '', pinned: false },
  )
  const [error, setError] = useState('')
  const set = (k) => (e) => setV({ ...v, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value })
  const submit = (e) => {
    e.preventDefault()
    if (v.title.trim().length < 4) return setError('admin.noticeForm.errTitle')
    if (v.excerpt.trim().length < 10) return setError('admin.noticeForm.errSummary')
    const body = (v.bodyText ?? '').split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean)
    onSave({
      id: initial?.id ?? `${slugify(v.title)}-${Date.now().toString(36)}`,
      title: v.title.trim(), category: v.category, date: v.date, excerpt: v.excerpt.trim(), body, pinned: v.pinned,
      attachment: initial?.attachment,
    })
  }
  return (
    <form onSubmit={submit} noValidate className="grid gap-5 p-6 sm:p-8">
      <h2 id="admin-form-title" className="pr-12 font-display text-3xl">{initial ? t('admin.noticeForm.edit') : t('admin.noticeForm.add')}</h2>
      <Field label={t('admin.noticeForm.title')} id="n-title"><input id="n-title" className="field" value={v.title} onChange={set('title')} data-autofocus /></Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t('admin.noticeForm.category')} id="n-cat">
          <select id="n-cat" className="field" value={v.category} onChange={set('category')}>{NOTICE_CATEGORIES.map((c) => <option key={c} value={c}>{cat(c)}</option>)}</select>
        </Field>
        <Field label={t('admin.noticeForm.date')} id="n-date"><input id="n-date" type="date" className="field" value={v.date} onChange={set('date')} /></Field>
      </div>
      <Field label={t('admin.noticeForm.summary')} id="n-excerpt" hint={t('admin.noticeForm.summaryHint')}><textarea id="n-excerpt" rows={2} className="field" value={v.excerpt} onChange={set('excerpt')} /></Field>
      <Field label={t('admin.noticeForm.body')} id="n-body" hint={t('admin.noticeForm.bodyHint')}><textarea id="n-body" rows={5} className="field" value={v.bodyText} onChange={set('bodyText')} /></Field>
      <label className="flex items-center gap-3 text-sm"><input type="checkbox" checked={v.pinned} onChange={set('pinned')} className="h-4 w-4 accent-forest-700" /> {t('admin.noticeForm.pin')}</label>
      <FormError error={error} />
      <div className="flex justify-end gap-3">
        <button type="button" onClick={onCancel} className="btn-outline">{t('admin.cancel')}</button>
        <button type="submit" className="btn-primary">{initial ? t('admin.noticeForm.save') : t('admin.noticeForm.publish')}</button>
      </div>
    </form>
  )
}

function DocumentForm({ onSave, onCancel }) {
  const { t, cat } = useI18n()
  const [v, setV] = useState({ title: '', category: DOCUMENT_CATEGORIES[0], date: todayISO() })
  const [file, setFile] = useState(null)
  const [error, setError] = useState('')
  const submit = (e) => {
    e.preventDefault()
    if (v.title.trim().length < 4) return setError('admin.documentForm.errTitle')
    if (file && file.type !== 'application/pdf') return setError('admin.documentForm.errPdf')
    onSave({ id: `doc-${Date.now().toString(36)}`, title: v.title.trim(), category: v.category, date: v.date, type: 'PDF' }, file)
  }
  return (
    <form onSubmit={submit} noValidate className="grid gap-5 p-6 sm:p-8">
      <h2 id="admin-form-title" className="pr-12 font-display text-3xl">{t('admin.documentForm.add')}</h2>
      <Field label={t('admin.documentForm.title')} id="d-title"><input id="d-title" className="field" value={v.title} onChange={(e) => setV({ ...v, title: e.target.value })} data-autofocus /></Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t('admin.documentForm.category')} id="d-cat"><select id="d-cat" className="field" value={v.category} onChange={(e) => setV({ ...v, category: e.target.value })}>{DOCUMENT_CATEGORIES.map((c) => <option key={c} value={c}>{cat(c)}</option>)}</select></Field>
        <Field label={t('admin.documentForm.date')} id="d-date"><input id="d-date" type="date" className="field" value={v.date} onChange={(e) => setV({ ...v, date: e.target.value })} /></Field>
      </div>
      <Field label={t('admin.documentForm.file')} id="d-file" hint={t('admin.documentForm.fileHint')}>
        <label htmlFor="d-file" className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-stone bg-white px-4 py-4 text-sm text-ink-soft hover:border-forest-200">
          <Upload className="h-4 w-4" aria-hidden="true" /> {file ? file.name : t('admin.documentForm.choose')}
        </label>
        <input id="d-file" type="file" accept="application/pdf" className="sr-only" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
      </Field>
      <FormError error={error} />
      <div className="flex justify-end gap-3">
        <button type="button" onClick={onCancel} className="btn-outline">{t('admin.cancel')}</button>
        <button type="submit" className="btn-primary">{t('admin.documentForm.add')}</button>
      </div>
    </form>
  )
}

function ImageForm({ onSave, onCancel }) {
  const { t, cat } = useI18n()
  const [v, setV] = useState({ caption: '', category: GALLERY_CATEGORIES[0] })
  const [preview, setPreview] = useState(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const pick = async (e) => {
    const f = e.target.files?.[0]
    if (!f) return
    setError(''); setBusy(true)
    try { setPreview(await toDataUrl(f)) } catch { setError('admin.imageForm.errRead') } finally { setBusy(false) }
  }
  const submit = (e) => {
    e.preventDefault()
    if (!preview) return setError('admin.imageForm.errImage')
    if (v.caption.trim().length < 3) return setError('admin.imageForm.errCaption')
    onSave({ id: `img-${Date.now().toString(36)}`, src: preview, caption: v.caption.trim(), alt: v.caption.trim(), category: v.category, shape: 'square' })
  }
  return (
    <form onSubmit={submit} noValidate className="grid gap-5 p-6 sm:p-8">
      <h2 id="admin-form-title" className="pr-12 font-display text-3xl">{t('admin.imageForm.add')}</h2>
      <label htmlFor="g-file" className="relative flex aspect-[16/9] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-stone bg-white text-sm text-ink-soft hover:border-forest-200">
        {preview ? (
          <img src={preview} alt={t('admin.imageForm.previewAlt')} className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <>
            <ImagePlus className="h-7 w-7 text-ink-muted" aria-hidden="true" />
            <span className="mt-2">{busy ? t('admin.imageForm.preparing') : t('admin.imageForm.choose')}</span>
          </>
        )}
      </label>
      <input id="g-file" type="file" accept="image/*" className="sr-only" onChange={pick} data-autofocus />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t('admin.imageForm.caption')} id="g-cap"><input id="g-cap" className="field" value={v.caption} onChange={(e) => setV({ ...v, caption: e.target.value })} /></Field>
        <Field label={t('admin.imageForm.category')} id="g-cat"><select id="g-cat" className="field" value={v.category} onChange={(e) => setV({ ...v, category: e.target.value })}>{GALLERY_CATEGORIES.map((c) => <option key={c} value={c}>{cat(c)}</option>)}</select></Field>
      </div>
      <p className="text-xs text-ink-muted">{t('admin.imageForm.note')}</p>
      <FormError error={error} />
      <div className="flex justify-end gap-3">
        <button type="button" onClick={onCancel} className="btn-outline">{t('admin.cancel')}</button>
        <button type="submit" className="btn-primary" disabled={busy}>{t('admin.imageForm.submit')}</button>
      </div>
    </form>
  )
}

export default function Admin() {
  const { notices, documents, gallery, activity, upsert, removeItem, attachSessionFile, getSessionFile, resetDemo, storageOk } = useContent()
  const { t, cat, fmt, site } = useI18n()
  const [tab, setTab] = useState('notices')
  const [form, setForm] = useState(null) // { type, item }
  const [confirmReset, setConfirmReset] = useState(false)
  const [toast, setToast] = useState('') // dictionary key under admin.toast

  const flash = (key) => { setToast(key); setTimeout(() => setToast(''), 2600) }
  const sortedNotices = useMemo(() => [...notices].sort(byNewest), [notices])
  const sortedDocs = useMemo(() => [...documents].sort(byNewest), [documents])

  const stats = [
    { id: 'notices', value: notices.length, icon: Megaphone },
    { id: 'documents', value: documents.length, icon: FileText },
    { id: 'gallery', value: gallery.length, icon: Images },
  ]

  // Entries saved before translation support carry ready-made English text.
  const activityText = (a) => a.text ?? t(`admin.log.${a.kind}`, { label: a.label })

  const close = () => setForm(null)

  return (
    <div className="min-h-screen bg-sand/50">
      <header className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur-xl">
        <div className="container-x flex h-16 items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <LogoMark className="h-9 w-9 shrink-0" />
            <div className="min-w-0 leading-tight">
              <p className="truncate text-sm font-semibold">{site.name}</p>
              <p className="truncate text-xs text-ink-muted">{t('admin.subtitle')}</p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <LanguageSwitcher />
            <Link to="/" className="btn-outline !px-4 !py-2"><ArrowLeft className="h-4 w-4" aria-hidden="true" /> <span className="hidden sm:inline">{t('admin.back')}</span><span className="sm:hidden">{t('admin.backShort')}</span></Link>
          </div>
        </div>
      </header>

      <main className="container-x py-8 sm:py-10">
        <div className="flex gap-3 rounded-2xl border border-gold-300 bg-gold-100 p-4 text-sm text-gold-700" role="note">
          <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <p>
            <strong>{t('admin.bannerStrong')}</strong> {t('admin.bannerText', { storage: storageOk ? '' : t('admin.storageOff') })}
          </p>
        </div>
        <div className="mt-3 flex gap-3 rounded-2xl border border-line bg-white p-4 text-sm text-ink-soft" role="note">
          <Languages className="mt-0.5 h-5 w-5 shrink-0 text-forest-600" aria-hidden="true" />
          <p>{t('admin.langNote')}</p>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-display text-4xl sm:text-5xl">{t('admin.title')}</h1>
            <p className="mt-1 text-ink-soft">{t('admin.intro')}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => { setTab('notices'); setForm({ type: 'notice' }) }} className="btn-primary !py-2.5"><Plus className="h-4 w-4" aria-hidden="true" /> {t('admin.addNotice')}</button>
            <button type="button" onClick={() => { setTab('documents'); setForm({ type: 'document' }) }} className="btn-outline !py-2.5"><Plus className="h-4 w-4" aria-hidden="true" /> {t('admin.addDocument')}</button>
            <button type="button" onClick={() => { setTab('gallery'); setForm({ type: 'image' }) }} className="btn-outline !py-2.5"><Plus className="h-4 w-4" aria-hidden="true" /> {t('admin.addImage')}</button>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {stats.map(({ id, value, icon: I }) => (
            <motion.button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.3 }}
              className={`card flex items-center justify-between p-6 text-left ${tab === id ? 'ring-2 ring-forest-500' : ''}`}
            >
              <div>
                <p className="text-sm text-ink-muted">{t(`admin.totals.${id}`)}</p>
                <motion.p key={value} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-1 font-display text-5xl text-forest-700">{value}</motion.p>
              </div>
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-forest-50 text-forest-700"><I className="h-5 w-5" aria-hidden="true" /></span>
            </motion.button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
          <section className="card overflow-hidden" aria-label={t('admin.title')}>
            <div className="isolate flex gap-1 border-b border-line p-2" role="tablist">
              {TABS.map(({ id, icon: I }) => (
                <button key={id} role="tab" aria-selected={tab === id} type="button" onClick={() => setTab(id)} className={`relative flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium sm:flex-none ${tab === id ? 'text-forest-800' : 'text-ink-soft hover:text-ink'}`}>
                  {tab === id && <motion.span layoutId="admin-tab" className="absolute inset-0 -z-10 rounded-xl bg-forest-50" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
                  <I className="h-4 w-4" aria-hidden="true" /> {t(`admin.tabs.${id}`)}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } }} exit={{ opacity: 0, transition: { duration: 0.15 } }} role="tabpanel">
                {tab === 'notices' && (
                  <ul className="divide-y divide-line">
                    <AnimatePresence initial={false}>
                      {sortedNotices.map((n) => (
                        <motion.li key={n.id} layout initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                          <div className="flex items-center gap-4 px-5 py-4">
                            <div className="min-w-0 flex-1">
                              <p className="truncate font-medium">{n.title}</p>
                              <div className="mt-1 flex items-center gap-2 text-xs text-ink-muted"><Badge>{cat(n.category)}</Badge> {fmt.date(n.date)} {n.pinned && t('admin.pinned')}</div>
                            </div>
                            <button type="button" onClick={() => setForm({ type: 'notice', item: { ...n, bodyText: (n.body ?? []).join('\n\n') } })} className="flex h-9 w-9 items-center justify-center rounded-full text-ink-muted hover:bg-sand hover:text-ink" aria-label={t('admin.editAria', { title: n.title })}>
                              <Pencil className="h-4 w-4" aria-hidden="true" />
                            </button>
                            <DeleteButton label={n.title} onConfirm={() => { removeItem('notices', n.id); flash('noticeDeleted') }} />
                          </div>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                    <li className="px-5 py-4"><Link to="/notices" className="link-arrow">{t('admin.viewNotices')} <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" /></Link></li>
                  </ul>
                )}

                {tab === 'documents' && (
                  <ul className="divide-y divide-line">
                    <AnimatePresence initial={false}>
                      {sortedDocs.map((d) => (
                        <motion.li key={d.id} layout initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                          <div className="flex items-center gap-4 px-5 py-4">
                            <FileText className="h-5 w-5 shrink-0 text-forest-600" aria-hidden="true" />
                            <div className="min-w-0 flex-1">
                              <p className="truncate font-medium">{d.title}</p>
                              <p className="mt-0.5 text-xs text-ink-muted">
                                {cat(d.category)} · {fmt.date(d.date)} · {d.file ? t('admin.sampleFile') : getSessionFile(d.id) ? t('admin.sessionFile') : t('admin.noFile')}
                              </p>
                            </div>
                            <DeleteButton label={d.title} onConfirm={() => { removeItem('documents', d.id); flash('documentDeleted') }} />
                          </div>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                    <li className="px-5 py-4"><Link to="/documents" className="link-arrow">{t('admin.viewDocuments')} <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" /></Link></li>
                  </ul>
                )}

                {tab === 'gallery' && (
                  <div className="p-5">
                    <motion.ul layout className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
                      <AnimatePresence initial={false}>
                        {gallery.map((g) => (
                          <motion.li key={g.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="group relative overflow-hidden rounded-xl border border-line bg-white">
                            <Photo src={g.src} alt={g.alt} className="aspect-square" />
                            <div className="flex items-center justify-between gap-2 p-2">
                              <p className="min-w-0 truncate text-xs font-medium">{g.caption}</p>
                              <DeleteButton label={g.caption} onConfirm={() => { removeItem('gallery', g.id); flash('imageRemoved') }} />
                            </div>
                          </motion.li>
                        ))}
                      </AnimatePresence>
                    </motion.ul>
                    <Link to="/gallery" className="link-arrow mt-5">{t('admin.viewGallery')} <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" /></Link>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </section>

          <aside className="space-y-6">
            <section className="card p-5" aria-labelledby="activity-title">
              <h2 id="activity-title" className="flex items-center gap-2 font-semibold"><Activity className="h-4 w-4 text-forest-600" aria-hidden="true" /> {t('admin.activity')}</h2>
              <ul className="mt-4 space-y-3">
                <AnimatePresence initial={false}>
                  {activity.slice(0, 8).map((a) => (
                    <motion.li key={a.id} layout initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex gap-3 text-sm">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold-500" aria-hidden="true" />
                      <span className="min-w-0">
                        <span className="block text-ink">{activityText(a)}</span>
                        <span className="text-xs text-ink-muted">{timeAgo(a.at, t)}</span>
                      </span>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            </section>
            <section className="card p-5">
              <h2 className="font-semibold">{t('admin.reset.title')}</h2>
              <p className="mt-1 text-sm text-ink-soft">{t('admin.reset.text')}</p>
              {confirmReset ? (
                <div className="mt-4 flex gap-2">
                  <button type="button" onClick={() => { resetDemo(); setConfirmReset(false); flash('restored') }} className="btn !bg-red-600 !px-4 !py-2 text-white hover:!bg-red-700">{t('admin.reset.confirm')}</button>
                  <button type="button" onClick={() => setConfirmReset(false)} className="btn-outline !px-4 !py-2">{t('admin.cancel')}</button>
                </div>
              ) : (
                <button type="button" onClick={() => setConfirmReset(true)} className="btn-outline mt-4 !px-4 !py-2"><RotateCcw className="h-4 w-4" aria-hidden="true" /> {t('admin.reset.button')}</button>
              )}
            </section>
          </aside>
        </div>
      </main>

      <Modal open={!!form} onClose={close} labelledBy="admin-form-title">
        {form?.type === 'notice' && (
          <NoticeForm initial={form.item} onCancel={close} onSave={(n) => { upsert('notices', n); close(); flash(form.item ? 'noticeUpdated' : 'noticePublished') }} />
        )}
        {form?.type === 'document' && (
          <DocumentForm onCancel={close} onSave={(d, file) => { upsert('documents', d); if (file) attachSessionFile(d.id, file); close(); flash('documentAdded') }} />
        )}
        {form?.type === 'image' && (
          <ImageForm onCancel={close} onSave={(g) => { upsert('gallery', g); close(); flash('imageAdded') }} />
        )}
      </Modal>

      <AnimatePresence>
        {toast && (
          <motion.div role="status" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed bottom-6 left-1/2 z-[80] -translate-x-1/2 rounded-full bg-forest-800 px-5 py-3 text-sm text-ivory shadow-lift">
            {t(`admin.toast.${toast}`)}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
