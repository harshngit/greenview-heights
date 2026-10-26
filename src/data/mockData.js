// ---------------------------------------------------------------
// Demo content. All people, notices, events and documents below
// are fictional sample data for presentation purposes.
// ---------------------------------------------------------------
import { IMAGES } from './images'

export const NOTICE_CATEGORIES = ['Meetings', 'Maintenance', 'Events', 'Finance', 'Security', 'General']

export const NOTICES = [
  {
    id: 'agm-2026',
    title: 'Annual General Body Meeting 2026',
    category: 'Meetings',
    date: '2026-10-20',
    pinned: true,
    excerpt:
      'All members are requested to attend the Annual General Body Meeting on Sunday, 22 November 2026 at 10:30 am in the Community Hall.',
    body: [
      'Notice is hereby given that the Annual General Body Meeting of Greenview Heights Co-operative Housing Society Ltd. will be held on Sunday, 22 November 2026 at 10:30 am in the Community Hall, Ground Floor, Wing B.',
      'The agenda includes adoption of the audited accounts for 2025–26, approval of the budget for 2026–27, the repainting proposal for Wings A and C, and any other matter with the permission of the Chair.',
      'Members who wish to raise questions on the accounts are requested to submit them in writing to the society office by Sunday, 15 November 2026. If quorum is not present, the meeting will be adjourned by half an hour and held at the same venue.',
    ],
    attachment: { label: 'Notice & Agenda (PDF)', href: 'documents/agm-notice-2026.pdf' },
  },
  {
    id: 'diwali-2026',
    title: 'Diwali Community Celebration',
    category: 'Events',
    date: '2026-10-22',
    excerpt:
      'Join neighbours for rangoli, a children’s lantern walk and a community dinner on the central lawn on Saturday, 7 November.',
    body: [
      'The Cultural Committee invites all residents to the Diwali Community Celebration on Saturday, 7 November 2026, from 6:30 pm on the central lawn.',
      'The evening will include a rangoli competition (entries by 4 November), a lantern walk for children, live music and a community dinner. Contribution towards dinner is ₹350 per adult and ₹150 per child below 12 years.',
      'In line with the society’s green festival policy, firecrackers are not permitted inside the premises. Please register your family at the society office or with your wing representative.',
    ],
    attachment: { label: 'Event circular (PDF)', href: 'documents/diwali-circular-2026.pdf' },
  },
  {
    id: 'water-tank-oct',
    title: 'Water Tank Cleaning Schedule',
    category: 'Maintenance',
    date: '2026-10-19',
    excerpt:
      'Overhead and underground tanks will be cleaned wing-wise between 27 and 29 October. Water supply will be paused from 10 am to 4 pm on the scheduled day.',
    body: [
      'As part of half-yearly maintenance, the overhead and underground water tanks will be cleaned and disinfected by an approved agency.',
      'Schedule: Wing A on Tuesday, 27 October; Wing B on Wednesday, 28 October; Wing C on Thursday, 29 October. Water supply to the respective wing will be paused from 10:00 am to 4:00 pm.',
      'Residents are requested to store sufficient water the previous night. The society regrets the inconvenience and thanks members for their co-operation.',
    ],
  },
  {
    id: 'parking-maintenance',
    title: 'Parking Area Maintenance',
    category: 'Maintenance',
    date: '2026-10-14',
    excerpt:
      'Resurfacing and re-marking of the basement parking will be carried out in two phases from 2 November. Temporary parking will be arranged on the podium.',
    body: [
      'The basement parking area will be resurfaced and re-marked in two phases. Phase 1 (slots B-01 to B-40) from 2 to 5 November; Phase 2 (slots B-41 to B-82) from 9 to 12 November.',
      'Affected vehicle owners will be allotted temporary slots on the podium. Allotment slips will be shared by the security desk on the day before each phase.',
      'Please do not leave vehicles in the marked work zones after 9:00 pm on the evening before your phase begins.',
    ],
  },
  {
    id: 'maintenance-bill-q3',
    title: 'Maintenance Bills for October – December',
    category: 'Finance',
    date: '2026-10-01',
    excerpt:
      'Quarterly maintenance bills have been issued. Payment is due by 20 October; interest applies to dues paid after the due date as per bye-laws.',
    body: [
      'Maintenance bills for the quarter October to December 2026 have been shared by email and placed in members’ letter boxes.',
      'Payments may be made by NEFT to the society’s bank account or by cheque at the society office. Please mention your flat number in the payment reference.',
      'Interest on delayed payment will be charged as per the society’s bye-laws for dues received after 20 October 2026.',
    ],
  },
  {
    id: 'pest-control',
    title: 'Quarterly Pest Control in Common Areas',
    category: 'Maintenance',
    date: '2026-09-29',
    excerpt:
      'Gel and spray treatment of staircases, lift lobbies, the garbage room and the clubhouse on Sunday, 4 October from 9 am.',
    body: [
      'Quarterly pest control of common areas will be carried out on Sunday, 4 October 2026 from 9:00 am.',
      'Residents who wish to have their flats treated at the society’s negotiated rate may register at the office by Friday, 2 October.',
    ],
  },
  {
    id: 'visitor-app',
    title: 'Visitor Entry Through the Gate App',
    category: 'Security',
    date: '2026-09-18',
    excerpt:
      'From 1 October, all visitors and deliveries will be pre-approved through the gate app. Help with set-up is available at the security desk.',
    body: [
      'To strengthen security, all visitors, delivery partners and domestic staff will be checked in through the gate app from 1 October 2026.',
      'Residents can pre-approve expected guests to avoid waiting at the gate. Senior citizens who need help installing the app can visit the security desk between 11 am and 1 pm.',
    ],
  },
  {
    id: 'cleanup-drive',
    title: 'Volunteers Needed for Clean-Up Drive',
    category: 'General',
    date: '2026-09-10',
    excerpt:
      'The Green Committee is looking for volunteers for the next community clean-up and tree-planting morning.',
    body: [
      'The Green Committee is organising a clean-up and tree-planting drive along the society boundary and the Powai lake walkway.',
      'Gloves, bags and refreshments will be provided. Please register with your wing representative.',
    ],
  },
]

