import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import FloatingWA from '@/components/FloatingWA'

export const metadata: Metadata = {
  title: 'Wild Trail Gear — Rent Outdoor Gear in Sri Lanka',
  description: 'Rent handpicked outdoor gear for Sri Lanka\'s trails. Based in Panadura. Tents, stoves, hammocks, and more — book via WhatsApp.',
  keywords: 'outdoor gear rental, Sri Lanka, camping, hiking, Panadura, tent rental, backpack rental',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
        <FloatingWA />
      </body>
    </html>
  )
}
