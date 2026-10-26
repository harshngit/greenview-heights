// ---------------------------------------------------------------
// All photography used on the site, in one place.
//
// Demo photos are free images from Unsplash (Unsplash License),
// loaded from Unsplash's image CDN. To use the society's own photos,
// put them in /public/images and replace a value with a local path,
// e.g.  hero: '/images/hero.jpg'
// ---------------------------------------------------------------
const unsplash = (id, w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

export const IMAGES = {
  hero: unsplash('photo-1641579909061-4f36224c9b9d', 2200), // residential tower beside a green park, India
  about: unsplash('photo-1775733924031-521cd86c69cc'), // apartment building with balconies and greenery
  towerGreen: unsplash('photo-1744194211637-a2fad5e6b46a'), // modern building with leafy trees
  facade: unsplash('photo-1760894492960-5b0a2da0676d'), // balconies against a clear sky
  evening: unsplash('photo-1774685110793-e427dfa87467'), // balcony overlooking trees at dusk
  garden: unsplash('photo-1763909129689-0ef3655fc03c'), // brick path through a manicured garden
  pool: unsplash('photo-1663293761246-56a9b0693052'), // pool with chairs and tables
  gym: unsplash('photo-1757924284732-4189190321cf'), // gym with treadmills and large windows
  kids: unsplash('photo-1711369093144-2ada6e035a84'), // children's play area in front of a building
  diwali: unsplash('photo-1635192592106-77a5aacbe1a3'), // diyas arranged for Diwali
  lights: unsplash('photo-1680459520309-189cf5b22212'), // sparklers at a festive evening
  gathering: unsplash('photo-1528605248644-14dd04022da1'), // neighbours talking over a meal
  lobby: unsplash('photo-1759038086403-c607d67bb245'), // lobby with warm wooden walls
  plantation: unsplash('photo-1598335624134-5bceb5de202d'), // planting a sapling
}