export const DOCUMENT_CATEGORIES = ['Society Rules', 'Meeting Minutes', 'Forms & Applications', 'Circulars', 'Annual Reports']

export const DOCUMENTS = [
  { id: 'd1', title: 'Society Bye-laws (Summary)', category: 'Society Rules', date: '2026-04-12', file: 'documents/society-bye-laws-summary.pdf' },
  { id: 'd2', title: 'House Rules for Residents', category: 'Society Rules', date: '2026-06-02', file: 'documents/house-rules.pdf' },
  { id: 'd3', title: 'Clubhouse & Amenity Usage Policy', category: 'Society Rules', date: '2026-05-18', file: 'documents/amenity-usage-policy.pdf' },
  { id: 'd4', title: 'Minutes: Managing Committee Meeting, September 2026', category: 'Meeting Minutes', date: '2026-09-30', file: 'documents/mc-minutes-sep-2026.pdf' },
  { id: 'd5', title: 'Minutes: Annual General Body Meeting 2025', category: 'Meeting Minutes', date: '2025-10-05', file: 'documents/agm-minutes-2025.pdf' },
  { id: 'd6', title: 'Interior Work & Renovation Application', category: 'Forms & Applications', date: '2026-03-08', file: 'documents/renovation-application.pdf' },
  { id: 'd7', title: 'Tenant / Leave & Licence Intimation Form', category: 'Forms & Applications', date: '2026-02-21', file: 'documents/tenant-intimation-form.pdf' },
  { id: 'd8', title: 'Parking Slot Allotment Request', category: 'Forms & Applications', date: '2026-07-14', file: 'documents/parking-request-form.pdf' },
  { id: 'd9', title: 'AGM 2026: Notice & Agenda', category: 'Circulars', date: '2026-10-20', file: 'documents/agm-notice-2026.pdf' },
  { id: 'd10', title: 'Diwali Celebration Circular', category: 'Circulars', date: '2026-10-22', file: 'documents/diwali-circular-2026.pdf' },
  { id: 'd11', title: 'Annual Report 2025–26', category: 'Annual Reports', date: '2026-08-30', file: 'documents/annual-report-2025-26.pdf' },
  { id: 'd12', title: 'Annual Report 2024–25', category: 'Annual Reports', date: '2025-08-28', file: 'documents/annual-report-2024-25.pdf' },
]

export const GALLERY_CATEGORIES = ['Building', 'Facilities', 'Events', 'Festivals']

