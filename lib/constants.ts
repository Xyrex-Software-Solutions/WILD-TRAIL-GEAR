export const WA_NUMBER = '94754768386'

export function waLink(msg = "Hi! I'd like to rent some gear from Wild Trail Gear.") {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`
}

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Catalog', href: '/catalog' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
]
