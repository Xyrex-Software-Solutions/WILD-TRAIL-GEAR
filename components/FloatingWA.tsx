'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { IconWA } from './Icons'
import { waLink } from '@/lib/constants'

export default function FloatingWA() {
  const [hovered, setHovered] = useState(false)
  const pathname = usePathname()

  if (pathname.startsWith('/admin')) return null

  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="fixed bottom-8 right-8 z-[300] flex items-center bg-whatsapp text-white rounded-full no-underline font-semibold text-sm transition-all duration-300"
      style={{
        gap: hovered ? 10 : 0,
        padding: hovered ? '14px 22px' : '14px',
        boxShadow: '0px 8px 32px rgba(37,211,102,0.4)',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      }}
    >
      <IconWA size={22} />
      <span
        style={{
          width: hovered ? 'auto' : 0,
          maxWidth: hovered ? 160 : 0,
          overflow: 'hidden',
          display: 'inline-block',
          transition: 'max-width 0.3s ease',
        }}
      >
        Chat on WhatsApp
      </span>
    </a>
  )
}