export const GALLERY = [
  { id: 'g1', src: IMAGES.towerGreen, alt: 'Residential towers framed by mature trees', category: 'Building', caption: 'Wing B from the central lawn', shape: 'tall' },
  { id: 'g2', src: IMAGES.garden, alt: 'Landscaped garden path with flowering shrubs', category: 'Facilities', caption: 'The landscaped garden', shape: 'wide' },
  { id: 'g3', src: IMAGES.diwali, alt: 'Diyas and marigold decorations lit for Diwali', category: 'Festivals', caption: 'Diwali 2025 on the lawn', shape: 'square' },
  { id: 'g4', src: IMAGES.pool, alt: 'Clubhouse swimming pool at dusk', category: 'Facilities', caption: 'Clubhouse pool', shape: 'square' },
  { id: 'g5', src: IMAGES.facade, alt: 'Apartment facade with balconies and planters', category: 'Building', caption: 'Balconies on Wing A', shape: 'tall' },
  { id: 'g6', src: IMAGES.gathering, alt: 'Residents gathered outdoors for a community event', category: 'Events', caption: 'Monsoon get-together', shape: 'wide' },
  { id: 'g7', src: IMAGES.gym, alt: 'Fitness centre with treadmills and weights', category: 'Facilities', caption: 'Fitness centre', shape: 'square' },
  { id: 'g8', src: IMAGES.kids, alt: 'Children playing in an outdoor play area', category: 'Events', caption: 'Children’s Day games', shape: 'square' },
  { id: 'g9', src: IMAGES.lights, alt: 'String lights and lanterns at a festive evening', category: 'Festivals', caption: 'Festival lights', shape: 'tall' },
  { id: 'g10', src: IMAGES.lobby, alt: 'Bright entrance lobby with seating', category: 'Building', caption: 'Wing C entrance lobby', shape: 'square' },
  { id: 'g11', src: IMAGES.plantation, alt: 'Volunteers planting saplings', category: 'Events', caption: 'Tree-planting morning', shape: 'wide' },
  { id: 'g12', src: IMAGES.evening, alt: 'Apartment buildings lit up in the evening', category: 'Building', caption: 'Evening at Greenview', shape: 'square' },
]

export const AMENITIES = [
  { id: 'garden', title: 'Landscaped Garden', icon: 'Trees', image: IMAGES.garden, text: 'Half an acre of lawns, shaded walkways and seasonal flower beds tended through the year.' },
  { id: 'clubhouse', title: 'Clubhouse', icon: 'Armchair', image: IMAGES.pool, text: 'Pool, indoor games room and a reading lounge, open 6 am to 10 pm for members and guests.' },
  { id: 'fitness', title: 'Fitness Centre', icon: 'Dumbbell', image: IMAGES.gym, text: 'Cardio and strength equipment with a weekly yoga class on the terrace deck.' },
  { id: 'play', title: 'Children’s Play Area', icon: 'Baby', image: IMAGES.kids, text: 'Soft-floor play zone with swings and a sandpit, visible from the seating area.' },
  { id: 'hall', title: 'Community Hall', icon: 'Users', image: IMAGES.gathering, text: 'A 150-seat hall for meetings, celebrations and classes, bookable through the office.' },
  { id: 'security', title: '24/7 Security', icon: 'ShieldCheck', image: IMAGES.lobby, text: 'Manned gates, CCTV on all common areas and app-based visitor management.' },
  { id: 'parking', title: 'Parking Facilities', icon: 'CarFront', image: IMAGES.facade, text: 'Allotted basement and podium parking with EV charging points for members.' },
  { id: 'rainwater', title: 'Rainwater Harvesting', icon: 'Droplets', image: IMAGES.plantation, text: 'Rooftop harvesting recharges groundwater and cuts tanker dependence in summer.' },
]

export const EXTRA_AMENITIES = [
  'Solar water heating', 'Organic waste composting', 'EV charging points', 'Power back-up for lifts and common areas',
  'Senior citizens’ corner', 'Terrace yoga deck', 'Library and reading lounge',
]

// Committee: fictional placeholder people for this demo only.
export const COMMITTEE = [
  { id: 'c1', name: 'R. K. Mehta', role: 'Chairman', since: 2023, focus: 'Governance and general body matters', initials: 'RM' },
  { id: 'c2', name: 'Anjali Deshpande', role: 'Hon. Secretary', since: 2023, focus: 'Notices, records and resident correspondence', initials: 'AD' },
  { id: 'c3', name: 'Suresh Iyer', role: 'Treasurer', since: 2024, focus: 'Accounts, maintenance billing and audit', initials: 'SI' },
  { id: 'c4', name: 'Farah Shaikh', role: 'Committee Member', since: 2024, focus: 'Cultural events and the Green Committee', initials: 'FS' },
]

