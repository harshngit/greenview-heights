import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Loader2, Send } from 'lucide-react'
import { useI18n } from '../i18n/I18nContext'
import { EASE } from '../lib/motion'

// The subject is stored as its position in form.subjects, so the chosen
// option stays selected when the language changes.
const empty = { name: '', email: '', flat: '', subject: '', message: '' }

// Returns the fields that fail; the message for each is form.errors.<field>.
const validate = (v) => {
  const e = {}
  if (v.name.trim().length < 2) e.name = true
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = true
  if (v.subject === '') e.subject = true
  if (v.message.trim().length < 15) e.message = true
  return e
}

// Demo form: validates in the browser, then shows a confirmation. Nothing is emailed.
export default function ContactForm({ compact = false }) {
  const { t } = useI18n()
  const subjects = t('form.subjects')
  const [values, setValues] = useState(empty)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle')

  const set = (k) => (e) => {
    const next = { ...values, [k]: e.target.value }
    setValues(next)
    if (touched[k]) setErrors(validate(next))
  }
  const blur = (k) => () => {
    setTouched((t) => ({ ...t, [k]: true }))
    setErrors(validate(values))
  }

  const submit = (e) => {
    e.preventDefault()
    const errs = validate(values)
    setErrors(errs)
    setTouched({ name: true, email: true, subject: true, message: true })
    if (Object.keys(errs).length) {
      document.getElementById(`cf-${Object.keys(errs)[0]}`)?.focus()
      return
    }
    setStatus('sending')
    setTimeout(() => setStatus('sent'), 900)
  }

  const reset = () => {
    setValues(empty); setErrors({}); setTouched({}); setStatus('idle')
  }

  const err = (k) => touched[k] && errors[k] && t(`form.errors.${k}`)

  return (
    <div className="card relative overflow-hidden p-6 sm:p-8">
      <AnimatePresence mode="wait" initial={false}>
        {status === 'sent' ? (
          <motion.div key="done" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0, transition: { ease: EASE, duration: 0.5 } }} exit={{ opacity: 0 }} className="flex flex-col items-start py-6" role="status">
            <motion.span initial={{ scale: 0.5, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 18 }} className="flex h-14 w-14 items-center justify-center rounded-full bg-forest-50 text-forest-700">
              <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
            </motion.span>
            <h3 className="mt-5 font-display text-3xl text-ink">{t('form.thanks', { name: values.name.trim().split(' ')[0] })}</h3>
            <p className="mt-2 max-w-md text-ink-soft">
              {t('form.recorded', { subject: subjects[values.subject] ?? '' })}
            </p>
            <p className="mt-4 rounded-xl bg-gold-100 px-4 py-3 text-sm text-gold-700">
              {t('form.demoSent')}
            </p>
            <button type="button" onClick={reset} className="btn-outline mt-6">{t('form.another')}</button>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={submit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <label htmlFor="cf-name" className="field-label">{t('form.name')}</label>
              <input id="cf-name" value={values.name} onChange={set('name')} onBlur={blur('name')} autoComplete="name" className={`field ${err('name') ? 'field-error' : ''}`} aria-invalid={!!err('name')} aria-describedby={err('name') ? 'cf-name-err' : undefined} placeholder={t('form.namePh')} />
              {err('name') && <p id="cf-name-err" className="mt-1.5 text-sm text-red-600">{err('name')}</p>}
            </div>
            <div className="sm:col-span-1">
              <label htmlFor="cf-email" className="field-label">{t('form.email')}</label>
              <input id="cf-email" type="email" value={values.email} onChange={set('email')} onBlur={blur('email')} autoComplete="email" className={`field ${err('email') ? 'field-error' : ''}`} aria-invalid={!!err('email')} aria-describedby={err('email') ? 'cf-email-err' : undefined} placeholder={t('form.emailPh')} />
              {err('email') && <p id="cf-email-err" className="mt-1.5 text-sm text-red-600">{err('email')}</p>}
            </div>
            {!compact && (
              <div>
                <label htmlFor="cf-flat" className="field-label">{t('form.flat')} <span className="font-normal text-ink-muted">{t('form.optional')}</span></label>
                <input id="cf-flat" value={values.flat} onChange={set('flat')} className="field" placeholder={t('form.flatPh')} />
              </div>
            )}
            <div className={compact ? 'sm:col-span-2' : ''}>
              <label htmlFor="cf-subject" className="field-label">{t('form.subject')}</label>
              <select id="cf-subject" value={values.subject} onChange={set('subject')} onBlur={blur('subject')} className={`field appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat ${err('subject') ? 'field-error' : ''}`} style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%234a524c' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")" }} aria-invalid={!!err('subject')} aria-describedby={err('subject') ? 'cf-subject-err' : undefined}>
                <option value="">{t('form.chooseSubject')}</option>
                {subjects.map((s, i) => <option key={i} value={String(i)}>{s}</option>)}
              </select>
              {err('subject') && <p id="cf-subject-err" className="mt-1.5 text-sm text-red-600">{err('subject')}</p>}
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="cf-message" className="field-label">{t('form.message')}</label>
              <textarea id="cf-message" rows={compact ? 4 : 5} value={values.message} onChange={set('message')} onBlur={blur('message')} className={`field resize-y ${err('message') ? 'field-error' : ''}`} aria-invalid={!!err('message')} aria-describedby={err('message') ? 'cf-message-err' : undefined} placeholder={t('form.messagePh')} />
              {err('message') && <p id="cf-message-err" className="mt-1.5 text-sm text-red-600">{err('message')}</p>}
            </div>
            <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-ink-muted">{t('form.note')}</p>
              <button type="submit" className="btn-primary" disabled={status === 'sending'}>
                {status === 'sending' ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Send className="h-4 w-4" aria-hidden="true" />}
                {status === 'sending' ? t('form.sending') : t('form.send')}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
