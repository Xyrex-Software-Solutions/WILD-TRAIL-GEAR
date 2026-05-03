'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { IconWA, IconMenu, IconX } from './Icons'
import { waLink, NAV_LINKS } from '@/lib/constants'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  if (pathname.startsWith('/admin')) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-[200] flex justify-center px-6 py-4 pointer-events-none">
      <div
        className="bg-white rounded-full flex items-center gap-8 pointer-events-auto w-full transition-shadow duration-300"
        style={{
          maxWidth: 1000,
          padding: '12px 32px',
          boxShadow: scrolled
            ? '0px 8px 32px rgba(0,0,0,0.12)'
            : '0px 4px 24px rgba(0,0,0,0.06)',
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 no-underline">
          <Image
            src="/images/updated%20logo.jpg"
            alt="Wild Trail Gear"
            width={170}
            height={36}
            className="h-7 w-auto"
            priority
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-1 flex-1 justify-center">
          {NAV_LINKS.map(({ label, href }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className="text-sm rounded-full px-[18px] py-[7px] transition-all duration-150 no-underline"
                style={{
                  fontWeight: active ? 700 : 500,
                  color: active ? '#1B4332' : '#1A1A18',
                  background: active ? '#EDE8E0' : 'transparent',
                }}
              >
                {label}
              </Link>
            )
          })}
        </div>

        {/* CTA */}
        <a
          href={waLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 bg-whatsapp text-white rounded-[20px] px-[18px] py-2 text-[13px] font-semibold no-underline whitespace-nowrap flex-shrink-0"
        >
          <IconWA size={15} /> Rent Now
        </a>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden ml-auto"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <IconX /> : <IconMenu />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          className="absolute top-[76px] left-6 right-6 bg-white rounded-3xl shadow-card py-4 pointer-events-auto"
          style={{ boxShadow: '0px 24px 48px rgba(0,0,0,0.10)' }}
        >
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="block px-6 py-3 text-sm font-medium text-ink no-underline hover:bg-canvas transition-colors"
              style={{ color: pathname === href ? '#1B4332' : '#1A1A18', fontWeight: pathname === href ? 700 : 500 }}
            >
              {label}
            </Link>
          ))}
          <div className="px-6 pt-3 pb-2">
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-whatsapp text-white rounded-[20px] px-6 py-3 text-sm font-semibold no-underline"
            >
              <IconWA size={16} /> Chat on WhatsApp
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
