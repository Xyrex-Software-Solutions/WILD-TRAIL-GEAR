export type Availability = 'available' | 'limited' | 'unavailable'

export type TentVariant = {
  label: string
  price: number
}

export type CatalogItem = {
  id: number
  name: string
  category: string
  image: string
  availability: Availability
  price?: number
  priceLabel?: string
  variants?: TentVariant[]
  priceFrom?: number
  tag?: string
  waMessage: string
}

export const CATALOG: CatalogItem[] = [
  {
    id: 1,
    name: 'Manual Tent',
    category: 'Tents',
    image: '/images/products/tent.jpeg',
    availability: 'available',
    variants: [
      { label: '3-Person', price: 500 },
      { label: '4-Person', price: 600 },
      { label: '6-Person', price: 750 },
      { label: '8-Person', price: 900 },
    ],
    priceFrom: 500,
    priceLabel: 'from LKR 500',
    tag: 'Popular',
    waMessage: "Hi! I'd like to rent a Manual Tent. Could you share availability for my dates?",
  },
  {
    id: 2,
    name: 'Windproof Gas Stove',
    category: 'Cooking',
    image: '/images/products/gas-stove.jpeg',
    availability: 'available',
    price: 250,
    waMessage: "Hi! I'd like to rent a Windproof Gas Stove (LKR 250/day). Is it available?",
  },
  {
    id: 3,
    name: 'Cooking Set',
    category: 'Cooking',
    image: '/images/products/cooking-set.jpeg',
    availability: 'available',
    price: 300,
    waMessage: "Hi! I'd like to rent a Cooking Set (LKR 300/day). Is it available?",
  },
  {
    id: 4,
    name: 'Hammock',
    category: 'Accessories',
    image: '/images/products/hammock.jpeg',
    availability: 'available',
    price: 200,
    waMessage: "Hi! I'd like to rent a Hammock (LKR 200/day). Is it available?",
  },
  {
    id: 5,
    name: 'Anti Leech Socks',
    category: 'Accessories',
    image: '/images/products/anti-leech-socks.jpeg',
    availability: 'available',
    price: 250,
    waMessage: "Hi! I'd like to rent Anti Leech Socks (LKR 250/day). Is it available?",
  },
  {
    id: 6,
    name: 'Water Bag 3L',
    category: 'Accessories',
    image: '/images/products/water-bag.jpeg',
    availability: 'available',
    price: 300,
    waMessage: "Hi! I'd like to rent a Water Bag 3L (LKR 300/day). Is it available?",
  },
]

export const CATEGORIES = ['All', 'Tents', 'Cooking', 'Accessories']