export const EVENTS = [
  {
    id: 'e1',
    title: 'Diwali Community Celebration',
    date: '2026-11-07',
    time: '6:30 pm onwards',
    venue: 'Central Lawn',
    text: 'Rangoli, a lantern walk for children, live music and a community dinner. Register by 4 November.',
    noticeId: 'diwali-2026',
  },
  {
    id: 'e2',
    title: 'Society General Body Meeting',
    date: '2026-11-22',
    time: '10:30 am',
    venue: 'Community Hall, Wing B',
    text: 'Adoption of audited accounts, the 2026–27 budget and the repainting proposal for Wings A and C.',
    noticeId: 'agm-2026',
  },
  {
    id: 'e3',
    title: 'Community Clean-Up Drive',
    date: '2026-12-06',
    time: '7:30 am – 10:00 am',
    venue: 'Main Gate assembly point',
    text: 'Clean-up and tree planting along the boundary and lake walkway. Gloves and breakfast provided.',
    noticeId: 'cleanup-drive',
  },
  {
    id: 'e4',
    title: 'Christmas & New Year Evening',
    date: '2026-12-26',
    time: '7:00 pm',
    venue: 'Clubhouse Terrace',
    text: 'Carols by the children’s choir, a secret-Santa table and a potluck dinner on the terrace.',
  },
]

export const EMERGENCY_CONTACTS = [
  { label: 'Security Desk (Main Gate)', value: 'Intercom 100', note: 'Available 24 × 7' },
  { label: 'Society Office', value: 'Intercom 101', note: 'During office hours' },
  { label: 'Facility Manager', value: '+91 90000 00001', note: 'Demo number' },
  { label: 'Electrician / Plumber on call', value: '+91 90000 00002', note: 'Demo number' },
  { label: 'Police', value: '112', note: 'National emergency number' },
  { label: 'Ambulance', value: '108', note: 'Maharashtra emergency medical services' },
  { label: 'Fire Brigade', value: '101', note: 'Mumbai Fire Brigade' },
]

export const MAINTENANCE_INFO = [
  { label: 'Billing cycle', value: 'Quarterly: April, July, October, January' },
  { label: 'Due date', value: '20th of the first month of each quarter' },
  { label: 'Payment modes', value: 'NEFT / IMPS to society account, or cheque at the office' },
  { label: 'Late payment', value: 'Interest as per society bye-laws' },
  { label: 'Receipts', value: 'Emailed within 5 working days of payment' },
]

export const HOUSE_RULES = [
  'Interior work is permitted 10 am – 1 pm and 3 pm – 6 pm on weekdays, with prior written approval.',
  'Common corridors, staircases and lift lobbies must be kept free of shoes, plants and stored items.',
  'Visitors and delivery staff are checked in through the gate app; please pre-approve expected guests.',
  'Segregate wet, dry and sanitary waste before handing it to housekeeping.',
  'Pets must be leashed in common areas; owners are responsible for cleaning up after them.',
  'Amenity bookings (community hall, clubhouse) are made through the society office at least 3 days ahead.',
]

export const VALUES = [
  { title: 'Safety', icon: 'ShieldCheck', text: 'Round-the-clock security, fire-safety drills and well-lit common areas so every family feels at ease.' },
  { title: 'Transparency', icon: 'ScrollText', text: 'Accounts, minutes and decisions are shared openly, and every member has a voice at the general body.' },
  { title: 'Sustainability', icon: 'Leaf', text: 'Rainwater harvesting, solar heating and composting keep our footprint small and our bills lower.' },
  { title: 'Community', icon: 'HeartHandshake', text: 'Festivals, clean-up mornings and children’s events turn 120 homes into one neighbourhood.' },
]

export const MILESTONES = [
  { year: '2012', text: 'Society registered with 120 founding members across three wings.' },
  { year: '2015', text: 'Rainwater harvesting and solar water heating commissioned.' },
  { year: '2019', text: 'Clubhouse renovated; fitness centre and reading lounge added.' },
  { year: '2023', text: 'CCTV and app-based visitor management introduced.' },
  { year: '2026', text: 'EV charging points installed; resident website launched.' },
]
