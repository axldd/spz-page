/** Contact details used in header, footer, home and Kontakt page. */
export const SITE = {
  name: 'Storsberg | von Schumann',
  longName: 'Rechtsanwälte Storsberg und von Schumann',
  tagline: 'Rechtsanwälte und Fachanwältin für Familienrecht',
  street: 'Haßlocher Straße 150',
  city: '65428 Rüsselsheim',
  phone: { label: '06142 563536', href: 'tel:+496142563536' },
  phoneSecretary: { label: '06142 59790', href: 'tel:+49614259790' },
  fax: '06142 57134',
  email: 'kanzlei@spz-anwaelte.de',
  // Plain links only - no embedded map, so no third-party requests.
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Ha%C3%9Flocher+Stra%C3%9Fe+150%2C+65428+R%C3%BCsselsheim',
};

export const NAV = [
  { href: '/kanzlei/', label: 'Kanzlei' },
  { href: '/rechtsanwaelte/', label: 'Rechtsanwälte' },
  { href: '/rechtsgebiete/', label: 'Rechtsgebiete' },
  { href: '/kontakt/', label: 'Kontakt' },
];
