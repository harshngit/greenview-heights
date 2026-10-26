// ---------------------------------------------------------------
// Society identity. Replace these values with the real society's
// details; every page reads from here.
// ---------------------------------------------------------------
export const SITE = {
  name: 'Greenview Heights',
  legalName: 'Greenview Heights Co-operative Housing Society Ltd.',
  shortName: 'Greenview Heights CHS',
  tagline: 'A Better Community. A Better Way of Living.',
  location: 'Powai, Mumbai, Maharashtra',
  established: 2012,
  homes: 120,
  wings: 3,
  amenitiesCount: 15,
  registrationNo: 'MUM/WS/HSG/(TC)/0000/2012 (sample)',
  address: {
    line1: 'Greenview Heights, Hiranandani Link Road',
    line2: 'Powai, Mumbai – 400076',
    state: 'Maharashtra, India',
  },
  // Demo contact details only: not real numbers or inboxes.
  phone: '+91 22 0000 0000',
  phoneHref: '+912200000000',
  email: 'office@greenviewheights.example',
  officeHours: [
    { days: 'Monday – Friday', time: '10:00 am – 1:00 pm, 5:00 pm – 8:00 pm' },
    { days: 'Saturday', time: '10:00 am – 1:00 pm' },
    { days: 'Sunday & public holidays', time: 'Closed' },
  ],
  mapsQuery: 'Powai, Mumbai 400076',
}

// Labels live in src/i18n (nav.<key>) so they follow the chosen language.
export const NAV_LINKS = [
  { key: 'home', to: '/' },
  { key: 'about', to: '/about' },
  { key: 'facilities', to: '/facilities' },
  { key: 'notices', to: '/notices' },
  { key: 'gallery', to: '/gallery' },
  { key: 'documents', to: '/documents' },
  { key: 'contact', to: '/contact' },
]

export const yearsOfCommunity = () => new Date().getFullYear() - SITE.established
