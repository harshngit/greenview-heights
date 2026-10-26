import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CalendarPlus, ChevronDown, Clock, MapPin } from 'lucide-react'
import { dayOfMonth } from '../lib/format'
import { EASE, fadeUp } from '../lib/motion'
import { useI18n } from '../i18n/I18nContext'

// Builds an .ics file so "Add to calendar" really works offline.
const icsHref = (ev, site) => {
  const d = ev.date.replaceAll('-', '')
  const ics = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Greenview Heights//Demo//EN', 'BEGIN:VEVENT',
    `UID:${ev.id}@greenviewheights.example`, `DTSTART;VALUE=DATE:${d}`, `SUMMARY:${ev.title}`,
    `LOCATION:${ev.venue}, ${site.name}`, `DESCRIPTION:${ev.text} (${ev.time})`, 'END:VEVENT', 'END:VCALENDAR',
  ].join('\r\n')
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`
}

// `event` arrives already translated (see list('events', …) in Home).
export default function EventCard({ event, onNotice }) {
  const { t, fmt, site } = useI18n()
  const [open, setOpen] = useState(false)
  const panelId = `event-${event.id}`
  return (
    <motion.li variants={fadeUp} className="border-b border-ivory/12 last:border-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={panelId}
        className="group flex w-full items-center gap-5 py-6 text-left sm:gap-8"
      >
        <span className="flex w-16 shrink-0 flex-col items-center rounded-2xl border border-ivory/15 py-3 text-ivory transition-colors duration-500 group-hover:border-gold-300 sm:w-20">
          <span className="font-display text-3xl leading-none sm:text-4xl">{dayOfMonth(event.date)}</span>
          <span className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-gold-300">{fmt.month(event.date)}</span>
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-lg font-semibold text-ivory sm:text-xl">{event.title}</span>
          <span className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ivory/65">
            <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" aria-hidden="true" />{event.time}</span>
            <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" aria-hidden="true" />{event.venue}</span>
          </span>
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.4, ease: EASE }} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ivory/15 text-ivory">
          <ChevronDown className="h-4 w-4" aria-hidden="true" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1, transition: { duration: 0.45, ease: EASE } }}
            exit={{ height: 0, opacity: 0, transition: { duration: 0.3, ease: EASE } }}
            className="overflow-hidden"
          >
            <div className="pb-7 pl-[5.25rem] sm:pl-28">
              <p className="max-w-xl text-ivory/80">{event.text}</p>
              <p className="mt-2 text-sm text-ivory/55">{fmt.longDate(event.date)}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a href={icsHref(event, site)} download={`${event.id}-greenview.ics`} className="btn-light !px-4 !py-2">
                  <CalendarPlus className="h-4 w-4" aria-hidden="true" /> {t('event.addToCalendar')}
                </a>
                {event.noticeId && (
                  <button type="button" onClick={() => onNotice(event.noticeId)} className="btn-ghost-light !px-4 !py-2">
                    {t('event.readNotice')}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  )
}
