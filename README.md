# Greenview Heights CHS: website demo

A frontend-only demo website for a co-operative housing society in Powai, Mumbai.
Built with **React (JavaScript, no TypeScript)**, **Vite**, **Tailwind CSS v4**, **Framer Motion**, **React Router** and **Lucide icons**.

There is no backend, database or CMS. All content is sample data, and the society, people and contact details are fictional.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in /dist
npm run preview    # serve the production build locally
```

You need Node.js 18 or newer. The `dist` folder can be uploaded to any static host (Netlify, Vercel, cPanel, S3).

## Pages

| Route | What it does |
| --- | --- |
| `/` | Hero, about, facilities, latest notices, events, gallery, committee, quick resources, contact |
| `/about` | History timeline, mission and values, community overview, initiatives, committee |
| `/facilities` | Feature amenities, more amenities, timings and bookings |
| `/notices` | Search, category filters, sort, loading and empty states, notice detail modal, PDF attachments |
| `/documents` | Document library by category with search, preview and download of real sample PDFs |
| `/gallery` | Category filters and a lightbox (keyboard arrows, swipe, Esc) |
| `/contact` | Validated enquiry form with a demo confirmation, office hours, map placeholder |
| `/resources` | Maintenance billing, emergency contacts, house rules |
| `/admin` | **Admin Preview (demo only)**: add, edit and delete notices, documents and gallery photos |
| `/privacy`, `/terms` | Demo policy pages |

## Motion

Framer Motion handles the page fade-in, hero headline reveal and image zoom, scroll parallax, scroll-triggered reveals with staggering, animated counters, the sliding nav indicator, the mobile menu, filter layout animations, modals, the lightbox (shared-layout zoom, swipe) and the event accordions. Visitors who have turned on "reduce motion" on their device get a calmer version automatically.

## Changing the content

Everything lives in `src/data/`:

- `site.js`: society name, address, phone, email, office hours, navigation
- `mockData.js`: notices, documents, gallery, amenities, committee, events, emergency contacts, house rules
- `images.js`: every photo URL in one place

**Photos.** The demo uses free Unsplash photos (Unsplash License), loaded from Unsplash's CDN, so an internet connection is needed to see them. To use the society's own photos, put them in `public/images/` and change the matching line in `src/data/images.js`, for example `hero: './images/hero.jpg'`.

**Documents.** Sample PDFs are in `public/documents/`. Replace them with real files and keep or update the file names in `mockData.js`.

## Admin Preview: what it is and isn't

`/admin` shows how a future content manager could work. Changes are saved only in the visitor's own browser (localStorage), so other people never see them. Uploaded PDFs last only for the current browser session, and uploaded photos are resized and kept in the browser. There is no login and nothing is published. Use **Reset demo data** to restore the original content.

## Routing note

The site uses hash URLs (`/#/notices`), which work on any static host with no server set-up. For clean URLs, build with `VITE_ROUTER=browser`, set `base: '/'` in `vite.config.js`, and add an SPA rewrite on the host so every path serves `index.html`.

## Project structure

```
src/
  components/   Navbar, Footer, Hero, SectionHeading, AmenityCard, NoticeCard, NoticeModal,
                DocumentCard, GalleryGrid, Lightbox, CommitteeCard, EventCard, ContactForm,
                Modal, Photo, Reveal, StatCounter, PageHeader, Badge, EmptyState, Logo, Icon
  pages/        Home, About, Facilities, Notices, Documents, Gallery, Contact, Resources,
                Admin, Legal, NotFound
  context/      ContentContext (demo content store, localStorage)
  data/         site.js, mockData.js, images.js
  lib/          motion presets, date formatting, storage and scroll helpers
public/
  documents/    sample PDFs
```

## Limitations

- No backend: the contact form doesn't send email, and admin changes aren't shared between visitors.
- The map is an illustrated placeholder with a link to Google Maps; embed a real map once the address is final.
- Committee names and phone numbers are placeholders. City emergency numbers (112, 108, 101) are real.
